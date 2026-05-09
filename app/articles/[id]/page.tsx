import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleById } from '@/lib/api';
import { ArticleBody } from '@/components/article/ArticleBody';
import { ArticleCover } from '@/components/article/ArticleCover';
import { ArticleHeader } from '@/components/article/ArticleHeader';
import { ArticleSourceLink } from '@/components/article/ArticleSourceLink';
import { BackToArticlesLink } from '@/components/article/BackToArticlesLink';

interface ArticlePageProps {
  readonly params: Promise<{ id: string }>;
}

export const revalidate = 600;

const NOT_FOUND_METADATA: Metadata = {
  title: 'Article not found',
  robots: { index: false, follow: false },
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) return NOT_FOUND_METADATA;

  const article = await getArticleById(numericId);
  if (!article) return NOT_FOUND_METADATA;

  const cover = article.coverImage ? [article.coverImage] : [];
  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author.name }],
    keywords: article.tags,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: cover,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: cover,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) notFound();

  const article = await getArticleById(numericId);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <BackToArticlesLink />
      <ArticleHeader article={article} />
      {article.coverImage && <ArticleCover src={article.coverImage} />}
      <ArticleBody html={article.bodyHtml} />
      <ArticleSourceLink url={article.url} />
    </article>
  );
}
