"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/modals/AuthModal";
import { seedFeed } from "@/lib/data/library";
import AdminPanel from "@/components/modals/AdminPanel";
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

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    seedFeed();
    let cleanup: (() => void) | undefined;
    import("@/lib/effects/landing-engine").then(({ initMedreh }) => {
      cleanup = initMedreh();
    });
    return () => cleanup?.();
  }, []);

  /* auth төлөв AuthContext-оос (session нэг эх сурвалж, backend JWT дээр суурилна).
     Захиалга/дүрийн бусад төлөв нь (app) route group-ийн layout дээр хэрэглэгдэнэ. */
  const { user, isAdmin, logout: authLogout } = useAuth();

  const [authOpen, setAuthOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  /* Апп нь одоо тусдаа route бүлэг — landing дээрээс /home руу шилжинэ.
     (Өмнө нь Player нь энэ хуудсан дээрх fixed overlay байсан.) */
  const handleAuth = () => router.push("/home");
  const logout = () => {
    authLogout();
    setAdminOpen(false);
  };
  const openPlayer = () => {
    if (user) router.push("/home");
    else setAuthOpen(true);
  };

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
    </>
  );
}
