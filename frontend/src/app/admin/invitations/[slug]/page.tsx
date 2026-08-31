"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AdminInvitationDetailPage } from "@/views/admin";

export default function InvitationDetailRoute() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <AdminInvitationDetailPage slug={slug} />;
}
