'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  username: string | null;
  email: string;
  role: string;
  is_prime: boolean;
  points: number;
  badges: string[];
  avatar_url: string | null;
}

// Main navigation tabs
const TABS = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/dashboard', color: 'from-blue-500 to-blue-600' },
  { id: 'community', label: 'Community', icon: '⚔️', path: '/community', color: 'from-purple-500 to-purple-600' },
  { id: 'tools', label: 'Tools', icon: '🛠️', path: '/tools', color: 'from-green-500 to-green-600' },
  { id: 'academy', label: 'Academy', icon: '🎓', path: '/academy', color: 'from-yellow-500 to-yellow-600' },
  { id: 'forms', label: 'Forms', icon: '📋', path: '/forms', color: 'from-orange-500 to-orange-600' },
  { id: 'messages', label: 'Messages', icon: '💬', path: '/messages', color: 'from-pink-500 to-pink-600' },
  { id: 'services', label: 'Services', icon: '💎', path: '/services', color: 'from-cyan-500 to-cyan-600' },
];

// Pages that should show the tab layout (logged in users)
const TAB_LAYOUT_PATHS = [
  '/dashboard', '/community', '/tools', '/academy', '/forms', '/messages', '/services',
  '/profile', '/leaderboard', '/points-guide', '/admin', '/knight-intel', '/resources',
];

// Pages that should show public header (not logged in or public pages)
const PUBLIC_PAGES = ['/', '/login', '/register', '/about', '/privacy', '/terms', '/contact', '/pricing', '/forgot-password', '/faq'];

