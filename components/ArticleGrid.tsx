import type { Article } from '@/types/article';
import { ArticleCard } from './ArticleCard';
import { MotionStaggerItem, MotionStaggerList } from './motion/MotionStaggerList';

interface ArticleGridProps {
  readonly articles: readonly Article[];
}

const GRID_CLASSES = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3';

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
        No articles found right now. Check back soon.
      </p>
    );
  }

  return (
    <MotionStaggerList className={GRID_CLASSES}>
      {articles.map((article, index) => (
        <MotionStaggerItem key={article.id} index={index}>
          <ArticleCard article={article} priority={index === 0} />
        </MotionStaggerItem>
      ))}
    </MotionStaggerList>
  );
}
