const fs = require('fs/promises');
const http = require('http');
const path = require('path');
const vm = require('vm');
const { execFile } = require('child_process');
const { promisify } = require('util');

const root = path.resolve(__dirname, '..', '..');
const dataPath = path.join(root, 'data.js');
const mediaDir = path.join(root, 'media');
const editorPath = path.join(__dirname, 'editor.html');
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';
const run = promisify(execFile);
const debugEnabled = process.env.DEBUG_PROJECT_MANAGER === '1';

const debug = (...args) => {
  if (debugEnabled) {
    console.log('[project-manager]', ...args);
  }
};

const send = (res, status, body, type = 'application/json') => {
  res.writeHead(status, { 'Content-Type': type });
  res.end(type === 'application/json' ? JSON.stringify(body) : body);
};

const readBody = req =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

const loadMain = async () => {
  const source = await fs.readFile(dataPath, 'utf8');
  return vm.runInNewContext(`${source}; main`, {}, { filename: dataPath });
};

const findProjectsRange = source => {
  const key = 'projects:';
  const keyIndex = source.indexOf(key);

  if (keyIndex === -1) {
    throw new Error('Could not find projects array in data.js');
  }

  const start = source.indexOf('[', keyIndex);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === '[') {
      depth += 1;
    } else if (char === ']') {
      depth -= 1;

      if (depth === 0) {
        return { start, end: index + 1 };
      }
    }
  }

  throw new Error('Could not parse projects array in data.js');
};

const formatValue = (value, indent = 2) => {
  const pad = ' '.repeat(indent);
  const innerPad = ' '.repeat(indent + 2);

  if (Array.isArray(value)) {
    if (!value.length) {
      return '[]';
    }

    if (value.every(item => !item || typeof item !== 'object')) {
      return `[${value.map(item => JSON.stringify(item)).join(', ')}]`;
    }

    return `[\n${value
      .map(item => `${innerPad}${formatValue(item, indent + 2)}`)
      .join(',\n')}\n${pad}]`;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value).filter(([, item]) => item !== undefined && item !== '');

    if (!entries.length) {
      return '{}';
    }

    return `{\n${entries
      .map(([key, item]) => `${innerPad}${key}: ${formatValue(item, indent + 2)}`)
      .join(',\n')}\n${pad}}`;
  }

  return JSON.stringify(value);
};

const formatProjects = projects =>
  `[\n${projects
    .map(project => `    ${formatValue(project, 4)}`)
    .join(',\n')}\n  ]`;

const saveProjects = async projects => {
  debug('saveProjects:start', {
    count: projects.length,
    mediaByProject: projects.map(project => ({
      name: project.name,
      media: Array.isArray(project.media) ? project.media.length : project.media ? 1 : 0
    }))
  });
  const source = await fs.readFile(dataPath, 'utf8');
  const range = findProjectsRange(source);
  const nextSource = `${source.slice(0, range.start)}${formatProjects(projects)}${source.slice(range.end)}`;
  await fs.writeFile(dataPath, nextSource);
  debug('saveProjects:done', { dataPath });
};

const sanitizeFileName = fileName =>
  path
    .basename(fileName)
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const slugify = value =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const commandExists = async command => {
  try {
    await run('which', [command]);
    return true;
  } catch {
    return false;
  }
};

const convertImage = async (input, output) => {
  if (await commandExists('cwebp')) {
    await run('cwebp', ['-q', '75', '-resize', '1280', '0', input, '-o', output]);
    return;
  }

  if (await commandExists('magick')) {
    await run('magick', [input, '-resize', '1280x', '-quality', '75', output]);
    return;
  }

  try {
    await run('ffmpeg', ['-y', '-i', input, '-vf', 'scale=1280:-2', '-c:v', 'libwebp', '-q:v', '75', output]);
    return;
  } catch {
    throw new Error('Could not create WebP. Install cwebp with `brew install webp` or ImageMagick with `brew install imagemagick`.');
  }
};

const normalizeVideoSpeed = speed => {
  const parsed = Number(speed);
  const allowed = [1, 1.25, 1.5, 2, 3];

  return allowed.includes(parsed) ? parsed : 1;
};

const convertVideo = (input, output, speed = 1) =>
  run('ffmpeg', [
    '-y',
    '-i',
    input,
    '-vf',
    `setpts=PTS/${speed},scale=1280:-2`,
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-crf',
    '23',
    '-preset',
    'medium',
    '-an',
    output
  ]);

const createPoster = async (input, output) => {
  const tempFrame = output.replace(/\.webp$/i, '.poster-frame.png');
  await run('ffmpeg', ['-y', '-ss', '00:00:01', '-i', input, '-frames:v', '1', tempFrame]);

  try {
    await convertImage(tempFrame, output);
  } finally {
    await fs.rm(tempFrame, { force: true });
  }
};

