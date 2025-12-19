/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google avatars
      'avatars.githubusercontent.com', // GitHub avatars
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '').split('/')[0] || '',
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

module.exports = nextConfig;
