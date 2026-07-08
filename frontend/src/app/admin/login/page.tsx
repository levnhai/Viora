'use client';

import { useState, useEffect } from 'react';
import { AdminLoginPage } from "@/views/admin/ui/AdminLoginPage";

export default function AdminLoginRoute() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <AdminLoginPage />;
}
