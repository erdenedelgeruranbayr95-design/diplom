"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/modals/AuthModal";
import AdminPanel from "@/components/modals/AdminPanel";
import Player from "@/components/player/Player";
import RootPanel from "@/components/root/RootPanel";
import CuratorPanel from "@/components/curator/CuratorPanel";
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
import CheckoutReturn from "@/components/modals/CheckoutReturn";

export default function Page() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    import("@/lib/effects/landing-engine").then(({ initMedreh }) => {
      cleanup = initMedreh();
    });
    return () => cleanup?.();
  }, []);

  /* auth төлөв AuthContext-оос (session нэг эх сурвалж, backend JWT дээр суурилна) */
  const { user, isRoot, isAdmin, isCurator, subscribed, logout: authLogout, cancelSub } = useAuth();

  const [authOpen, setAuthOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  /* Root Panel — зөвхөн ROOT дүрд. Backend-ийн RolesGuard нь жинхэнэ хамгаалалт. */
  const [rootOpen, setRootOpen] = useState(false);
  /* Curator Panel — CURATOR/MODERATOR (ба ADMIN/ROOT) дүрд. Backend-ийн RolesGuard жинхэнэ хамгаалалт. */
  const [curatorOpen, setCuratorOpen] = useState(false);
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
    setCuratorOpen(false);
    setPlayerOpen(false);
    setSubOpen(false);
  };
  const openPlayer = () => {
    if (user) setPlayerOpen(true);
    else setAuthOpen(true);
  };
  const handleCancelSub = () => cancelSub();

  return (
    <>
      <Preloader />
      <BackgroundEffects />

      <HeroSection />
      {/* ROOT · Админ · Куратор товчнууд Dock-т байхаа больж, Тоглуулагчийн
          хажуугийн цэсний «Удирдлага» хэсэг рүү шилжсэн. */}
      <Dock user={user} onLogin={() => setAuthOpen(true)} onLogout={logout} onPlayer={openPlayer} />
      <Marquee />
      <Feel />
      <Gallery />
      <HowItWorksSection />
      <CallToActionSection />
      <FooterSection />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuth={handleAuth} />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} currentUser={user} />
      <Player
        /* `user` солигдох бvр (жиш. logout → өөр account-аар нэвтрэх) React-д
           Player-ийг БvРЭН шинээр mount хийлгэнэ. `key`-гvй vед React ижил
           component instance-ийг л дахин ашигладаг тул useAudioPlayback/
           useHapticEngine дотоод useState (одоо тоглож буй дуу, audioRef.src,
           device holbolt) хуучин хэрэглэгчийнхээ утгыг vргэлжлvvлж vлддэг байсан —
           тэр нь "logout хийгээд өөр account-оор нэвтрэхэд хуучин дуу player дээр
           хэвээрээ харагдана" гэдэг root cause. key солигдоход бvх дотоод hook
           cleanup (audio.pause(), listener salgah, device.stop()) автоматаар
           ажиллана. */
        key={user?.id ?? "guest"}
        open={playerOpen}
        onClose={() => setPlayerOpen(false)}
        user={user}
        subscribed={subscribed}
        onSubscribe={() => setSubOpen(true)}
        isRoot={isRoot}
        isAdmin={isAdmin}
        isCurator={isCurator}
        onRoot={() => setRootOpen(true)}
        onAdmin={() => setAdminOpen(true)}
        onCurator={() => setCuratorOpen(true)}
        onLogout={logout}
        onCancelSub={handleCancelSub}
        /* Самбарууд Player-ийн дээр нээгддэг тул түүний Escape шатлалыг түр унтраана. */
        panelOpen={rootOpen || adminOpen || curatorOpen}
      />
      <SubscribeModal open={subOpen} onClose={() => setSubOpen(false)} user={user} />
      {/* Stripe Checkout-аас `?status=success|cancel`-тэй буцаж ирэхийг барина. */}
      <CheckoutReturn />
      <RootPanel open={rootOpen} onClose={() => setRootOpen(false)} />
      <CuratorPanel open={curatorOpen} onClose={() => setCuratorOpen(false)} />
    </>
  );
}
