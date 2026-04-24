import React from 'react';
import { cn } from '../lib/utils';

type BrandLogoProps = {
  className?: string;
  mode?: 'badge' | 'wordmark';
  size?: 'sm' | 'md' | 'lg';
  showSuffix?: boolean;
  variant?: 'dark' | 'light' | 'adaptive';
};

const SIZE_STYLES = {
  sm: {
    container: 'gap-2.5',
    blockWrap: 'w-[3.25rem] pb-[0.28rem]',
    block: 'h-11 w-[3.25rem]',
    underline: 'h-[0.34rem]',
    mark: 'text-[2rem]',
    stack: 'gap-[0.12rem] pt-[0.05rem]',
    stackCompact: 'justify-center pt-[0.3rem]',
    name: 'text-[1.12rem]',
    suffix: 'text-[0.48rem]',
    wordmark: 'text-[1.14rem]',
    wordmarkGap: 'gap-1',
    wordmarkSuffix: 'text-[0.84rem]',
  },
  md: {
    container: 'gap-3',
    blockWrap: 'w-[4.2rem] pb-[0.38rem]',
    block: 'h-[3.55rem] w-[4.2rem]',
    underline: 'h-[0.42rem]',
    mark: 'text-[2.55rem]',
    stack: 'gap-[0.18rem] pt-[0.08rem]',
    stackCompact: 'justify-center pt-[0.5rem]',
    name: 'text-[1.55rem]',
    suffix: 'text-[0.66rem]',
    wordmark: 'text-[1.5rem]',
    wordmarkGap: 'gap-1.5',
    wordmarkSuffix: 'text-[1.05rem]',
  },
  lg: {
    container: 'gap-4',
    blockWrap: 'w-[5.8rem] pb-[0.55rem] sm:w-[7rem]',
    block: 'h-[5rem] w-[5.8rem] sm:h-[6rem] sm:w-[7rem]',
    underline: 'h-[0.62rem] sm:h-[0.72rem]',
    mark: 'text-[3.6rem] sm:text-[4.35rem]',
    stack: 'gap-[0.24rem] pt-[0.15rem]',
    stackCompact: 'justify-center pt-[0.7rem] sm:pt-[0.85rem]',
    name: 'text-[2.1rem] sm:text-[2.8rem]',
    suffix: 'text-[0.85rem] sm:text-[1rem]',
    wordmark: 'text-[2.15rem] sm:text-[2.7rem]',
    wordmarkGap: 'gap-2',
    wordmarkSuffix: 'text-[1.45rem] sm:text-[1.8rem]',
  },
} as const;

const VARIANT_STYLES = {
  dark: {
    name: 'text-white',
    suffix: 'text-white/82',
    underline: 'bg-white/14',
    shadow: 'shadow-[0_18px_36px_rgba(5,9,15,0.35)]',
  },
  light: {
    name: 'text-[#17181b]',
    suffix: 'text-[#2a2d31]',
    underline: 'bg-[#d7d8dc]',
    shadow: 'shadow-[0_12px_24px_rgba(15,23,42,0.08)]',
  },
  adaptive: {
    name: 'text-[#17181b]',
    suffix: 'text-[#2a2d31]',
    underline: 'bg-[#d7d8dc]',
    shadow: 'shadow-[0_12px_24px_rgba(15,23,42,0.08)]',
  },
} as const;

const BrandLogo: React.FC<BrandLogoProps> = ({
  className,
  mode = 'badge',
  size = 'md',
  showSuffix = true,
  variant = 'adaptive',
}) => {
  const sizeStyles = SIZE_STYLES[size];
  const variantStyles = VARIANT_STYLES[variant];

  if (mode === 'wordmark') {
    return (
      <div
        className={cn(
          'inline-flex items-center leading-none',
          sizeStyles.wordmarkGap,
          className
        )}
      >
        <span
          className={cn(
            'font-medium tracking-[-0.045em]',
            sizeStyles.wordmark,
            variantStyles.name
          )}
        >
          HG
        </span>
        <span
          className={cn(
            'font-medium tracking-[-0.04em]',
            sizeStyles.wordmark,
            variantStyles.name
          )}
        >
          Grundbesitz
        </span>
        {showSuffix && (
          <span
            className={cn(
              'font-medium tracking-[-0.03em]',
              sizeStyles.wordmarkSuffix,
              variantStyles.suffix
            )}
          >
            GmbH
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn('inline-flex items-start', sizeStyles.container, className)}>
      <div className={cn('relative shrink-0', sizeStyles.blockWrap)}>
        <div
          className={cn(
            'relative flex items-center justify-center overflow-hidden bg-[#0d4f87]',
            sizeStyles.block,
            variantStyles.shadow
          )}
        >
          <span className={cn('font-black leading-none tracking-[-0.08em] text-white', sizeStyles.mark)}>
            HG
          </span>
        </div>
        <span
          aria-hidden="true"
          className={cn('absolute bottom-0 left-0 w-full', sizeStyles.underline, variantStyles.underline)}
        />
      </div>

      <div
        className={cn(
          'flex min-w-0 flex-col leading-none',
          showSuffix ? sizeStyles.stack : sizeStyles.stackCompact
        )}
      >
        <span
          className={cn(
            'font-[800] tracking-[-0.055em] text-balance',
            sizeStyles.name,
            variantStyles.name
          )}
        >
          Grundbesitz
        </span>
        {showSuffix && (
          <span
            className={cn(
              'self-end font-[700] tracking-[-0.02em]',
              sizeStyles.suffix,
              variantStyles.suffix
            )}
          >
            GmbH
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
