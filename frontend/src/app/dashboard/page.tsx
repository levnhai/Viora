'use client';

import { useState, useEffect } from 'react';
import { BuyerDashboardPage } from "@/views/buyer-dashboard/ui/BuyerDashboardPage";

export default function DashboardRoute() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <BuyerDashboardPage />;
}
