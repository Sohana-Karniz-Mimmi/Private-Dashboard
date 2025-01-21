"use client";

import AuthProvider from "@/services/AuthProvider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
      <AuthProvider>{children}</AuthProvider>
  );
}
