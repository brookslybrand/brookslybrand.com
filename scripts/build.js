#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const contentDir = path.join(rootDir, "content");
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "dist");

const articlePattern = /^(?:(\d{4}-\d{2}-\d{2})-)?(.+)\.md$/;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function renderInline(markdown) {
  let html = escapeHtml(markdown);

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, label, href) => `<a href="${escapeAttribute(href)}">${label}</a>`,
  );

  return html;
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let listItems = [];
  let codeBlock = [];
  let inCodeBlock = false;

  function flushParagraph() {
    if (paragraph.length === 0) return;
    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (listItems.length === 0) return;
    html.push("<ul>");
    for (const item of listItems) {
      html.push(`<li>${renderInline(item)}</li>`);
    }
    html.push("</ul>");
    listItems = [];
  }

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        html.push(`<pre><code>${escapeHtml(codeBlock.join("\n"))}</code></pre>`);
        codeBlock = [];
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlock.push(line);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      flushList();
      html.push("<hr>");
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    const listItem = line.match(/^[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      listItems.push(listItem[1]);
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();

  if (inCodeBlock) {
    html.push(`<pre><code>${escapeHtml(codeBlock.join("\n"))}</code></pre>`);
  }

  return html.join("\n");
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { metadata: {}, body: markdown };
  }

  const metadata = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) continue;

    const [, key, rawValue] = field;
    const value = rawValue.trim();
    if (value === "true") {
      metadata[key] = true;
    } else if (value === "false") {
      metadata[key] = false;
    } else {
      metadata[key] = value;
    }
  }

  return { metadata, body: match[2] };
}

function readContentFile(fileName) {
  const filePath = path.join(contentDir, fileName);
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8");
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function firstHeading(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function pageHtml({ title, body, stylesheetHref = "styles.css" }) {
  const header = renderMarkdown(readContentFile("_header.md"));
  const footer = renderMarkdown(readContentFile("_footer.md"));

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="${escapeAttribute(stylesheetHref)}">
</head>
<body>
  <main class="site">
${indent(header, 4)}
${indent(body, 4)}
${indent(footer, 4)}
  </main>
</body>
</html>
`;
}

function indent(value, spaces) {
  const prefix = " ".repeat(spaces);
  return value
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

function buildArticles() {
  const files = fs
    .readdirSync(contentDir)
    .filter((fileName) => !fileName.startsWith("_") && articlePattern.test(fileName));

  return files
    .map((fileName) => {
      const [, fileDate, slug] = fileName.match(articlePattern);
      const markdown = fs.readFileSync(path.join(contentDir, fileName), "utf8");
      const { metadata, body } = parseFrontmatter(markdown);

      const date = metadata.date || fileDate;
      const title = firstHeading(body) || titleFromSlug(slug);
      const outputName = `${path.basename(fileName, ".md")}.html`;

      return {
        date,
        fileName,
        href: `posts/${outputName}`,
        isPublished: metadata.published === true,
        outputName,
        slug,
        title,
        html: renderMarkdown(body),
      };
    })
    .sort((a, b) => {
      if (a.date && b.date && a.date !== b.date) return b.date.localeCompare(a.date);
      if (a.date !== b.date) return a.date ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
}

function articleListHtml(articles) {
  if (articles.length === 0) {
    return "<p>No articles yet.</p>";
  }

  const items = articles
    .map(
      (article) =>
        `<li>${article.date ? `<time datetime="${article.date}">${article.date}</time> ` : ""}<a href="${article.href}">${escapeHtml(article.title)}</a></li>`,
    )
    .join("\n");

  return `<ul class="article-list">\n${items}\n</ul>`;
}

function articleHtml(article) {
  const dateHtml = article.date ? `<time datetime="${article.date}">${article.date}</time>\n` : "";
  return `${dateHtml}${article.html}`;
}

function copyPublicAssets() {
  if (!fs.existsSync(publicDir)) return;
  fs.cpSync(publicDir, distDir, { recursive: true });
}

function build() {
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
  const postsDir = path.join(distDir, "posts");
  fs.mkdirSync(postsDir, { recursive: true });

  copyPublicAssets();

  const articles = buildArticles();

  for (const article of articles) {
    const html = pageHtml({
      title: article.title,
      body: articleHtml(article),
      stylesheetHref: "../styles.css",
    });
    fs.writeFileSync(path.join(postsDir, article.outputName), html);
  }

  const indexContent = renderMarkdown(readContentFile("_index.md"));
  const publishedArticles = articles.filter((article) => article.isPublished);
  const indexBody = `${indexContent}\n<h2>Articles</h2>\n${articleListHtml(publishedArticles)}`;
  fs.writeFileSync(path.join(distDir, "index.html"), pageHtml({ title: "Blog", body: indexBody }));

  console.log(`Built ${articles.length} article${articles.length === 1 ? "" : "s"} into dist/`);
}

build();
