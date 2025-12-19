'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'gold' | 'gold-outline' | 'black' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  href?: string;
}

export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  fullWidth = false,
  loading = false,
  href,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'font-bold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2';
  
  const variantClasses = {
    gold: 'bg-knight-gold text-black hover:bg-knight-gold-light hover:shadow-gold',
    'gold-outline': 'border-2 border-knight-gold text-knight-gold hover:bg-knight-gold hover:text-black hover:shadow-gold',
    black: 'bg-knight-card text-white border-2 border-knight-gold hover:bg-knight-hover hover:shadow-gold',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={allClasses}>
        {loading && <div className="spinner-knight w-5 h-5" />}
        {children}
      </Link>
    );
  }
  
  return (
    <button
      className={allClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div className="spinner-knight w-5 h-5" />}
      {children}
    </button>
  );
}
