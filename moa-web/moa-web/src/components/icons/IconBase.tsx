// icons/IconBase.tsx
import React from 'react';

export interface IconBaseProps {
  children: React.ReactNode;
  size?: number;
  className?: string;
  viewBox?: string;
}

export default function IconBase({
  children,
  size = 16,
  className,
  viewBox = '0 0 16 16',
}: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}