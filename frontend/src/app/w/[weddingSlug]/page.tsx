import { Metadata } from "next";
import { WeddingInvitationPage } from "@/views/live-preview";
import { WeddingData } from "@/entities/invitation/model/types";
import { getDemoWeddingData } from "@/entities/invitation/model/mockData";

type PageProps = {
  params: Promise<{ weddingSlug: string }> | { weddingSlug: string };
};

async function fetchWeddingDataServer(weddingSlug: string): Promise<WeddingData | null> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  try {
    const res = await fetch(`${apiBase}/api/weddings/${weddingSlug}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const wd = { ...json.data };
        if (wd.themeSettings?.musicUrl) {
          wd.musicUrl = wd.themeSettings.musicUrl;
        }
        return wd;
      }
    }
  } catch (err) {
    console.error("Lỗi khi tải dữ liệu thiệp cưới trên Server:", err);
  }

  // Fallback sang mock data cho slug demo / xem thử
  if (
    weddingSlug.includes("demo") ||
    weddingSlug.includes("vanan") ||
    weddingSlug.includes("leminhhai") ||
    weddingSlug.includes("haianh") ||
    weddingSlug.includes("le-hoangoanh")
  ) {
    return getDemoWeddingData("temp_14");
  }

  return null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const weddingSlug = resolvedParams.weddingSlug;
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://thiepcuoionline-nine.vercel.app";
  const defaultOgImage = `${baseUrl}/og-banner.png`;

  const wd = await fetchWeddingDataServer(weddingSlug);

  if (wd) {
    const isGraduation =
      wd.templateId === "temp_14" ||
      wd.templateId === "14" ||
      weddingSlug.includes("tot-nghiep") ||
      weddingSlug.includes("le-hoangoanh");

    const groomName = wd.groomName || "Chú Rể";
    const brideName = wd.brideName || "Cô Dâu";

    let graduateName = "Lê Hoàng Oanh";
    if (wd.groomName && wd.brideName && wd.groomName.toLowerCase() !== wd.brideName.toLowerCase()) {
      graduateName = `${wd.groomName} ${wd.brideName}`;
    } else {
      graduateName = wd.brideName || wd.groomName || "Lê Hoàng Oanh";
    }

    const title =
      wd.seo?.title ||
      (isGraduation
        ? `Thiệp Mời Lễ Tốt Nghiệp: Tân Cử Nhân ${graduateName}`
        : `Thiệp Cưới: ${groomName} ❤️ ${brideName}`);

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
      (isGraduation
        ? `Trân trọng kính mời quý khách đến tham dự Lễ tốt nghiệp của Tân Cử Nhân ${graduateName}${dateStr}. Bấm để xem thiệp mời chi tiết!`
        : `Trân trọng kính mời quý khách tham dự lễ thành hôn của ${groomName} & ${brideName}${dateStr}. Bấm để xem thiệp mời chi tiết và gửi lời chúc!`);

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

      if (
        ogImage.includes("res.cloudinary.com") &&
        ogImage.includes("/upload/")
      ) {
        if (!ogImage.includes("/c_fill") && !ogImage.includes("/w_1200")) {
          ogImage = ogImage.replace(
            "/upload/",
            "/upload/f_auto,q_auto,c_fill,g_auto,w_1200,h_630/",
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

  const isGraduationFallback =
    weddingSlug.includes("tot-nghiep") ||
    weddingSlug.includes("le-hoangoanh") ||
    weddingSlug.includes("temp_14");

  const defaultTitle = isGraduationFallback
    ? "Thiệp Mời Lễ Tốt Nghiệp: Tân Cử Nhân Lê Hoàng Oanh 🎓"
    : "Thiệp Cưới Trực Tuyến - Viora Studio";
  const defaultDesc = isGraduationFallback
    ? "Trân trọng kính mời quý khách đến tham dự Lễ tốt nghiệp của Tân Cử Nhân Lê Hoàng Oanh. Bấm để xem thiệp mời chi tiết!"
    : "Trân trọng kính mời quý khách tham dự lễ thành hôn. Bấm để xem thiệp chi tiết!";

  return {
    title: defaultTitle,
    description: defaultDesc,
    openGraph: {
      title: defaultTitle,
      description: defaultDesc,
      url: `${baseUrl}/w/${weddingSlug}`,
      images: [
        {
          url: defaultOgImage,
          secureUrl: defaultOgImage,
          width: 1200,
          height: 630,
          alt: defaultTitle,
        },
      ],
    },
    other: {
      "og:image:secure_url": defaultOgImage,
      "zalo:image": defaultOgImage,
    },
  };
}

export default async function WeddingInvitationRoute({
  params,
}: PageProps) {
  const resolvedParams = await params;
  const weddingSlug = resolvedParams.weddingSlug;
  const initialData = await fetchWeddingDataServer(weddingSlug);

  return (
    <>
      <link rel="preconnect" href="https://w.ladicdn.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://w.ladicdn.com" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      <WeddingInvitationPage initialData={initialData} />
    </>
  );
}

