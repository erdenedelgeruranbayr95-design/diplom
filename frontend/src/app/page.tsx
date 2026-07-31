"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/modals/AuthModal";
import AdminPanel from "@/components/modals/AdminPanel";
import Player from "@/components/player/Player";
import RootPanel from "@/components/root/RootPanel";
import SubscribeModal from "@/components/modals/SubscribeModal";
import { useAuth } from "@/components/providers/AuthProvider";
import Preloader from "@/components/landing/Preloader";
import BackgroundEffects from "@/components/landing/BackgroundEffects";
import HeroSection from "@/components/landing/HeroSection";
import Dock from "@/components/landing/Dock";
import Marquee from "@/components/landing/Marquee";
import Feel from "@/components/landing/Feel";
import Gallery from "@/components/landing/Gallery";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CallToActionSection from "@/components/landing/CallToActionSection";
import FooterSection from "@/components/landing/FooterSection";
import type { UserSub } from "@/types/auth";

export default function Page() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    import("@/lib/effects/landing-engine").then(({ initMedreh }) => {
      cleanup = initMedreh();
    });
    return () => cleanup?.();
  }, []);

  /* auth төлөв AuthContext-оос (session нэг эх сурвалж, backend JWT дээр суурилна) */
  const { user, isRoot, isAdmin, isTherapist, isParent, subscribed, logout: authLogout, setSub, cancelSub } = useAuth();

  const [authOpen, setAuthOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  /* Root Panel — зөвхөн ROOT дүрд. Backend-ийн RolesGuard нь жинхэнэ хамгаалалт. */
  const [rootOpen, setRootOpen] = useState(false);
  /* Landing нь ҮРГЭЛЖ эхэлж харагдана — нэвтэрсэн хэрэглэгчийн хувьд ч мөн адил.
     Өмнө нь `useState(!!user)` + `useEffect(() => { if (user) setPlayerOpen(true) })`
     гэсэн 2 газраас Player-ийг автоматаар нээдэг байсан тул сесстэй хэрэглэгч landing-ийг
     хэзээ ч харах боломжгүй, reload хийх бүрд шууд Player дээр бууж байв.

     Player руу орох замууд хэвээр:
       · Dock-ийн «Тоглуулагч» товч → openPlayer()  (нэвтэрсэн үед л харагдана)
       · Шинээр нэвтрэх/бүртгүүлэх   → handleAuth()  (AuthModal-ийн onAuth)
     Player доторх ✕ товч буцаад landing руу гаргана (onClose). */
  const [playerOpen, setPlayerOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  const handleAuth = () => {
    setPlayerOpen(true);
  };
  const logout = () => {
    authLogout();
    setAdminOpen(false);
    setRootOpen(false);
    setPlayerOpen(false);
    setSubOpen(false);
  };
  const openPlayer = () => {
    if (user) setPlayerOpen(true);
    else setAuthOpen(true);
  };
  const handleSubscribed = (sub: UserSub) => setSub(sub);
  const handleCancelSub = () => cancelSub();

  return (
    <>
      <Preloader />
      <BackgroundEffects />

      <HeroSection />
      <Dock
        user={user}
        isRoot={isRoot}
        isAdmin={isAdmin}
        onLogin={() => setAuthOpen(true)}
        onLogout={logout}
        onRoot={() => setRootOpen(true)}
        onAdmin={() => setAdminOpen(true)}
        onPlayer={openPlayer}
      />
      <Marquee />
      <Feel />
      <Gallery />
      <HowItWorksSection />
      <CallToActionSection />
      <FooterSection />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuth={handleAuth} />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} currentUser={user} />
      <Player
        open={playerOpen}
        onClose={() => setPlayerOpen(false)}
        user={user}
        subscribed={subscribed}
        onSubscribe={() => setSubOpen(true)}
        isAdmin={isAdmin}
        isTherapist={isTherapist}
        isParent={isParent}
        onAdmin={() => setAdminOpen(true)}
        onLogout={logout}
        onCancelSub={handleCancelSub}
      />
      <SubscribeModal open={subOpen} onClose={() => setSubOpen(false)} user={user} onSubscribed={handleSubscribed} />
      <RootPanel open={rootOpen} onClose={() => setRootOpen(false)} />
    </>
  );
}