const handleUpload = async (req, res) => {
  const body = await readBody(req);
  const request = new Request('http://project-manager.local/api/media', {
    method: 'POST',
    headers: {
      'Content-Type': req.headers['content-type'] || ''
    },
    body
  });
  const formData = await request.formData();
  const file = formData.get('file');
  const projectName = formData.get('projectName');
  const mediaName = formData.get('mediaName');
  const mediaType = formData.get('mediaType') === 'video' ? 'video' : 'image';
  const videoSpeed = normalizeVideoSpeed(formData.get('videoSpeed'));

  debug('upload:received', {
    projectName,
    mediaName,
    mediaType,
    videoSpeed,
    fileName: file && typeof file !== 'string' ? file.name : null,
    fileSize: file && typeof file !== 'string' ? file.size : null
  });

  if (!file || typeof file === 'string' || !file.name || file.size === 0) {
    send(res, 400, { error: 'No file uploaded' });
    return;
  }

  const projectSlug = slugify(projectName);
  const mediaSlug = slugify(mediaName || path.basename(file.name, path.extname(file.name)));

  debug('upload:slugs', { projectSlug, mediaSlug });

  if (!projectSlug || !mediaSlug) {
    send(res, 400, { error: 'Project name and media name are required' });
    return;
  }

  const projectMediaDir = path.join(mediaDir, projectSlug);
  await fs.mkdir(projectMediaDir, { recursive: true });

  const tempName = `${Date.now()}-${sanitizeFileName(file.name)}`;
  const tempPath = path.join(projectMediaDir, tempName);
  const outputExtension = mediaType === 'video' ? '.mp4' : '.webp';
  const outputFileName = `${mediaSlug}${outputExtension}`;
  const outputPath = path.join(projectMediaDir, outputFileName);
  const outputRelativePath = `./media/${projectSlug}/${outputFileName}`;

  await fs.writeFile(tempPath, Buffer.from(await file.arrayBuffer()));

  try {
    if (mediaType === 'video') {
      const posterFileName = `${mediaSlug}.webp`;
      const posterPath = path.join(projectMediaDir, posterFileName);
      const posterRelativePath = `./media/${projectSlug}/${posterFileName}`;

      await convertVideo(tempPath, outputPath, videoSpeed);
      await createPoster(outputPath, posterPath);
      debug('upload:video:done', {
        src: outputRelativePath,
        poster: posterRelativePath,
        speed: videoSpeed
      });
      send(res, 201, {
        media: {
          type: 'video',
          src: outputRelativePath,
          poster: posterRelativePath,
          speed: videoSpeed
        }
      });
      return;
    }

    await convertImage(tempPath, outputPath);
    debug('upload:image:done', { src: outputRelativePath });
    send(res, 201, {
      media: {
        type: 'image',
        src: outputRelativePath
      }
    });
  } finally {
    await fs.rm(tempPath, { force: true });
  }
};

const mediaPathToFile = mediaPath => {
  if (!mediaPath || typeof mediaPath !== 'string' || !mediaPath.startsWith('./media/')) {
    return null;
  }

  const relativePath = mediaPath.replace(/^\.\//, '');
  const target = path.resolve(root, relativePath);
  const mediaRoot = path.resolve(mediaDir);

  if (!target.startsWith(`${mediaRoot}${path.sep}`)) {
    return null;
  }

  return target;
};

const handleDeleteMedia = async (req, res) => {
  const body = JSON.parse((await readBody(req)).toString('utf8'));
  const media = body.media || {};
  const paths = [media.src, media.poster].filter(Boolean);
  const deleted = [];
  const skipped = [];

  for (const mediaPath of paths) {
    const target = mediaPathToFile(mediaPath);

    if (!target) {
      skipped.push(mediaPath);
      continue;
    }

    await fs.rm(target, { force: true });
    deleted.push(mediaPath);
  }

  debug('deleteMedia:done', { deleted, skipped });
  send(res, 200, { deleted, skipped });
};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/') {
      send(res, 200, await fs.readFile(editorPath, 'utf8'), 'text/html; charset=utf-8');
      return;
    }

    if (req.method === 'GET' && req.url === '/api/projects') {
      const main = await loadMain();
      send(res, 200, { projects: main.projects || [] });
      return;
    }

    if (req.method === 'PUT' && req.url === '/api/projects') {
      const body = JSON.parse((await readBody(req)).toString('utf8'));

      if (!Array.isArray(body.projects)) {
        send(res, 400, { error: 'Expected a projects array' });
        return;
      }

      await saveProjects(body.projects);
      send(res, 200, { ok: true });
      return;
    }

    if (req.method === 'POST' && req.url === '/api/media') {
      await handleUpload(req, res);
      return;
    }

    if (req.method === 'DELETE' && req.url === '/api/media') {
      await handleDeleteMedia(req, res);
      return;
    }

    send(res, 404, { error: 'Not found' });
  } catch (error) {
    send(res, 500, { error: error.message });
  }
});

server.listen(port, host, () => {
  console.log(`Project manager running at http://${host}:${port}`);
});
