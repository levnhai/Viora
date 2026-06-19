'use client';

import { useState, useEffect } from 'react';
import { AccountSettingsPage } from "@/views/account-settings/ui/AccountSettingsPage";

export default function AccountRoute() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <AccountSettingsPage />;
}
