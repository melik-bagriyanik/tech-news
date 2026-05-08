import Image from 'next/image';
import { FadeUp } from '@/components/animate/FadeUp';

interface ArticleCoverProps {
  readonly src: string;
}

export function ArticleCover({ src }: ArticleCoverProps) {
  return (
    <FadeUp delay={0.1} className="my-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 shadow-sm ring-1 ring-zinc-200/70 dark:bg-zinc-800 dark:ring-zinc-800/70">
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
    </FadeUp>
  );
}
