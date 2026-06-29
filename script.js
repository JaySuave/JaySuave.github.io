const getDOM = selector => () => {
  return document.querySelector(selector);
};

const roles = Array.isArray(main.role) ? main.role.join(' / ') : main.role;
const themeStorageKey = 'portfolio-theme';

const getSystemTheme = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getStoredTheme = () => {
  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
  } catch (error) {
    return null;
  }
};

const setStoredTheme = theme => {
  try {
    window.localStorage.setItem(themeStorageKey, theme);
  } catch (error) {
    return;
  }
};

const getAppliedTheme = () => {
  const theme = document.documentElement.dataset.theme;
  return theme === 'dark' || theme === 'light' ? theme : getSystemTheme();
};

const applyTheme = theme => {
  document.documentElement.dataset.theme = theme;
};

const updateThemedImages = () => {
  const isDark = getAppliedTheme() === 'dark';

  document.querySelectorAll('[data-light-src][data-dark-src]').forEach(image => {
    image.src = isDark ? image.dataset.darkSrc : image.dataset.lightSrc;
  });
};

const updateThemeToggle = button => {
  const isDark = getAppliedTheme() === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  button.setAttribute('aria-label', label);
  button.setAttribute('aria-pressed', String(isDark));
  button.title = label;
  button.innerHTML = `<ion-icon name="${isDark ? 'sunny-outline' : 'moon-outline'}"></ion-icon>`;
  updateThemedImages();
};

const initThemeToggle = () => {
  const storedTheme = getStoredTheme();
  let pointerTriggered = false;

  if (storedTheme) {
    applyTheme(storedTheme);
  }

  const button = document.createElement('button');
  button.className = 'theme-toggle';
  button.type = 'button';
  document.body.prepend(button);
  updateThemeToggle(button);

  button.addEventListener('pointerdown', () => {
    pointerTriggered = true;
  });

  button.addEventListener('click', () => {
    const nextTheme = getAppliedTheme() === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
    updateThemeToggle(button);

    if (pointerTriggered) {
      button.blur();
    }

    pointerTriggered = false;
  });

  if (window.matchMedia) {
    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncWithSystemTheme = () => {
      if (!getStoredTheme()) {
        updateThemeToggle(button);
      }
    };

    if (themeQuery.addEventListener) {
      themeQuery.addEventListener('change', syncWithSystemTheme);
    } else if (themeQuery.addListener) {
      themeQuery.addListener(syncWithSystemTheme);
    }
  }
};

// Values DOM nodes
const dom = {
  main: {
    name: getDOM('#main #name'),
    img: getDOM('#main #img'),
    role: getDOM('#main #role'),
    connects: getDOM('#main #connects'),
    links: getDOM('#main #links')
  },
  about: {
    text: getDOM('#about-text'),
    page: getDOM('#about-page-text'),
    timeline: getDOM('#about-timeline')
  },
  contacts: {
    list: getDOM('#contacts-list')
  },
  projects: {
    featured: getDOM('#projects-list'),
    all: getDOM('#all-projects-list')
  }
};

initThemeToggle();

function assignDOM(dom, value, options) {
  if (!dom) {
    return;
  }

  if (options && options.isImg) {
    dom.src = value;
    dom.alt = `${main.name} portrait`;
    return;
  }

  dom.innerHTML = value;
}

const connectsDOM = main.connects
  .map(
    ({ name, iconName, iconSvg, iconImg, iconDarkImg, link }) =>
      `<a href="${link}" target="_blank" rel="noreferrer" title="${name}" aria-label="${name}">${
        iconImg
          ? `<img src="${iconImg}" alt="" class="social-icon-img" data-light-src="${iconImg}" data-dark-src="${iconDarkImg || iconImg}">`
          : iconSvg || `<ion-icon name="${iconName}"></ion-icon>`
      }</a>`
  )
  .join('\n');

