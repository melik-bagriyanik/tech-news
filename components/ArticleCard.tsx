import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/types/article';
import { formatPublishedDate, truncate } from '@/lib/utils';
import { ArticleTags } from './article/ArticleTags';

interface ArticleCardProps {
  readonly article: Article;
  readonly priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const { id, title, description, coverImage, publishedAt, readingTimeMinutes, tags, author } =
    article;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-200/70 transition duration-200 focus-within:ring-2 focus-within:ring-zinc-900 hover:-translate-y-0.5 hover:shadow-md hover:ring-zinc-300 dark:bg-zinc-900 dark:ring-zinc-800/70 dark:focus-within:ring-zinc-100 dark:hover:ring-zinc-700">
      <Link
        href={`/articles/${id}`}
        className="flex h-full flex-1 flex-col outline-none"
        aria-label={title}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          {coverImage ? (
            <Image
              src={coverImage}
              alt=""
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-sm font-medium text-zinc-400 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-600"
            >
              No image
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <ArticleTags tags={tags} limit={3} />

          <h2 className="line-clamp-2 text-lg leading-snug font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
            {title}
          </h2>

          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {truncate(description, 140)}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-xs text-zinc-500 dark:text-zinc-500">
            <span className="truncate font-medium text-zinc-700 dark:text-zinc-300">
              {author.name}
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap">
              <time dateTime={publishedAt}>{formatPublishedDate(publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span aria-label={`${readingTimeMinutes} minute read`}>{readingTimeMinutes} min</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
