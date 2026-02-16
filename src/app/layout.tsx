import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/**
 * Global Metadata following the 2026 SEO standards. [cite: 4]
 */
export const metadata: Metadata = {
  title: 'Guardia AI | Content Governance Hub',
  description: 'Automated AI Content Quality Auditing powered by Cloudinary',
};

/**
 * Root Layout Blueprint.
 * Mandatory: Uses the /src directory and Feature-Grouped component imports. [cite: 9, 10]
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-200 min-h-screen flex flex-col`}
      >
        {/* Layout Components strictly imported from /components/layout [cite: 13] */}
        <Navbar />

        <main className='grow container mx-auto px-4 py-12'>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