// Internal Links
const getLinks = links =>
  links
    .map(({ name, link }) => `<a href="${link}" class="hero-link">${name}</a>`)
    .map((link, index, links) => index === links.length - 1 ? link: `${link} - `)
    .join('\n');

const getProjectLinks = project => {
  const links = [];

  if (project.repo) {
    links.push(`
      <a href="${project.repo}" target="_blank" rel="noreferrer" class="repo-link" aria-label="Repository on GitHub">
        <ion-icon name="logo-github" aria-hidden="true"></ion-icon>
        <span>Repository</span>
      </a>
    `);
  }

  return links.join(' - ');
};

const escapeHTML = value =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getProjectId = name =>
  `project-${String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;

const truncateText = (text, limit = 260) => {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();

  if (normalized.length <= limit) {
    return normalized;
  }

  const truncated = normalized.slice(0, limit).trimEnd();
  const lastSpace = truncated.lastIndexOf(' ');

  return `${truncated.slice(0, lastSpace > 120 ? lastSpace : limit).trimEnd()}...`;
};

const getProjectDescription = (description, options = {}) => {
  const text = options.isFeatured ? truncateText(description, options.excerptLength) : String(description || '');

  return escapeHTML(text)
    .split(/\n{2,}/)
    .map(paragraph => paragraph.replace(/\n/g, '<br>'))
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('');
};

const normalizeProjectMedia = media => {
  if (Array.isArray(media)) {
    return media.filter(item => item && item.src);
  }

  if (media && media.src) {
    return [media];
  }

  return [];
};

const getProjectMediaItem = (media, slideClass = '') => {
  const alt = media.alt || '';
  const hideOnError = "this.closest('.project-media-slide').hidden = true";

  if (media.type === 'video') {
    const shouldLoop = media.loop !== false;

    return `
      <div class="project-media-slide ${slideClass}">
        <video
          class="project-media"
          src="${media.src}"
          ${media.poster ? `poster="${media.poster}"` : ''}
          aria-label="${alt}"
          muted
          ${shouldLoop ? 'loop' : ''}
          playsinline
          disablepictureinpicture
          disableremoteplayback
          autoplay
          preload="metadata"
          controlslist="nofullscreen nodownload noremoteplayback"
          onerror="${hideOnError}"
        ></video>
      </div>
    `;
  }

  return `
    <div class="project-media-slide ${slideClass}">
      <img
        class="project-media"
        src="${media.src}"
        alt="${alt}"
        loading="lazy"
        decoding="async"
        onerror="${hideOnError}"
      >
    </div>
  `;
};

const getProjectMedia = media => {
  const items = normalizeProjectMedia(media);

  if (!items.length) {
    return '';
  }

  if (items.length === 1) {
    return `
      <div class="project-media-wrap">
        ${getProjectMediaItem(items[0], 'project-media-slide-active')}
      </div>
    `;
  }

  return `
    <div class="project-media-wrap project-media-carousel" data-current="0">
      <div class="project-media-track">
        ${items.map((item, index) => getProjectMediaItem(item, index === 0 ? 'project-media-slide-active' : '')).join('')}
      </div>
      <button class="project-media-control project-media-control-prev" type="button" data-direction="-1" aria-label="Previous media">&#8249;</button>
      <button class="project-media-control project-media-control-next" type="button" data-direction="1" aria-label="Next media">&#8250;</button>
      <div class="project-media-count">
        <span class="project-media-current">1</span> / ${items.length}
      </div>
    </div>
  `;
};

const getContacts = contacts =>
  contacts
    .map(({ label, value, link }) => {
      const isMail = link.startsWith('mailto:');

      return `
        <a href="${link}" ${isMail ? 'target="_top"' : 'target="_blank" rel="noreferrer"'} class="contact-item">
          <span class="contact-label">${label}</span>
          <span class="contact-value">${value}</span>
        </a>
      `
    })
    .join('\n');

const getAboutPage = sections =>
  sections
    .map(
      paragraph => `
        <p class="text-lg leading-relaxed about-paragraph">${renderTextWithLinks(paragraph)}</p>
      `
    )
    .join('\n');

const renderTextWithLinks = text => {
  const input = String(text || '');
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/[^\s)]*)\)/g;
  let lastIndex = 0;
  let result = '';
  let match;

  while ((match = linkPattern.exec(input))) {
    if (match.index > lastIndex) {
      result += escapeHTML(input.slice(lastIndex, match.index)).replace(/\n/g, '<br>');
    }

    const label = escapeHTML(match[1]);
    const link = escapeHTML(match[2]);

    result += `<a href="${link}" target="_blank" rel="noreferrer" class="inline-link">${label}</a>`;
    lastIndex = linkPattern.lastIndex;
  }

  if (lastIndex < input.length) {
    result += escapeHTML(input.slice(lastIndex)).replace(/\n/g, '<br>');
  }

  return result;
};

const renderOrganization = organization => {
  if (organization && typeof organization === 'object') {
    return escapeHTML(organization.name || '');
  }

  return escapeHTML(organization);
};

const getTimelineMetaLink = linkData => {
  if (!linkData || !linkData.link) {
    return '';
  }

  const { name, iconName, link, label } = linkData;
  const linkName = escapeHTML(name || label || 'Link');
  const linkLabel = escapeHTML(label || name || 'Link');
  const linkIcon = escapeHTML(iconName || 'globe-outline');
  const href = escapeHTML(link);

  return `
    <a href="${href}" target="_blank" rel="noreferrer" aria-label="${linkName}" title="${linkName}" class="timeline-meta-link">
      <ion-icon name="${linkIcon}" aria-hidden="true"></ion-icon>
      <span class="timeline-meta-link-label">${linkLabel}</span>
    </a>
  `;
};

const getOrganizationWebsiteLink = organization => {
  if (!organization || typeof organization !== 'object' || !organization.link) {
    return '';
  }

  return getTimelineMetaLink({
    name: `${organization.name || 'Organization'} website`,
    iconName: 'globe-outline',
    link: organization.link,
    label: 'Website'
  });
};

const getTimelineMetaLinks = (item, group) => {
  const links = [];

  if (group.title === 'Experience') {
    const websiteLink = getOrganizationWebsiteLink(item.organization);

    if (websiteLink) {
      links.push(websiteLink);
    }
  }

  if (Array.isArray(item.organizationLinks)) {
    links.push(...item.organizationLinks.map(getTimelineMetaLink).filter(Boolean));
  }

  return links.length
    ? `
      <span class="timeline-meta-links">
        ${links.join('')}
      </span>
    `
    : '';
};

const getTimelineGroups = groups =>
  groups
    .map(
      group => `
        <section class="timeline-group">
          <div class="timeline-group-label">${group.title}</div>
          <div class="timeline-list">
            ${group.items
              .map(
                item => `
                  <article class="timeline-item${item.current ? ' timeline-item-current' : ''}">
                    <div class="timeline-period">${item.period}</div>
                    <div class="timeline-card">
                      <p class="timeline-meta">
                        <span>${renderOrganization(item.organization)}</span>
                        ${getTimelineMetaLinks(item, group)}
                      </p>
                      <h3 class="timeline-title">${item.title}</h3>
                      <p class="timeline-description">${item.description}</p>
                      ${
                        item.points && item.points.length
                          ? `
                            <ul class="timeline-points">
                              ${item.points.map(point => `<li>${point}</li>`).join('')}
                            </ul>
                          `
                          : ''
                      }
                    </div>
                  </article>
                `
              )
              .join('\n')}
          </div>
        </section>
      `
    )
    .join('\n');

const getProjects = projects =>
  getProjectsWithOptions(projects);

const getProjectsWithOptions = (projects, options = {}) =>
  projects
    .map(
      ({ name, description, stack = [], repo, media }) => `
        <article class="project-card" id="${getProjectId(name)}">
          ${getProjectMedia(media)}
          <h3 class="text-3xl">${escapeHTML(name)}</h3>
          <div class="project-description text-base my-4">
            ${getProjectDescription(description, options)}
          </div>
          <div class="project-tech my-4">
            ${stack.map(item => `<span>${escapeHTML(item)}</span>`).join('')}
          </div>
          <div class="project-links text-sm">
            ${
              options.isFeatured
                ? `<a href="./projects.html#${getProjectId(name)}">View Project</a>${repo ? ' - ' : ''}`
                : ''
            }${getProjectLinks({ repo })}
          </div>
        </article>
      `
    )
    .join('\n');

const mainName = dom.main.name();
const mainImg = dom.main.img();
const mainRole = dom.main.role();
const mainConnects = dom.main.connects();
const mainLinks = dom.main.links();
const allProjectsList = dom.projects.all();
const aboutPage = dom.about.page();

if (allProjectsList) {
  document.title = `${main.name} | Projects`;
} else if (aboutPage) {
  document.title = `${main.name} | About`;
} else {
  document.title = `${main.name} | ${roles}`;
}

if (mainName) {
  assignDOM(mainName, main.name);
}

if (mainImg) {
  assignDOM(mainImg, main.img, { isImg: true });
}

if (mainRole) {
  assignDOM(mainRole, roles);
}

if (mainConnects) {
  assignDOM(mainConnects, connectsDOM);
  updateThemedImages();
}

if (mainLinks) {
  assignDOM(mainLinks, getLinks(main.links));
}

assignDOM(dom.about.text(), main.aboutShort || '');
assignDOM(dom.about.page(), getAboutPage(main.aboutLong || []));
assignDOM(dom.about.timeline(), getTimelineGroups(main.timelineSections || []));
assignDOM(dom.contacts.list(), getContacts(main.contacts || []));
assignDOM(dom.projects.featured(), getProjectsWithOptions((main.projects || []).slice(0, 3), { isFeatured: true, excerptLength: 260 }));
assignDOM(allProjectsList, getProjectsWithOptions(main.projects || []));

const mediaControlTimers = new WeakMap();

const hideProjectMediaControls = carousel => {
  window.clearTimeout(mediaControlTimers.get(carousel));
  mediaControlTimers.delete(carousel);
  carousel.classList.remove('project-media-controls-visible');
};

const showProjectMediaControls = carousel => {
  window.clearTimeout(mediaControlTimers.get(carousel));
  carousel.classList.add('project-media-controls-visible');
  mediaControlTimers.set(
    carousel,
    window.setTimeout(() => {
      carousel.classList.remove('project-media-controls-visible');
      mediaControlTimers.delete(carousel);
    }, 900)
  );
};

document.addEventListener('mousemove', event => {
  const carousel = event.target.closest('.project-media-carousel');

  if (carousel) {
    showProjectMediaControls(carousel);
  }
});

document.addEventListener('mouseout', event => {
  const carousel = event.target.closest('.project-media-carousel');

  if (!carousel || (event.relatedTarget && carousel.contains(event.relatedTarget))) {
    return;
  }

  hideProjectMediaControls(carousel);
});

document.addEventListener('click', event => {
  const control = event.target.closest('.project-media-control');

  if (!control) {
    return;
  }

  const carousel = control.closest('.project-media-carousel');
  const slides = Array.from(carousel.querySelectorAll('.project-media-slide:not([hidden])'));

  if (!slides.length) {
    return;
  }

  const activeIndex = slides.findIndex(slide => slide.classList.contains('project-media-slide-active'));
  const current = activeIndex === -1 ? 0 : activeIndex;
  const direction = Number(control.dataset.direction || 1);
  const next = (current + direction + slides.length) % slides.length;

  slides[current].classList.remove('project-media-slide-active');
  slides[current].querySelectorAll('video').forEach(video => video.pause());
  slides[next].classList.add('project-media-slide-active');
  carousel.dataset.current = String(next);

  const currentLabel = carousel.querySelector('.project-media-current');

  if (currentLabel) {
    currentLabel.textContent = String(next + 1);
  }
});
