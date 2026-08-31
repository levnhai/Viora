import { Metadata } from "next";
import { WeddingInvitationPage } from "@/views/live-preview";

type PageProps = {
  params: Promise<{ weddingSlug: string }> | { weddingSlug: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const weddingSlug = resolvedParams.weddingSlug;
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://thiepcuoionline-nine.vercel.app";
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const defaultOgImage = `${baseUrl}/og-banner.png`;

  try {
    const res = await fetch(`${apiBase}/api/weddings/${weddingSlug}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const wd = json.data;

        const groomName = wd.groomName || "Chú Rể";
        const brideName = wd.brideName || "Cô Dâu";
        const title =
          wd.seo?.title || `Thiệp Cưới: ${groomName} ❤️ ${brideName}`;

        let dateStr = "";
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

        let rawOgImage =
          wd.seo?.ogImage ||
          wd.coverImage ||
          wd.heroImage ||
          wd.groomAvatarUrl ||
          wd.brideAvatarUrl ||
          (Array.isArray(wd.galleryImages) && wd.galleryImages.length > 0
            ? wd.galleryImages[0]
            : null);

        let ogImage = defaultOgImage;
        if (rawOgImage) {
          if (
            !rawOgImage.startsWith("http://") &&
            !rawOgImage.startsWith("https://")
          ) {
            ogImage = rawOgImage.startsWith("/")
              ? `${baseUrl}${rawOgImage}`
              : `${baseUrl}/${rawOgImage}`;
          } else {
            ogImage = rawOgImage;
          }

          // Tự động cắt cúp chuẩn 1200x630 cho Zalo/Facebook nếu là ảnh Cloudinary (tránh lỗi ảnh dọc không hiện card)
          if (
            ogImage.includes("res.cloudinary.com") &&
            ogImage.includes("/upload/")
          ) {
            if (!ogImage.includes("/c_fill") && !ogImage.includes("/w_1200")) {
              ogImage = ogImage.replace(
                "/upload/",
                "/upload/c_fill,g_auto,w_1200,h_630/",
              );
            }
          }
        }

        const pageUrl = `${baseUrl}/w/${weddingSlug}`;

        return {
          title,
          description,
          robots: {
            index: true,
            follow: true,
          },
          openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: "Viora Studio",
            images: [
              {
                url: ogImage,
                secureUrl: ogImage,
                width: 1200,
                height: 630,
                alt: title,
                type: ogImage.endsWith(".png") ? "image/png" : "image/jpeg",
              },
            ],
            type: "website",
            locale: "vi_VN",
          },
          twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
          },
          other: {
            "og:image:secure_url": ogImage,
            "zalo:image": ogImage,
          },
        };
      }
    }
  } catch (error) {
    console.error("Lỗi khi tải metadata thiệp cưới:", error);
  }

  return {
    title: "Thiệp Cưới Trực Tuyến - Viora Studio",
    description:
      "Trân trọng kính mời quý khách tham dự lễ thành hôn. Bấm để xem thiệp chi tiết!",
    openGraph: {
      title: "Thiệp Cưới Trực Tuyến - Viora Studio",
      description:
        "Trân trọng kính mời quý khách tham dự lễ thành hôn. Bấm để xem thiệp chi tiết!",
      url: `${baseUrl}/w/${weddingSlug}`,
      images: [
        {
          url: defaultOgImage,
          secureUrl: defaultOgImage,
          width: 1200,
          height: 630,
          alt: "Thiệp Cưới Trực Tuyến - Viora Studio",
        },
      ],
    },
    other: {
      "og:image:secure_url": defaultOgImage,
      "zalo:image": defaultOgImage,
    },
  };
}

export default function WeddingInvitationRoute() {
  return <WeddingInvitationPage />;
}
