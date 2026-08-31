"use client";

import { useState, useEffect } from "react";
import { AdminInvitationsPage } from "@/views/admin";

export default function InvitationsRoute() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <AdminInvitationsPage />;
}
