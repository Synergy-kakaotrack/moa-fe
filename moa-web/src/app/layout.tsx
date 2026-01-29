import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MOA',
  description: '흩어진 스크랩을 하나의 흐름으로, MOA',
  openGraph: {
    title: 'MOA',
    description: '흩어진 스크랩을 하나의 흐름으로, MOA',
    url: 'https://moa-fe-lovat.vercel.app',
    siteName: 'MOA',
    images: [
      {
        url: 'https://moa-fe-lovat.vercel.app/og.png',
        width: 1200,
        height: 630,
        alt: 'MOA 썸네일',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
