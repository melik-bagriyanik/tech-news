import type { Article, ArticleAuthor, ArticleDetail, GetArticlesParams } from '@/types/article';

const API_BASE = 'https://dev.to/api';
const LIST_REVALIDATE_SECONDS = 300;
const DETAIL_REVALIDATE_SECONDS = 600;

interface RawAuthor {
  name: string;
  username: string;
  profile_image: string;
}

interface RawArticleListItem {
  id: number;
  title: string;
  description: string;
  cover_image: string | null;
  social_image: string | null;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[] | string;
  url: string;
  user: RawAuthor;
}

function normalizeTagList(tagList: string[] | string | null | undefined): string[] {
  if (!tagList) return [];
  if (Array.isArray(tagList)) return tagList;
  return tagList
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

interface RawArticleDetail extends RawArticleListItem {
  body_html: string;
}

export class ArticleApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ArticleApiError';
    this.status = status;
  }
}

function mapAuthor(raw: RawAuthor): ArticleAuthor {
  return {
    name: raw.name,
    username: raw.username,
    profileImage: raw.profile_image,
  };
}

function mapArticle(raw: RawArticleListItem): Article {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    coverImage: raw.cover_image ?? raw.social_image ?? null,
    publishedAt: raw.published_at,
    readingTimeMinutes: raw.reading_time_minutes,
    tags: normalizeTagList(raw.tag_list),
    url: raw.url,
    author: mapAuthor(raw.user),
  };
}

export async function getArticles({ page = 1, perPage = 12, tag }: GetArticlesParams = {}): Promise<
  Article[]
> {
  const search = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });
  if (tag) search.set('tag', tag);

  const res = await fetch(`${API_BASE}/articles?${search.toString()}`, {
    next: { revalidate: LIST_REVALIDATE_SECONDS, tags: ['articles'] },
  });

  if (!res.ok) {
    throw new ArticleApiError(`Failed to fetch articles (${res.status})`, res.status);
  }

  const raw = (await res.json()) as RawArticleListItem[];
  return raw.map(mapArticle);
}

export async function getArticleById(id: number): Promise<ArticleDetail | null> {
  const res = await fetch(`${API_BASE}/articles/${id}`, {
    next: {
      revalidate: DETAIL_REVALIDATE_SECONDS,
      tags: ['articles', `article-${id}`],
    },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new ArticleApiError(`Failed to fetch article ${id} (${res.status})`, res.status);
  }

  const raw = (await res.json()) as RawArticleDetail;
  return { ...mapArticle(raw), bodyHtml: raw.body_html };
}
