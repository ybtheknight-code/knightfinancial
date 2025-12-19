'use client';

import { ReactNode } from 'react';
import { UserRole, BadgeType } from '@/types';
import { getRoleBadge, getBadgeInfo } from '@/utils';

interface BadgeProps {
  type?: 'role' | 'points' | 'achievement' | 'custom';
  role?: UserRole;
  badgeType?: BadgeType;
  points?: number;
  children?: ReactNode;
  className?: string;
}

export default function Badge({ type = 'custom', role, badgeType, points, children, className = '' }: BadgeProps) {
  if (type === 'role' && role) {
    const { icon, label, className: roleClass } = getRoleBadge(role);
    return (
      <span className={`${roleClass} ${className}`}>
        <span className="mr-1">{icon}</span>
        {label}
      </span>
    );
  }
  
  if (type === 'points' && points !== undefined) {
    return (
      <span className={`points-badge ${className}`}>
        <span className="mr-1">⭐</span>
        {points.toLocaleString()} pts
      </span>
    );
  }
  
  if (type === 'achievement' && badgeType) {
    const info = getBadgeInfo(badgeType);
    return (
      <span className={`badge-gold ${className}`} title={info.description}>
        <span className="mr-1">{info.icon}</span>
        {info.name}
      </span>
    );
  }
  
  return (
    <span className={`badge-gold ${className}`}>
      {children}
    </span>
  );
}
