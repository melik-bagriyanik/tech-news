'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type MediaImageProps = Readonly<Omit<ImageProps, 'onLoad'>>;

export function MediaImage({ alt, ...rest }: MediaImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Image alt={alt} {...rest} onLoad={() => setLoaded(true)} />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out ${
          loaded ? 'opacity-0' : 'opacity-100 animate-shimmer'
        }`}
      />
    </>
  );
}
