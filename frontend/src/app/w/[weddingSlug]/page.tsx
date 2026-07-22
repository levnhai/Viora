import { Metadata } from 'next';
import { WeddingInvitationPage } from "@/views/wedding-invitation/ui/WeddingInvitationPage";

type PageProps = {
  params: Promise<{ weddingSlug: string }> | { weddingSlug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const weddingSlug = resolvedParams.weddingSlug;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://thiepcuoionline-nine.vercel.app';
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  const defaultOgImage = `${baseUrl}/og-banner.png`;

  try {
    const res = await fetch(`${apiBase}/api/weddings/${weddingSlug}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const wd = json.data;

        const groomName = wd.groomName || 'Chú Rể';
        const brideName = wd.brideName || 'Cô Dâu';
        const title = wd.seo?.title || `Thiệp Cưới: ${groomName} ❤️ ${brideName} | Viora Studio`;

        let dateStr = '';
        if (wd.weddingDate) {
          try {
            const d = new Date(wd.weddingDate);
            if (!isNaN(d.getTime())) {
              dateStr = ` ngày ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
            }
          } catch (_) {}
        }

        const description =
          wd.seo?.description ||
          `Trân trọng kính mời quý khách tham dự lễ thành hôn của ${groomName} & ${brideName}${dateStr}. Bấm để xem thiệp mời chi tiết và gửi lời chúc!`;

        let ogImage =
          wd.seo?.ogImage ||
          wd.coverImage ||
          wd.heroImage ||
          wd.groomAvatarUrl ||
          wd.brideAvatarUrl ||
          (Array.isArray(wd.galleryImages) && wd.galleryImages.length > 0 ? wd.galleryImages[0] : null);

        if (!ogImage) {
          ogImage = defaultOgImage;
        } else if (!ogImage.startsWith('http://') && !ogImage.startsWith('https://')) {
          ogImage = ogImage.startsWith('/') ? `${baseUrl}${ogImage}` : `${baseUrl}/${ogImage}`;
        }

        const pageUrl = `${baseUrl}/w/${weddingSlug}`;

        return {
          title,
          description,
          openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: 'Viora Studio',
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: title,
              },
            ],
            type: 'website',
            locale: 'vi_VN',
          },
          twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
          },
        };
      }
    }
  } catch (error) {
    console.error('Lỗi khi tải metadata thiệp cưới:', error);
  }

  return {
    title: 'Thiệp Cưới Trực Tuyến - Viora Studio',
    description: 'Trân trọng kính mời quý khách tham dự lễ thành hôn. Bấm để xem thiệp chi tiết!',
    openGraph: {
      title: 'Thiệp Cưới Trực Tuyến - Viora Studio',
      description: 'Trân trọng kính mời quý khách tham dự lễ thành hôn. Bấm để xem thiệp chi tiết!',
      url: `${baseUrl}/w/${weddingSlug}`,
      images: [defaultOgImage],
    },
  };
}

export default function WeddingInvitationRoute() {
  return <WeddingInvitationPage />;
}

