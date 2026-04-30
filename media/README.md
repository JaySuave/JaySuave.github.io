# Project Media

Place optimized project images and short demo videos in this folder.

The project manager stores assets as:

- `media/<project-name>/<file-name>.webp` for images.
- `media/<project-name>/<file-name>.mp4` for videos.
- `media/<project-name>/<file-name>.webp` as the automatic poster for videos.

Expected filenames from `data.js`:

- `java-compiler.webp`
- `cogito-game.mp4`
- `cogito-game.webp`
- `pri24-25.webp`
- `tetris.mp4`
- `tetris.webp`
- `claustro.webp`
- `transpiler.webp`
- `da-proj.webp`
- `rcom24-25.webp`
- `project-prog.webp`
- `portfolio.webp`

Recommended targets:

- Images: WebP, 1280px wide, 100-300 KB when possible.
- Videos: MP4 with H.264 video, 720p, muted 5-15 second clips, 1-3 MB when possible.

Projects can use multiple ordered media items:

```js
media: [
  {
    type: 'image',
    src: './media/project-1.webp',
    alt: 'First project preview'
  },
  {
    type: 'video',
    src: './media/project-demo.mp4',
    poster: './media/project-demo.webp',
    alt: 'Project demo video'
  }
]
```
