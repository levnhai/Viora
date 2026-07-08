'use client';

import { useState, useEffect } from 'react';
import { LandingPage } from "@/views/landing/ui/LandingPage";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <LandingPage 
      onPreviewDemo={(tplId: string) => {
        router.push(`/wedding-demo?templateId=${tplId}`);
      }}
    />
  );
}
