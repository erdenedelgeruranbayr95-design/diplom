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

type Role = "root" | "user" | "admin" | "artist" | "curator" | "moderator" | null;

interface AuthContextValue {
  user: SessionUser | null;
  role: Role;
  isRoot: boolean;
  isAdmin: boolean;
  subscribed: boolean;
  /** Эхний сесс сэргээлт дууссан эсэх — үүнээс өмнө чиглүүлэлт хийвэл нэвтэрсэн
   *  хэрэглэгчийг ч нэвтрэх дэлгэц рүү шидэж эхэлнэ. */
  ready: boolean;
  login: (email: string, password: string) => Promise<SessionUser>;
  register: (name: string, email: string, password: string, password2: string) => Promise<SessionUser>;
  /** Шууд ажиллана — серверийн хариуг хүлээхгүй тул `Promise` буцаахгүй. */
  logout: () => void;
  /** Сессийг серверээс дахин уншина.
   *
   *  Stripe Checkout нь СИСТЕМИЙН ХӨТЧӨӨР нээгддэг тул апп руу буцаж ирэхэд
   *  дотоод `user.sub` нь хоцрогдсон байна. PRO эрхийг webhook олгодог тул
   *  гараар "идэвхтэй" гэж тавих нь ХУДЛАА харуулах эрсдэлтэй — сервер л мэднэ. */
  refreshSession: () => Promise<SessionUser | null>;
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

  /* Төлөвийг ШУУД цэвэрлэнэ — сүлжээнээс ХАМААРАХГҮЙ.
     `api.logout()` нь серверт цуцлах хүсэлтээ дэвсгэрт явуулна (тайлбарыг
     `client.ts`-ээс үзнэ үү). Хэрэглэгч «Гарах» дарсан бол сүлжээ ажиллаж
     байгаа эсэхээс үл хамааран гарч чадах ёстой. */
  const logout = useCallback(() => {
    setUser(null);
    void api.logout();
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const u = await api.refresh();
      setUser(u);
      return u;
    } catch {
      /* Сесс дууссан бол `refresh()` алдаа шиднэ. Энэ нь төлбөрийн урсгалын
         алдаа биш тул энд барьж, дуудагч тал өөрөө шийднэ. */
      return null;
    }
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
      subscribed: !!user?.sub?.active,
      ready,
      login,
      register,
      logout,
      refreshSession,
    };
  }, [user, ready, login, register, logout, refreshSession]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth-ийг AuthProvider дотор л дуудна");
  return ctx;
}
