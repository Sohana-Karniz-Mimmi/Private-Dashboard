"use client";
import { Toaster } from 'react-hot-toast';
import AuthProvider from "@/services/AuthProvider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
      <AuthProvider>{children} <Toaster /></AuthProvider>
  );
}
