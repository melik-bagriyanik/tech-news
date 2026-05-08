import type { Article } from '@/types/article';
import { ArticleCard } from './ArticleCard';
import { StaggerItem, StaggerList } from './animate/StaggerList';

interface ArticleGridProps {
  readonly articles: readonly Article[];
}

export const GRID_CLASSES =
  'grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12';

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
        No articles found right now. Check back soon.
      </p>
    );
  }

  return (
    <StaggerList className={GRID_CLASSES}>
      {articles.map((article, index) => (
        <StaggerItem key={article.id} index={index}>
          <ArticleCard article={article} priority={index === 0} />
        </StaggerItem>
      ))}
    </StaggerList>
  );
}
