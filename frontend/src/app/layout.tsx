import './styles/index.css';
import { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import GoogleOAuthProviderWrapper from './GoogleOAuthProviderWrapper';
import { BottomNav } from '@/widgets/bottom-nav/ui/BottomNav';
import { FloatingZaloContact } from '@/widgets/zalo-contact/ui/FloatingZaloContact';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://thiepcuoionline-nine.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Viora Studio - Thiệp Cưới Trực Tuyến Sang Trọng',
  description: 'Tự tay thiết kế thiệp cưới trực tuyến sang trọng và cao cấp. Dễ dàng tùy biến, quản lý khách mời RSVP và lời chúc.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Viora Studio - Thiệp Cưới Trực Tuyến Sang Trọng',
    description: 'Tự tay thiết kế thiệp cưới trực tuyến sang trọng và cao cấp. Dễ dàng tùy biến, quản lý khách mời RSVP và lời chúc.',
    siteName: 'Viora Studio',
    url: siteUrl,
    images: [
      {
        url: '/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Viora Studio - Thiệp Cưới Trực Tuyến',
      },
    ],
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viora Studio - Thiệp Cưới Trực Tuyến Sang Trọng',
    description: 'Tự tay thiết kế thiệp cưới trực tuyến sang trọng và cao cấp. Dễ dàng tùy biến, quản lý khách mời RSVP và lời chúc.',
    images: ['/og-banner.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body style={{ height: '100%', margin: 0 }}>
        <div id="root" style={{ height: '100%' }}>
          <GoogleOAuthProviderWrapper>
            {children}
            <Suspense fallback={null}>
              <BottomNav />
            </Suspense>
            <FloatingZaloContact />
          </GoogleOAuthProviderWrapper>
        </div>
      </body>
    </html>
  );
}
