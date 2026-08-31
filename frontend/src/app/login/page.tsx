'use client';

import { useState, useEffect } from 'react';
import { LoginPage } from "@/views/public-pages";

export default function LoginRoute() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <LoginPage />;
}
