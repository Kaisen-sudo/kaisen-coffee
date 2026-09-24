import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
  size?: 'default' | 'narrow' | 'wide';
  spacing?: 'default' | 'compact' | 'loose';
  reveal?: boolean;
}

const spacings = {
  compact: 'py-10 sm:py-14',
  default: 'py-14 sm:py-20 lg:py-24',
  loose: 'py-20 sm:py-28 lg:py-32',
} as const;

export function Section({
  children,
  className,
  containerClassName,
  id,
  as: Tag = 'section',
  size = 'default',
  spacing = 'default',
  reveal = true,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(spacings[spacing], reveal && 'reveal', className)}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </Tag>
  );
}