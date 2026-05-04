#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { Resvg } = require("@resvg/resvg-js");

const rootDir = path.resolve(__dirname, "..");
const contentDir = path.join(rootDir, "content");
const publicDir = path.join(rootDir, "public");
const outputDir = path.join(publicDir, "images", "og");
const width = 1200;
const height = 630;

const fontCandidates = [
  {
    name: "Arial",
    path: "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    weight: 700,
    style: "normal",
  },
  {
    name: "Arial",
    path: "/System/Library/Fonts/Supplemental/Arial.ttf",
    weight: 400,
    style: "normal",
  },
  {
    name: "DejaVu Sans",
    path: "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    weight: 700,
    style: "normal",
  },
  {
    name: "DejaVu Sans",
    path: "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    weight: 400,
    style: "normal",
  },
  {
    name: "Liberation Sans",
    path: "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    weight: 700,
    style: "normal",
  },
  {
    name: "Liberation Sans",
    path: "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    weight: 400,
    style: "normal",
  },
];

function usage() {
  console.error("Usage: pnpm og <content-file-or-slug> [--output public/images/og/name.png] [--update-frontmatter]");
  console.error("Example: pnpm og content/being-bad-at-coding.md --update-frontmatter");
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { metadata: {}, body: markdown, frontmatter: null };
  }

  const metadata = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) continue;
    metadata[field[1]] = field[2].trim();
  }

  return { metadata, body: match[2], frontmatter: match[1] };
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function resolveContentPath(input) {
  if (!input) return null;

  const candidates = [
    path.resolve(rootDir, input),
    path.join(contentDir, input),
    path.join(contentDir, `${input}.md`),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function stripInlineMarkdown(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function firstHeading(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? stripInlineMarkdown(match[1]) : null;
}

function excerptFromBody(markdown, title) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const paragraphs = [];
  let current = [];
  let hasSeenTitle = false;
  let inCodeBlock = false;

  function flush() {
    if (current.length === 0) return;
    const text = stripInlineMarkdown(current.join(" "));
    current = [];

    if (!text) return;
    if (/^\(.+\)$/.test(text)) return;
    if (text === title) return;
    paragraphs.push(text);
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      flush();
      continue;
    }

    if (inCodeBlock) continue;

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flush();

      if (heading[1] === "#") {
        hasSeenTitle = true;
        continue;
      }

      if (hasSeenTitle && paragraphs.length > 0) break;
      continue;
    }

    if (!hasSeenTitle && title) continue;

    if (
      line === "" ||
      line.startsWith(">") ||
      line.startsWith("![") ||
      /^[-*]\s+/.test(line) ||
      /^\d+\.\s+/.test(line)
    ) {
      flush();
      continue;
    }

    current.push(line);
    if (paragraphs.length >= 4) break;
  }

  flush();
  return paragraphs.slice(0, 4);
}

function clampText(value, maxLength) {
  if (value.length <= maxLength) return value;
  const trimmed = value.slice(0, maxLength - 1);
  return `${trimmed.slice(0, Math.max(0, trimmed.lastIndexOf(" ")))}...`;
}

function loadFonts() {
  const fonts = [];
  const seen = new Set();

  for (const candidate of fontCandidates) {
    if (seen.has(`${candidate.name}-${candidate.weight}-${candidate.style}`)) continue;
    if (!fs.existsSync(candidate.path)) continue;

    seen.add(`${candidate.name}-${candidate.weight}-${candidate.style}`);
    fonts.push({
      name: candidate.name,
      data: fs.readFileSync(candidate.path),
      weight: candidate.weight,
      style: candidate.style,
    });
  }

  if (fonts.length === 0) {
    throw new Error("Could not find a usable font. Add a font path to fontCandidates in scripts/og.js.");
  }

  return fonts;
}

function getArgValue(args, name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] || null;
}

function updateFrontmatter(filePath, markdown, publicImagePath) {
  const { metadata, frontmatter } = parseFrontmatter(markdown);
  const ogImageLine = `ogImage: ${publicImagePath}`;

  if (frontmatter === null) {
    return `---\n${ogImageLine}\n---\n\n${markdown}`;
  }

  const lines = frontmatter.split("\n");
  const existingIndex = lines.findIndex((line) => /^ogImage:\s*/.test(line));

  if (existingIndex >= 0) {
    lines[existingIndex] = ogImageLine;
  } else {
    const insertAfter = lines.findIndex((line) => /^description:\s*/.test(line));
    lines.splice(insertAfter >= 0 ? insertAfter + 1 : lines.length, 0, ogImageLine);
  }

  if (metadata.ogImage === publicImagePath) return markdown;

  return markdown.replace(/^---\n[\s\S]*?\n---/, `---\n${lines.join("\n")}\n---`);
}

