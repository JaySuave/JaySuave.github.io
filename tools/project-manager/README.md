# Project Manager

Run from the repository root:

```sh
node tools/project-manager/server.js
```

Then open:

```text
http://127.0.0.1:4173
```

Use the form to add, edit, remove, and reorder projects. Selecting media files converts and stores them in:

```text
media/<project-name>/<media-file-name>.webp
media/<project-name>/<media-file-name>.mp4
```

For videos, the manager also creates:

```text
media/<project-name>/<media-file-name>.webp
```

as the poster image.

Media is managed as an ordered list per project. Use `Add Media` to add images or videos, then use `Up` and `Down` beside each media item to control the carousel order.

The editor changes its in-memory list first. Click `Save` to write the updated `projects` array back to `data.js`.

This tool requires `ffmpeg` for image/video conversion.
