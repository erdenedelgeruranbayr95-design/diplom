"use client";

/* Аппын тогтмол бүрхүүл — (app) route group-ийн БҮХ хуудсанд хамаарна.

   Next.js App Router-ийн гол давуу тал энд ашиглагдана: layout нь доторх route
   солигдоход дахин ачаалагддаггүй. Тиймээс <audio>, TopBar, Sidebar, доод баар
   бүгд энд байрлаж, /home → /browse → /stats гэж явахад дуу ТАСРАХГҮЙ.

   Өмнө нь энэ бүхэн Player.tsx доторх `view` state байсан тул 20 дэлгэц ганц
   хаягтай, буцах товч ажиллахгүй байсан. */
import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import PlayerProvider, { VIEW_PATH, type ViewName } from "@/components/providers/PlayerProvider";
import AdminPanel from "@/components/modals/AdminPanel";
import SubscribeModal from "@/components/modals/SubscribeModal";
import type { UserSub } from "@/types/auth";

/* URL → ViewName (Sidebar/TopBar-ын идэвхтэй төлвийг тэмдэглэхэд) */
const PATH_VIEW = Object.entries(VIEW_PATH).reduce<Record<string, ViewName>>((acc, [view, path]) => {
  if (!acc[path]) acc[path] = view as ViewName;
  return acc;
}, {});

function viewFromPath(pathname: string): ViewName {
  if (pathname.startsWith("/track/")) return "detail";
  if (pathname.startsWith("/analysis/")) return "analysis";
  return PATH_VIEW[pathname] ?? "home";
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, ready, isAdmin, isTherapist, isParent, subscribed, logout: authLogout, setSub, cancelSub } = useAuth();

  const [adminOpen, setAdminOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  /* Нэвтрээгүй бол landing руу буцаана (сесс сэргэхийг хүлээнэ) */
  useEffect(() => {
    if (ready && !user) router.replace("/");
  }, [ready, user, router]);

  if (!ready || !user) return null;

  const logout = () => {
    authLogout();
    setAdminOpen(false);
    setSubOpen(false);
    router.push("/");
  };

  return (
    <>
      <PlayerProvider
        view={viewFromPath(pathname)}
        user={user}
        subscribed={subscribed}
        onSubscribe={() => setSubOpen(true)}
        isAdmin={isAdmin}
        isTherapist={isTherapist}
        isParent={isParent}
        onAdmin={() => setAdminOpen(true)}
        onLogout={logout}
        onCancelSub={() => cancelSub()}
      >
        {children}
      </PlayerProvider>

      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} currentUser={user} />
      <SubscribeModal open={subOpen} onClose={() => setSubOpen(false)} user={user} onSubscribed={(sub: UserSub) => setSub(sub)} />
    </>
  );
}
