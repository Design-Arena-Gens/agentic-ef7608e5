import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Valorant x CS Elite Players',
  description:
    'Interactive dossier of Valorant professionals with tier-one Counter-Strike pedigree.',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100">
      <body className={`${inter.className} min-h-screen antialiased`}>{children}</body>
    </html>
  );
}
