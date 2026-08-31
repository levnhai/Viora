"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/widgets/admin";
import { DetailHeader } from "@/widgets/admin";
import { DetailSummaryCard } from "@/widgets/admin";
import { DetailTabs } from "@/widgets/admin";
import { DetailInfoTab } from "@/widgets/admin";
import { DetailSidebar } from "@/widgets/admin";
import { useInvitationDetail } from "@/entities/invitation/model/useInvitationDetail";
import { Loader2 } from "lucide-react";

export function AdminInvitationDetailPage({ slug }: { slug: string }) {
  const router = useRouter();
  const { loading, data, error } = useInvitationDetail(slug);

  useEffect(() => {
    if (error === "UNAUTHORIZED") {
      router.push("/admin/login-2h");
    }
  }, [error, router]);

  if (error === "UNAUTHORIZED") {
    return null;
  }

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          <p className="text-sm font-medium text-slate-500 animate-pulse">
            Đang tải chi tiết thiệp cưới...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-red-500 font-medium">
          Có lỗi xảy ra: {error}
        </div>
      </AdminLayout>
    );
  }

  const { wedding, template, themeSettings, sections, media, guestStats } =
    data;

  return (
    <AdminLayout>
      <div className="w-full max-w-[1600px] mx-auto">
        <DetailHeader data={data} />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* trái (70%) */}
          <div className="flex-1 min-w-0">
            <DetailSummaryCard data={data} />
            <DetailTabs />
            <DetailInfoTab data={data} />
          </div>

          {/* phải (30%) */}
          <div className="w-full lg:w-[320px] shrink-0">
            <DetailSidebar data={data} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
