"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/types";

export function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode, requiredRole?: UserRole }) {
  const { isAuthenticated, isLoading, isAtLeast } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (requiredRole && !isAtLeast(requiredRole)) {
        router.push('/');
      }
    }
  }, [isLoading, isAuthenticated, requiredRole, router, pathname, isAtLeast]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
    </div>;
  }

  if (!isAuthenticated || (requiredRole && !isAtLeast(requiredRole))) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
