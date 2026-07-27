"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/modals/AuthModal";
import { seedFeed } from "@/lib/data/library";
import AdminPanel from "@/components/modals/AdminPanel";
import Player from "@/components/player/Player";
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
    seedFeed();
    let cleanup: (() => void) | undefined;
    import("@/lib/effects/landing-engine").then(({ initMedreh }) => {
      cleanup = initMedreh();
    });
    return () => cleanup?.();
  }, []);

  /* auth төлөв AuthContext-оос (session нэг эх сурвалж, backend JWT дээр суурилна) */
  const { user, isAdmin, isTherapist, isParent, subscribed, logout: authLogout, setSub, cancelSub } = useAuth();

  const [authOpen, setAuthOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  /* нэвтэрсэн хэрэглэгч (сесс сэргээх/reload үед ч) шууд Player app руу орно —
     landing/marketing нь зөвхөн зочдод зориулагдана */
  const [playerOpen, setPlayerOpen] = useState(!!user);
  const [subOpen, setSubOpen] = useState(false);

  useEffect(() => {
    if (user) setPlayerOpen(true);
  }, [user]);

  const handleAuth = () => {
    setPlayerOpen(true);
  };
  const logout = () => {
    authLogout();
    setAdminOpen(false);
    setPlayerOpen(false);
    setSubOpen(false);
  };
  const openPlayer = () => {
    user ? setPlayerOpen(true) : setAuthOpen(true);
  };
  const handleSubscribed = (sub: UserSub) => setSub(sub);
  const handleCancelSub = () => cancelSub();

  return (
    <>
      <Preloader />
      <BackgroundEffects />

      <HeroSection />
      <Dock user={user} isAdmin={isAdmin} onLogin={() => setAuthOpen(true)} onLogout={logout} onAdmin={() => setAdminOpen(true)} onPlayer={openPlayer} />
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
    </>
  );
}
