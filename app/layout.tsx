import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SiteHeader } from '@/components/SiteHeader';
import { ScrollToTop } from '@/components/ScrollToTop';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_NAME = 'Melik News';
const SITE_DESCRIPTION = 'Curated tech articles from the developer community.';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://dev-to-uploads.s3.amazonaws.com" crossOrigin="" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://media2.dev.to" />
      </head>
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col text-zinc-900 dark:text-zinc-100"
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="skip-link rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Skip to content
          </a>
          <SiteHeader siteName={SITE_NAME} />
          <main
            id="main-content"
            className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12"
          >
            {children}
          </main>
          <footer className="mt-12 px-4 pb-10 text-center text-xs text-zinc-500 sm:px-6 dark:text-zinc-500">
            © {new Date().getFullYear()} {SITE_NAME} · Article data from dev.to public API
          </footer>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