export default function TabLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    
    // Initial load
    loadUser();
    
    // Listen for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await loadUser();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUser = async () => {
    const supabase = createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    
    if (authUser) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
      
      if (profile) {
        setUser(profile);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  // Check if we should show tab layout
  const shouldShowTabs = TAB_LAYOUT_PATHS.some(p => pathname.startsWith(p));
  const isPublicPage = PUBLIC_PAGES.includes(pathname);
  
  // Show loading spinner briefly
  if (loading && shouldShowTabs) {
    return (
      <div className="min-h-screen bg-knight-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">⚔️</div>
          <p className="text-knight-gold">Loading...</p>
        </div>
      </div>
    );
  }

  // Public pages get simple header/footer
  if (isPublicPage || (!shouldShowTabs && !user)) {
    return (
      <div className="min-h-screen bg-knight-black flex flex-col">
        {/* Public Header */}
        <header className="bg-knight-black border-b border-knight-gold-dark">
          <div className="container-knight">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-3xl">⚔️</span>
                <span className="text-xl font-bold text-gradient-gold">KNIGHT FINANCIAL</span>
              </Link>
              <div className="flex items-center gap-4">
                {user ? (
                  <Link href="/dashboard" className="btn-knight">
                    Dashboard →
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="text-gray-400 hover:text-white transition">
                      Login
                    </Link>
                    <Link href="/register" className="btn-knight">
                      Join Free →
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">{children}</main>

        {/* Public Footer */}
        <footer className="bg-knight-hover border-t border-knight-gold-dark py-8">
          <div className="container-knight">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">⚔️</span>
                  <span className="text-lg font-bold text-gradient-gold">KNIGHT FINANCIAL</span>
                </div>
                <p className="text-sm text-gray-400">The World's First FOR THE PEOPLE Credit Reporting Platform.</p>
                <p className="text-xs text-gray-500 mt-2">Black-Owned • Tuskegee, Alabama</p>
              </div>
              <div>
                <h4 className="font-bold text-knight-gold mb-4">Platform</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/about" className="block text-gray-400 hover:text-white">About Us</Link>
                  <Link href="/pricing" className="block text-gray-400 hover:text-white">Pricing</Link>
                  <Link href="/services" className="block text-gray-400 hover:text-white">Paid Services</Link>
                  <Link href="/faq" className="block text-gray-400 hover:text-white">FAQ</Link>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-knight-gold mb-4">Legal</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/privacy" className="block text-gray-400 hover:text-white">Privacy Policy</Link>
                  <Link href="/terms" className="block text-gray-400 hover:text-white">Terms of Service</Link>
                  <Link href="/contact" className="block text-gray-400 hover:text-white">Contact</Link>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-knight-gold mb-4">📞 Contact CEO Directly</h4>
                <p className="text-white font-bold text-lg">334-938-9171</p>
                <p className="text-sm text-gray-400">raheem@knightfin.org</p>
                <p className="text-xs text-gray-500 mt-2">We're the ONLY company where you can reach the CEO!</p>
                <div className="mt-3 text-sm text-gray-400">
                  <p>Support: 855-516-8003</p>
                  <p>support@knightfin.org</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-knight-gold-dark text-center text-sm text-gray-500">
              <p>© 2025 Knight Financial, LLC. 404 Brown Street, Tuskegee, AL 36083</p>
              <p className="mt-1">FinTech SaaS • Not a Credit Repair Organization • Not a Law Firm</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Get active tab
  const activeTab = TABS.find(t => pathname.startsWith(t.path))?.id || 'home';
    const getAvatar = () => {
  if (user?.avatar_url) return user?.avatar_url;
  return user?.first_name?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || '?';
};

  return (
    <div className="min-h-screen bg-knight-black flex flex-col">
      {/* Top Header Bar */}
      <header className="bg-gradient-to-r from-knight-black via-knight-hover to-knight-black border-b border-knight-gold-dark sticky top-0 z-50">
        <div className="container-knight">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-3xl">⚔️</span>
              <span className="text-xl font-bold text-gradient-gold hidden sm:block">KNIGHT FINANCIAL</span>
            </Link>

            {/* Desktop: User Info + Points */}
            <div className="hidden md:flex items-center gap-4">
              {/* Prime Badge */}
              {user?.is_prime && (
                <div className="bg-gradient-to-r from-knight-gold to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 animate-pulse">
                  ⭐ PRIME
                </div>
              )}
              
              {/* Points */}
              <Link href="/points-guide" className="flex items-center gap-2 bg-knight-hover px-4 py-2 rounded-full hover:bg-knight-gold-dark transition">
                <span className="text-knight-gold font-bold">🏆 {user?.points.toLocaleString()}</span>
                <span className="text-gray-400 text-sm">pts</span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 bg-knight-hover px-3 py-2 rounded-full hover:bg-knight-gold-dark transition">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                   user?.is_prime ? 'bg-gradient-to-r from-knight-gold to-yellow-500 text-black' : 'bg-knight-gold-dark text-white'
                  }`}>
                    {getAvatar()}
                  </div>
                  <span className="text-white font-medium hidden lg:block">
                    {user?.first_name || user?.username}
                  </span>
                  <span className="text-gray-400">▼</span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-knight-hover border border-knight-gold-dark rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/profile" className="block px-4 py-3 text-white hover:bg-knight-gold-dark transition">
                    👤 My Profile
                  </Link>
                  <Link href="/leaderboard" className="block px-4 py-3 text-white hover:bg-knight-gold-dark transition">
                    🏆 Leaderboard
                  </Link>
                  {!user?.is_prime && (
                    <Link href="/pricing" className="block px-4 py-3 text-knight-gold hover:bg-knight-gold-dark transition font-bold">
                      ⭐ Upgrade to Prime
                    </Link>
                  )}
                 {['admin', 'executive', 'ceo'].includes(user?.role || '') && (
                    <Link href="/admin" className="block px-4 py-3 text-red-400 hover:bg-knight-gold-dark transition">
                      🔴 Admin Panel
                    </Link>
                  )}
                  <div className="border-t border-knight-gold-dark">
                    <form action="/api/auth/logout" method="POST">
                      <button type="submit" className="w-full text-left px-4 py-3 text-gray-400 hover:bg-knight-gold-dark hover:text-white transition">
                        🚪 Sign Out
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-2xl text-knight-gold"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation Bar */}
      <nav className="bg-knight-hover border-b border-knight-gold-dark sticky top-16 z-40">
        <div className="container-knight">
          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center gap-1 py-2">
            {TABS.map(tab => (
              <Link
                key={tab.id}
                href={tab.path}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold transition-all ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                    : 'text-gray-400 hover:text-white hover:bg-knight-black'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Tabs - Scrollable */}
          <div className="md:hidden flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <Link
                key={tab.id}
                href={tab.path}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white`
                    : 'text-gray-400'
                }`}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span className="text-xs">{tab.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 md:hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-gradient-gold">⚔️ Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-3xl text-white">
                ✕
              </button>
            </div>
            
            {/* User Info */}
            <div className="bg-knight-hover rounded-lg p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${
                  user?.is_prime ? 'bg-gradient-to-r from-knight-gold to-yellow-500 text-black' : 'bg-knight-gold-dark text-white'
                }`}>
                  {getAvatar()}
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{user?.first_name} {user?.last_name}</div>
                  <div className="text-knight-gold">🏆 {user?.points.toLocaleString()} points</div>
                  {user?.is_prime && <div className="text-yellow-400 text-sm font-bold">⭐ PRIME MEMBER</div>}
                </div>
              </div>
            </div>

            {/* Menu Links */}
            <div className="space-y-2">
              <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="block bg-knight-hover p-4 rounded-lg text-white">
                👤 My Profile
              </Link>
              <Link href="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="block bg-knight-hover p-4 rounded-lg text-white">
                🏆 Leaderboard
              </Link>
              {!user?.is_prime && (
                <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block bg-gradient-to-r from-knight-gold to-yellow-500 p-4 rounded-lg text-black font-bold">
                  ⭐ Upgrade to PRIME
                </Link>
              )}
             {['admin', 'executive', 'ceo'].includes(user?.role || '') && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block bg-red-900 p-4 rounded-lg text-white">
                  🔴 Admin Panel
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - Minimal */}
      <footer className="bg-knight-hover border-t border-knight-gold-dark py-4">
        <div className="container-knight">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>⚔️</span>
              <span>© 2025 Knight Financial</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-knight-gold">About</Link>
              <Link href="/privacy" className="hover:text-knight-gold">Privacy</Link>
              <Link href="/terms" className="hover:text-knight-gold">Terms</Link>
              <Link href="/contact" className="hover:text-knight-gold">Contact</Link>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:3349389171" className="text-knight-gold hover:underline">334-938-9171</a>
              <span className="text-xs">(CEO Direct)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
