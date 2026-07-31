"use client";

/* Төвлөрсөн auth төлөв — жинхэнэ эх сурвалж нь backend (JWT). Access token memory-д,
   refresh нь httpOnly cookie-д. Ачаалахад refresh cookie-гоор session-оо чимээгүй сэргээнэ. */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as api from "@/lib/api/client";
import { useWindowEvent } from "@/hooks/useWindowEvent";
import { APP_EVENTS } from "@/lib/data/events";
import type { SessionUser, UserSub } from "@/types/auth";

interface AuthContextValue {
  user: SessionUser | null;
  role: "root" | "user" | "admin" | "therapist" | "parent" | null;
  /** Систем эзэмшигч — ADMIN-аас дээр зэрэглэлтэй, Root Panel-д нэвтэрнэ. */
  isRoot: boolean;
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
  subscribed: boolean;
  ready: boolean;
  login: (email: string, password: string) => Promise<SessionUser>;
  register: (name: string, email: string, password: string, password2: string) => Promise<SessionUser>;
  logout: () => Promise<void>;
  updateUser: (patch: Partial<SessionUser>) => void;
  setSub: (sub: UserSub | null) => void;
  cancelSub: () => Promise<void>;
}

const AuthCtx = createContext<AuthContextValue | null>(null);

function normalizeRole(role: string | undefined): "root" | "user" | "admin" | "therapist" | "parent" | null {
  if (!role) return null;
  return role.toLowerCase() as "root" | "user" | "admin" | "therapist" | "parent";
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

  /* Access token сэргээгдэхгүй болбол api client энэ event-ийг дамжуулна. */
  useWindowEvent(APP_EVENTS.sessionExpired, () => setUser(null));

  const role = normalizeRole(user?.role);
  const isRoot = role === "root";
  /* ROOT нь ADMIN-ы бүх дэлгэц/эрхийг мөн хамарна (шатлал) — backend-ийн RolesGuard-тай нийцтэй. */
  const isAdmin = role === "admin" || isRoot;
  const isTherapist = role === "therapist";
  const isParent = role === "parent";
  const subscribed = isAdmin || !!user?.sub?.active;

  async function login(email: string, password: string) {
    const u = await api.login(email, password);
    setUser(u);
    return u;
  }
  async function register(name: string, email: string, password: string, password2: string) {
    const u = await api.register(name, email, password, password2);
    setUser(u);
    return u;
  }
  async function logout() {
    await api.logout();
    setUser(null);
  }
  function updateUser(patch: Partial<SessionUser>) {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }
  function setSub(sub: UserSub | null) {
    setUser((prev) => (prev ? { ...prev, sub } : prev));
  }
  async function cancelSub() {
    /* DB руу бодитоор бичнэ (DELETE /users/me/subscription) — эс бол refresh хийхэд
       backend-ийн хуучин (идэвхтэй) subActive дахин ирж, орон нутгийн цуцлалт алга болно. */
    await api.cancelSubscriptionMe().catch(() => {});
    setUser((prev) =>
      prev ? { ...prev, sub: prev.sub ? { ...prev.sub, active: false } : prev.sub } : prev,
    );
  }

  return (
    <AuthCtx.Provider
      value={{ user, role, isRoot, isAdmin, isTherapist, isParent, subscribed, ready, login, register, logout, updateUser, setSub, cancelSub }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth-ийг AuthProvider дотор ашиглана уу");
  return ctx;
}
