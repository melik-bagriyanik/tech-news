import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/api';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 1,
  };

  let articles: MetadataRoute.Sitemap = [];
  try {
    const list = await getArticles({ perPage: 30 });
    articles = list.map((article) => ({
      url: `${SITE_URL}/articles/${article.id}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch {
    // dev.to unreachable at build time — return at least the homepage so the
    // sitemap remains valid.
  }

  return [home, ...articles];
}
