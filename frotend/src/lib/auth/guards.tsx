"use client";

/* Одоогоор идэвхгүй (react-router-ийн Route wrapper байхгүй, App Router дээр ч ашиглагдаагүй) —
   Player-ийн дотоод view-үүд бодит URL болох Phase 2-т зориулсан бэлдэц.
   Тэр үед usePathname/redirect (next/navigation)-ээр дахин зохион байгуулна. */
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  if (!ready) return null;
  if (!user) redirect("/");
  return children;
}

export function RequireRole({ roles, children }: { roles: string[]; children: ReactNode }) {
  const { user, role, ready } = useAuth();
  if (!ready) return null;
  if (!user) redirect("/");
  if (!role || !roles.includes(role)) redirect("/app");
  return children;
}
