import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/types/article';
import { formatPublishedDate, truncate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const { id, title, description, coverImage, publishedAt, readingTimeMinutes, tags } = article;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow focus-within:ring-2 focus-within:ring-zinc-900 hover:shadow-md">
      <Link
        href={`/articles/${id}`}
        className="flex flex-1 flex-col outline-none"
        aria-label={title}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100">
          {coverImage ? (
            <Image
              src={coverImage}
              alt=""
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center text-sm text-zinc-400"
            >
              No image
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}

          <h2 className="line-clamp-2 text-lg leading-snug font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700">
            {title}
          </h2>

          <p className="line-clamp-2 text-sm text-zinc-600">{truncate(description, 140)}</p>

          <div className="mt-auto flex items-center justify-between pt-2 text-xs text-zinc-500">
            <time dateTime={publishedAt}>{formatPublishedDate(publishedAt)}</time>
            <span aria-label={`${readingTimeMinutes} minute read`}>
              {readingTimeMinutes} min read
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
