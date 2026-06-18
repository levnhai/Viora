import './styles/index.css';
import { Metadata } from 'next';
import GoogleOAuthProviderWrapper from './GoogleOAuthProviderWrapper';

export const metadata: Metadata = {
  title: 'Viora Studio - Thiệp Cưới Trực Tuyến Sang Trọng',
  description: 'Tự tay thiết kế thiệp cưới trực tuyến sang trọng và cao cấp. Dễ dàng tùy biến, quản lý khách mời RSVP và lời chúc.',
  robots: {
    index: false,
    follow: false,
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
          </GoogleOAuthProviderWrapper>
        </div>
      </body>
    </html>
  );
}
