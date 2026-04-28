# Blog

A tiny static blog that builds Markdown from `content/` into a GitHub Pages-ready site in `dist/`.

## Commands

```sh
npm run build
npm run new -- remix-jam-wrapup
```

## Deployment

Pushes to `main` build and deploy `dist/` to GitHub Pages with GitHub Actions. In the repository settings, set Pages to use GitHub Actions as the source.

Articles live at `content/title.md` and use `date` plus `published: true` or `published: false` in frontmatter. All articles are built under `/posts/`, but only published articles are listed on the homepage. Shared page pieces live in `content/_header.md`, `content/_index.md`, and `content/_footer.md`.

Files in `public/` are copied into the root of `dist/`, so `public/styles.css` becomes `dist/styles.css`.
