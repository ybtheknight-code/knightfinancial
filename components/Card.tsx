'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  premium?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', premium = false, hover = true, onClick }: CardProps) {
  const baseClasses = 'rounded-lg p-6 transition-all duration-300';
  const styleClasses = premium
    ? 'card-knight-premium'
    : `card-knight ${hover ? 'hover:scale-[1.02]' : ''}`;
  const clickClasses = onClick ? 'cursor-pointer' : '';
  
  return (
    <div
      className={`${baseClasses} ${styleClasses} ${clickClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
