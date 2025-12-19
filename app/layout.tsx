import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TabLayout from '@/components/TabLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Knight Financial - FOR THE PEOPLE Credit Platform',
  description: "The World's First FOR THE PEOPLE Credit Reporting Platform. Ethical FinTech SaaS + Data Analytics + Social Media Platform.",
  keywords: 'credit repair, FCRA, TransUnion, Equifax, Experian, credit disputes, credit score, consumer rights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <TabLayout>
          {children}
        </TabLayout>
      </body>
    </html>
  );
}
