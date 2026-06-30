import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Admin | HG Grundbesitz GmbH',
  description: 'QuickCheck Admin-Dashboard der HG Grundbesitz GmbH.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-[#eef5fb] font-sans text-stone-950 antialiased`}>
        {children}
      </body>
    </html>
  );
}
