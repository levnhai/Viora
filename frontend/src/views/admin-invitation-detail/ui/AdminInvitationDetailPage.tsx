"use client";

import { AdminLayout } from "@/widgets/admin-layout/ui/AdminLayout";
import { DetailHeader } from "@/widgets/admin-invitation-detail/ui/DetailHeader";
import { DetailSummaryCard } from "@/widgets/admin-invitation-detail/ui/DetailSummaryCard";
import { DetailTabs } from "@/widgets/admin-invitation-detail/ui/DetailTabs";
import { DetailInfoTab } from "@/widgets/admin-invitation-detail/ui/DetailInfoTab";
import { DetailSidebar } from "@/widgets/admin-invitation-detail/ui/DetailSidebar";
import { useInvitationDetail } from "@/entities/invitation/model/useInvitationDetail";
import { Loader2 } from "lucide-react";

export function AdminInvitationDetailPage({ slug }: { slug: string }) {
  const { loading, data, error } = useInvitationDetail(slug);

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full text-red-500">
          Có lỗi xảy ra: {error}
        </div>
      </AdminLayout>
    );
  }

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
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
