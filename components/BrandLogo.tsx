import React from 'react';
import { cn } from '../lib/utils';

type BrandLogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
};

const SIZE_STYLES = {
  sm: {
    container: 'gap-3',
    block: 'h-10 w-10 rounded-[0.9rem]',
    mark: 'text-[1.55rem]',
    name: 'text-sm sm:text-[1.05rem]',
    suffix: 'mt-1 text-[8px] sm:text-[9px]',
  },
  md: {
    container: 'gap-3.5',
    block: 'h-12 w-12 rounded-[1rem]',
    mark: 'text-[1.8rem]',
    name: 'text-lg sm:text-[1.35rem]',
    suffix: 'mt-1 text-[9px] sm:text-[10px]',
  },
  lg: {
    container: 'gap-4 sm:gap-5',
    block: 'h-16 w-16 sm:h-20 sm:w-20 rounded-[1.1rem] sm:rounded-[1.25rem]',
    mark: 'text-[2.35rem] sm:text-[3rem]',
    name: 'text-[1.65rem] sm:text-[2.4rem]',
    suffix: 'mt-1.5 text-[10px] sm:text-xs',
  },
} as const;

const VARIANT_STYLES = {
  dark: {
    name: 'text-white',
    suffix: 'text-white/55',
    border: 'border-white/10',
    shadow: 'shadow-[0_18px_40px_rgba(12,74,126,0.32)]',
  },
  light: {
    name: 'text-stone-950',
    suffix: 'text-stone-500',
    border: 'border-stone-950/10',
    shadow: 'shadow-[0_18px_36px_rgba(15,23,42,0.16)]',
  },
} as const;

const BrandLogo: React.FC<BrandLogoProps> = ({
  className,
  size = 'md',
  variant = 'dark',
}) => {
  const sizeStyles = SIZE_STYLES[size];
  const variantStyles = VARIANT_STYLES[variant];

  return (
    <div className={cn('inline-flex items-center', sizeStyles.container, className)}>
      <div
        className={cn(
          'flex shrink-0 items-center justify-center border bg-[#0B4E84] ring-1 ring-white/5',
          sizeStyles.block,
          variantStyles.border,
          variantStyles.shadow
        )}
      >
        <span className={cn('font-black leading-none tracking-[-0.09em] text-white', sizeStyles.mark)}>
          HG
        </span>
      </div>

      <div className="flex min-w-0 flex-col leading-[0.88]">
        <span className={cn('font-semibold tracking-[-0.045em]', sizeStyles.name, variantStyles.name)}>
          Grundbesitz
        </span>
        <span className={cn('font-semibold tracking-[0.12em]', sizeStyles.suffix, variantStyles.suffix)}>
          GmbH
        </span>
      </div>
    </div>
  );
};

export default BrandLogo;
