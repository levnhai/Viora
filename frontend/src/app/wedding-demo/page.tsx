'use client';

import { useState, useEffect } from 'react';
import { WeddingInvitationDemoPage } from "@/views/wedding-invitation-demo/ui/WeddingInvitationDemoPage";
import { useRouter } from "next/navigation";

export default function WeddingDemo() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WeddingInvitationDemoPage 
      onBack={() => router.push("/")}
      onSelect={() => {
        router.push("/");
        setTimeout(() => {
          const el = document.getElementById("dang-ky-tu-van");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }}
    />
  );
}
