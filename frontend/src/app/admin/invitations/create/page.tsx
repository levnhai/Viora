"use client";

import { useState, useEffect } from "react";
import { AdminInvitationCreatePage } from "@/views/admin";

export default function CreateInvitationRoute() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <AdminInvitationCreatePage />;
}
