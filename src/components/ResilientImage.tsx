import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  eager = false,
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full min-h-[160px] flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200 text-stone-600 p-6 text-center"
      >
        <UtensilsCrossed className="w-7 h-7 text-[#7A5B21]" strokeWidth={1.5} />
        <span className="font-display text-lg font-semibold text-stone-800 line-clamp-2">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
