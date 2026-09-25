'use client';

import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';

export default function GoogleOAuthProviderWrapper({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
      {mounted && <Toaster richColors position="top-right" closeButton />}
    </GoogleOAuthProvider>
  );
}
