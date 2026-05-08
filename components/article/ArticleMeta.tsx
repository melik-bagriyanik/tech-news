import Image from 'next/image';
import type { ArticleAuthor } from '@/types/article';
import { formatPublishedDate } from '@/lib/utils';

interface ArticleMetaProps {
  readonly author: ArticleAuthor;
  readonly publishedAt: string;
  readonly readingTimeMinutes: number;
}

export function ArticleMeta({ author, publishedAt, readingTimeMinutes }: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-zinc-200/70 pt-5 text-sm text-zinc-500 dark:border-zinc-800/70 dark:text-zinc-500">
      <Image
        src={author.profileImage}
        alt=""
        width={40}
        height={40}
        className="rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800"
      />
      <div className="flex flex-col">
        <span className="font-medium text-zinc-800 dark:text-zinc-200">{author.name}</span>
        <span className="text-xs">@{author.username}</span>
      </div>
      <span aria-hidden="true" className="mx-1">
        ·
      </span>
      <time dateTime={publishedAt}>{formatPublishedDate(publishedAt)}</time>
      <span aria-hidden="true">·</span>
      <span>{readingTimeMinutes} min read</span>
    </div>
  );
}
