import type { Article } from '@/types/article';
import { ArticleCard } from './ArticleCard';

interface ArticleGridProps {
  readonly articles: readonly Article[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
        No articles found right now. Check back soon.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <li key={article.id}>
          <ArticleCard article={article} priority={index < 3} />
        </li>
      ))}
    </ul>
  );
}
