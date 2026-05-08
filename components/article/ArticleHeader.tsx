import type { Article } from '@/types/article';
import { FadeUp } from '@/components/animate/FadeUp';
import { ArticleMeta } from './ArticleMeta';
import { ArticleTags } from './ArticleTags';

interface ArticleHeaderProps {
  readonly article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <FadeUp as="header" className="space-y-5">
      <ArticleTags tags={article.tags} />
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl md:leading-tight dark:text-zinc-100">
        {article.title}
      </h1>
      <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {article.description}
      </p>
      <ArticleMeta
        author={article.author}
        publishedAt={article.publishedAt}
        readingTimeMinutes={article.readingTimeMinutes}
      />
    </FadeUp>
  );
}
