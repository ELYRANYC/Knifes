'use client';

import { cn } from '@/lib/utils';
import type { UsernameEffect } from '@/lib/types';

export function UsernameText({
  text,
  effect,
  className,
  style,
}: {
  text: string;
  effect: UsernameEffect | undefined;
  className?: string;
  style?: React.CSSProperties;
}) {
  switch (effect) {
    case 'gradient':
      return (
        <span className={cn('username-gradient', className)} style={style}>
          {text}
        </span>
      );
    case 'glow':
      return (
        <span className={cn('username-glow', className)} style={style}>
          {text}
        </span>
      );
    case 'glitch':
      return (
        <span className={cn('username-glitch', className)} data-text={text} style={style}>
          {text}
        </span>
      );
    case 'rainbow':
      return (
        <span className={cn('username-rainbow', className)} style={style}>
          {text}
        </span>
      );
    case 'none':
    default:
      return (
        <span className={className} style={style}>
          {text}
        </span>
      );
  }
}
