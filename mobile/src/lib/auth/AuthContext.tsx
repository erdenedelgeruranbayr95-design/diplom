import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import * as api from "@/lib/api/client";
import type { SessionUser } from "@/types";

/* Вэбийн `components/providers/AuthProvider.tsx`-ийн RN хувилбар.

   Зарчим ижил: access token санах ойд, refresh token нь httpOnly cookie-д. Апп
   ачаалахад `refresh()` дуудаж сессээ ЧИМЭЭГҮЙ сэргээнэ — хэрэглэгч апп нээх бүрд
   дахин нэвтрэхгүй.

   RN-д ажиллах эсэх: Android нь cookie-г `CookieManager` (WebView-ийн сан), iOS нь
   `NSHTTPCookieStorage`-д хадгалдаг бөгөөд хоёул диск дээр тогтвортой үлддэг тул
   апп хаагаад нээхэд cookie амьд байна. Апп бүрэн УСТГАВАЛ л алга болно. */

type Role = "root" | "user" | "admin" | "therapist" | "parent" | "curator" | "moderator" | null;

interface AuthContextValue {
  user: SessionUser | null;
  role: Role;
  isRoot: boolean;
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
  subscribed: boolean;
  /** Эхний сесс сэргээлт дууссан эсэх — үүнээс өмнө чиглүүлэлт хийвэл нэвтэрсэн
   *  хэрэглэгчийг ч нэвтрэх дэлгэц рүү шидэж эхэлнэ. */
  ready: boolean;
  login: (email: string, password: string) => Promise<SessionUser>;
  register: (name: string, email: string, password: string, password2: string) => Promise<SessionUser>;
  logout: () => Promise<void>;
}

const AuthCtx = createContext<AuthContextValue | null>(null);

function normalizeRole(role: string | undefined): Role {
  if (!role) return null;
  return role.toLowerCase() as Role;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api
      .refresh()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  /* Access token сэргээгдэхгүй болбол api client энэ дохиог өгнө (вэб дээрх
     `sessionExpired` CustomEvent-ийн орлуулга). */
  useEffect(() => api.onSessionExpired(() => setUser(null)), []);

  const login = useCallback(async (email: string, password: string) => {
    const u = await api.login(email, password);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, password2: string) => {
    const u = await api.register(name, email, password, password2);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async () => {
    await api.logout();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const role = normalizeRole(user?.role);
    const isRoot = role === "root";
    // ROOT нь ADMIN-ы бүх эрхийг хамарна (backend-ийн RolesGuard шатлалтай нийцтэй).
    const isAdmin = role === "admin" || isRoot;
    return {
      user,
      role,
      isRoot,
      isAdmin,
      isTherapist: role === "therapist",
      isParent: role === "parent",
      subscribed: !!user?.sub?.active,
      ready,
      login,
      register,
      logout,
    };
  }, [user, ready, login, register, logout]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth-ийг AuthProvider дотор л дуудна");
  return ctx;
}
