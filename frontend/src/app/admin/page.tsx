'use client';

import { useState, useEffect } from 'react';
import { AdminDashboardPage } from "@/views/admin/ui/AdminDashboardPage";

export default function AdminRoute() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <AdminDashboardPage />;
}
