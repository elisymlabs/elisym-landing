import { marked } from "marked";

export interface Post {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  description: string;
  tags: string[];
  author: { name: string; role: string; initial: string; avatarBg: string };
  image: string;
  body: string;
  html: string;
}

const modules = import.meta.glob("./posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: raw };
  }
  const fmText = match[1];
  const body = match[2];
  const meta: Record<string, string> = {};
  for (const line of fmText.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) {
      continue;
    }
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, body };
}

function formatDateLabel(iso: string): string {
  const parts = iso.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
    return iso;
  }
  const [y, m, d] = parts;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function toPost(raw: string): Post {
  const { meta, body } = parseFrontmatter(raw);
  return {
    slug: meta.slug,
    title: meta.title,
    date: meta.date,
    dateLabel: formatDateLabel(meta.date),
    description: meta.description,
    tags: (meta.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    author: {
      name: meta.authorName,
      role: meta.authorRole,
      initial: meta.authorInitial,
      avatarBg: meta.authorAvatarBg,
    },
    image: meta.image,
    body,
    html: marked.parse(body, { async: false }) as string,
  };
}

export const posts: Post[] = Object.values(modules)
  .map((raw) => toPost(raw as string))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
