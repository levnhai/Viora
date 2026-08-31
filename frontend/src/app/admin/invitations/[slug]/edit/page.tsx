"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AdminInvitationEditPage } from "@/views/admin";

export default function InvitationEditRoute() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <AdminInvitationEditPage slug={slug} />;
}
