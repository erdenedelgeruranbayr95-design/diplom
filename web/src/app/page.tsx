"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/modals/AuthModal";
import { seedFeed } from "@/lib/data/library";
import AdminPanel from "@/components/modals/AdminPanel";
import Player from "@/components/player/Player";
import SubscribeModal from "@/components/modals/SubscribeModal";
import { useAuth } from "@/components/providers/AuthProvider";
import Preloader from "@/components/landing/Preloader";
import Hero from "@/components/landing/Hero";
import Dock from "@/components/landing/Dock";
import Marquee from "@/components/landing/Marquee";
import Feel from "@/components/landing/Feel";
import Gallery from "@/components/landing/Gallery";
import How from "@/components/landing/How";
import Cta from "@/components/landing/Cta";
import Footer from "@/components/landing/Footer";
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
      <div className="cr" id="cr"></div>
      <div className="cd" id="cd"></div>
      <div className="grid-bg"></div>
      <div className="glow g1"></div>
      <div className="glow g2"></div>

      <Hero />
      <Dock user={user} isAdmin={isAdmin} onLogin={() => setAuthOpen(true)} onLogout={logout} onAdmin={() => setAdminOpen(true)} onPlayer={openPlayer} />
      <Marquee />
      <Feel />
      <Gallery />
      <How />
      <Cta />
      <Footer />

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
