import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/types/article';
import { formatPublishedDate, truncate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const { id, title, description, coverImage, publishedAt, readingTimeMinutes, tags, author } =
    article;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-200/70 transition duration-200 focus-within:ring-2 focus-within:ring-zinc-900 hover:-translate-y-0.5 hover:shadow-md hover:ring-zinc-300">
      <Link
        href={`/articles/${id}`}
        className="flex h-full flex-1 flex-col outline-none"
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
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-sm font-medium text-zinc-400"
            >
              No image
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}

          <h2 className="line-clamp-2 text-lg leading-snug font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700">
            {title}
          </h2>

          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600">
            {truncate(description, 140)}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-xs text-zinc-500">
            <span className="truncate font-medium text-zinc-700">{author.name}</span>
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
