'use client';

import { useState, useEffect } from 'react';
import { TemplatesPage } from "@/views/templates/ui/TemplatesPage";

export default function TemplatesRoute() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <TemplatesPage />;
}
