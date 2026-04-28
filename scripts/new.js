#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const contentDir = path.join(rootDir, "content");

function usage() {
  console.error("Usage: node scripts/new.js article-title");
  console.error("Example: node scripts/new.js remix-jam-wrapup");
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const input = process.argv.slice(2).join(" ");
const slug = slugify(input);

if (!slug) {
  usage();
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const fileName = `${slug}.md`;
const filePath = path.join(contentDir, fileName);

fs.mkdirSync(contentDir, { recursive: true });

if (fs.existsSync(filePath)) {
  console.error(`Article already exists: content/${fileName}`);
  process.exit(1);
}

const title = titleFromSlug(slug);
const markdown = `---
date: ${today}
published: false
---

# ${title}

Write the article here.
`;

fs.writeFileSync(filePath, markdown);
console.log(`Created content/${fileName}`);
