import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticleById, getArticles } from '@/lib/api';
import { formatPublishedDate } from '@/lib/utils';

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 600;

export async function generateStaticParams() {
  try {
    const articles = await getArticles({ perPage: 12 });
    return articles.map((article) => ({ id: String(article.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) return { title: 'Article not found' };

  const article = await getArticleById(numericId);
  if (!article) return { title: 'Article not found' };

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
      <nav className="mb-8 text-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-zinc-500 transition-colors hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">←</span> All articles
        </Link>
      </nav>

      <header className="space-y-5">
        {article.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, 4).map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}

        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl md:leading-tight">
          {article.title}
        </h1>

        <p className="text-lg leading-relaxed text-zinc-600">{article.description}</p>

        <div className="flex flex-wrap items-center gap-3 border-t border-zinc-200/70 pt-5 text-sm text-zinc-500">
          <Image
            src={article.author.profileImage}
            alt=""
            width={40}
            height={40}
            className="rounded-full ring-1 ring-zinc-200"
          />
          <div className="flex flex-col">
            <span className="font-medium text-zinc-800">{article.author.name}</span>
            <span className="text-xs">@{article.author.username}</span>
          </div>
          <span aria-hidden="true" className="mx-1">
            ·
          </span>
          <time dateTime={article.publishedAt}>{formatPublishedDate(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMinutes} min read</span>
        </div>
      </header>

      {article.coverImage && (
        <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 shadow-sm ring-1 ring-zinc-200/70">
          <Image
            src={article.coverImage}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-zinc prose-headings:tracking-tight prose-a:text-emerald-700 prose-img:rounded-lg prose-pre:rounded-lg prose-pre:bg-zinc-900 mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
      />

      <footer className="mt-12 border-t border-zinc-200/70 pt-6 text-sm text-zinc-500">
        Originally published on{' '}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline-offset-2 hover:underline"
        >
          dev.to
        </a>
        .
      </footer>
    </article>
  );
}
