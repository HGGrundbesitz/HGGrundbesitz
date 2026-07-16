import {Inter} from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export default function AdminLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="de">
      <body className={`${inter.variable} min-h-screen bg-[var(--color-bg)] font-sans text-[var(--color-ink)] antialiased selection:bg-[var(--color-accent)] selection:text-[var(--color-contrast-ink)]`}>
        {children}
      </body>
    </html>
  );
}
