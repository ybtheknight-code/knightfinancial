'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserProfile } from '@/types';
import Badge from './Badge';

interface HeaderProps {
  user?: UserProfile | null;
}

export default function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  const navLinks = user
    ? [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/tools', label: 'Tools' },
        { href: '/academy', label: 'Academy' },
        { href: '/forms', label: 'Forms' },
        { href: '/resources', label: 'Resources' },
        { href: '/community', label: 'Community' },
        { href: '/messages', label: 'Messages' },
      ]
    : [
        { href: '/about', label: 'About' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/contact', label: 'Contact' },
      ];
  
  return (
    <header className="bg-knight-black border-b-2 border-knight-gold sticky top-0 z-50">
      <div className="container-knight py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-3">
            <div className="text-4xl">⚔️</div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-gold">KNIGHT FINANCIAL</h1>
              <p className="text-xs text-gray-400 hidden sm:block">FOR THE PEOPLE</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-bold transition-colors ${
                  isActive(link.href)
                    ? 'text-knight-gold'
                    : 'text-white hover:text-knight-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {user.points > 0 && (
                  <Badge type="points" points={user.points} />
                )}
                <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition">
                  <div className="w-10 h-10 rounded-full bg-knight-gold flex items-center justify-center font-bold text-black">
                    {user.first_name?.[0] || user.email[0].toUpperCase()}
                  </div>
                  <Badge type="role" role={user.role} />
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-knight-gold font-bold">
                  Login
                </Link>
                <Link href="/register" className="btn-gold">
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-knight-gold"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-knight-gold-dark pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-bold transition-colors ${
                    isActive(link.href)
                      ? 'text-knight-gold'
                      : 'text-white hover:text-knight-gold'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <Link
                  href="/profile"
                  className="btn-gold-outline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn-gold-outline" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register" className="btn-gold" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