function formatBytes(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

function optimizePngWithFfmpeg(filePath) {
  const before = fs.statSync(filePath).size;
  const directory = path.dirname(filePath);
  const extension = path.extname(filePath);
  const baseName = path.basename(filePath, extension);
  const tempPath = path.join(directory, `.${baseName}-${process.pid}.ffmpeg${extension}`);

  const result = spawnSync(
    "ffmpeg",
    ["-y", "-loglevel", "error", "-i", filePath, "-compression_level", "9", tempPath],
    { encoding: "utf8" },
  );

  if (result.error) {
    if (result.error.code === "ENOENT") {
      console.warn("Skipping PNG optimization because ffmpeg is not installed.");
      return null;
    }

    throw result.error;
  }

  if (result.status !== 0) {
    fs.rmSync(tempPath, { force: true });
    console.warn(`Skipping PNG optimization because ffmpeg failed: ${result.stderr.trim()}`);
    return null;
  }

  const after = fs.statSync(tempPath).size;
  if (after < before) {
    fs.renameSync(tempPath, filePath);
    return { before, after };
  }

  fs.rmSync(tempPath, { force: true });
  return { before, after: before };
}

async function main() {
  const { default: satori } = await import("satori");
  const args = process.argv.slice(2);
  const input = args.find((arg) => !arg.startsWith("-"));
  const shouldUpdateFrontmatter = args.includes("--update-frontmatter");
  const explicitOutput = getArgValue(args, "--output");
  const contentPath = resolveContentPath(input);

  if (!contentPath) {
    usage();
    process.exit(1);
  }

  const markdown = fs.readFileSync(contentPath, "utf8");
  const { metadata, body } = parseFrontmatter(markdown);
  const slug = path.basename(contentPath, ".md");
  const title = firstHeading(body) || metadata.title || titleFromSlug(slug);
  const excerpt = excerptFromBody(body, title);
  const outputPath = explicitOutput
    ? path.resolve(rootDir, explicitOutput)
    : path.join(outputDir, `${slug}.png`);
  const publicImagePath = `/${path.relative(publicDir, outputPath).split(path.sep).join("/")}`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width,
          height,
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          color: "#1d1d1f",
          padding: "54px 72px 58px",
          fontFamily: "SF Pro Text, Helvetica Neue, Arial",
        },
        children: [
          metadata.date
            ? {
                type: "div",
                props: {
                  style: {
                    color: "#6e6e73",
                    fontSize: 25,
                    lineHeight: 1.2,
                    letterSpacing: 1,
                    marginBottom: 42,
                  },
                  children: metadata.date,
                },
              }
            : null,
          {
            type: "div",
            props: {
              style: {
                maxWidth: 980,
                color: "#1d1d1f",
                fontFamily: "SF Pro Display, Helvetica Neue, Arial",
                fontSize: title.length > 44 ? 78 : title.length > 30 ? 88 : 96,
                fontWeight: 700,
                letterSpacing: "-0.045em",
                lineHeight: 0.98,
                marginBottom: 44,
              },
              children: title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                maxWidth: 980,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                color: "#424245",
                fontSize: 32,
                lineHeight: 1.35,
                letterSpacing: "-0.012em",
              },
              children: excerpt.map((paragraph) => ({
                type: "div",
                props: { children: clampText(paragraph, 150) },
              })),
            },
          },
        ].filter(Boolean),
      },
    },
    {
      width,
      height,
      fonts: loadFonts(),
    },
  );

  const image = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width,
    },
  })
    .render()
    .asPng();

  fs.writeFileSync(outputPath, image);
  const optimization = optimizePngWithFfmpeg(outputPath);

  if (shouldUpdateFrontmatter) {
    fs.writeFileSync(contentPath, updateFrontmatter(contentPath, markdown, publicImagePath));
  }

  console.log(`Generated ${path.relative(rootDir, outputPath)}`);
  if (optimization) {
    const saved = optimization.before - optimization.after;
    console.log(`Optimized PNG with ffmpeg: ${formatBytes(optimization.after)}${saved > 0 ? ` (${formatBytes(saved)} saved)` : ""}`);
  }
  if (shouldUpdateFrontmatter) {
    console.log(`Updated ${path.relative(rootDir, contentPath)} with ogImage: ${publicImagePath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
