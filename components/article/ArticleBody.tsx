import { sanitizeArticleHtml } from '@/lib/sanitize';
import { MotionFadeUp } from '@/components/motion/MotionFadeUp';

interface ArticleBodyProps {
  readonly html: string;
}

const PROSE_CLASSES =
  'prose prose-zinc dark:prose-invert prose-headings:tracking-tight prose-a:text-emerald-700 prose-img:rounded-lg prose-pre:rounded-lg prose-pre:bg-zinc-900 dark:prose-a:text-emerald-400 mt-8 max-w-none';

export function ArticleBody({ html }: ArticleBodyProps) {
  const safeHtml = sanitizeArticleHtml(html);

  return (
    <MotionFadeUp delay={0.15}>
      <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: safeHtml }} />
    </MotionFadeUp>
  );
}
