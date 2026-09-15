#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { Resvg } = require("@resvg/resvg-js");

const rootDir = path.resolve(__dirname, "..");
const contentDir = path.join(rootDir, "content");
const publicDir = path.join(rootDir, "public");
const outputDir = path.join(publicDir, "images", "og");
const faceImagePath = path.join(__dirname, "assets", "brooks-lybrand.jpeg");
const width = 1200;
const height = 630;
const fontFamily = "Arial";
const bodyFontFamily = "SF Pro Text, Helvetica Neue, Arial";
const headingFontFamily = "SF Pro Display, Helvetica Neue, Arial";
const colors = {
  background: "#1c1c1e",
  primary: "#f5f5f7",
  secondary: "#d1d1d6",
  muted: "#98989d",
};

// Satori needs a concrete font file. Arial is the final shared fallback in
// the site's system-font stack, and one logical family keeps the generated
// title and metadata consistent across platform-specific candidates.
const fontCandidates = [
  {
    name: fontFamily,
    path: "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    weight: 700,
    style: "normal",
  },
  {
    name: fontFamily,
    path: "/System/Library/Fonts/Supplemental/Arial.ttf",
    weight: 400,
    style: "normal",
  },
  {
    name: fontFamily,
    path: "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    weight: 700,
    style: "normal",
  },
  {
    name: fontFamily,
    path: "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    weight: 400,
    style: "normal",
  },
  {
    name: fontFamily,
    path: "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    weight: 700,
    style: "normal",
  },
  {
    name: fontFamily,
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

function titleFontSize(title) {
  if (title.length > 58) return 58;
  if (title.length > 42) return 68;
  if (title.length > 28) return 78;
  return 90;
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

function imageDataUri(filePath) {
  const mimeTypes = {
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  };
  const mimeType = mimeTypes[path.extname(filePath).toLowerCase()];

  if (!mimeType) {
    throw new Error(`Unsupported image type: ${filePath}`);
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Could not find face image: ${filePath}`);
  }

  return `data:${mimeType};base64,${fs.readFileSync(filePath).toString("base64")}`;
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
  const outputSlug = slug.replace(/[?]/g, "");
  const outputPath = explicitOutput
    ? path.resolve(rootDir, explicitOutput)
    : path.join(outputDir, `${outputSlug}.png`);
  const publicImagePath = `/${path.relative(publicDir, outputPath).split(path.sep).join("/")}`;
  const faceImage = imageDataUri(faceImagePath);

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
          justifyContent: "space-between",
          backgroundColor: colors.background,
          color: colors.primary,
          padding: "58px 72px 52px",
          fontFamily: bodyFontFamily,
        },
        children: [
          metadata.date
            ? {
                type: "div",
                props: {
                  style: {
                    color: colors.muted,
                    fontSize: 24,
                    lineHeight: 1.2,
                    letterSpacing: "0.02em",
                  },
                  children: metadata.date,
                },
              }
            : null,
          {
            type: "div",
            props: {
              style: {
                maxWidth: 1040,
                color: colors.primary,
                fontFamily: headingFontFamily,
                fontSize: titleFontSize(title),
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.02,
                marginTop: 28,
                marginBottom: 28,
              },
              children: title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                width: 220,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: 28,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: 128,
                      height: 128,
                      display: "flex",
                      position: "relative",
                      flexShrink: 0,
                      overflow: "hidden",
                      borderRadius: 64,
                    },
                    children: {
                      type: "img",
                      props: {
                        src: faceImage,
                        width: 260,
                        height: 243,
                        style: {
                          width: 260,
                          height: 243,
                          position: "absolute",
                          left: -71,
                          top: -11,
                        },
                      },
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      width: 220,
                      color: colors.secondary,
                      fontSize: 24,
                      fontWeight: 700,
                      lineHeight: 1.2,
                      marginTop: 12,
                      textAlign: "left",
                    },
                    children: "Brooks Lybrand",
                  },
                },
              ],
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
