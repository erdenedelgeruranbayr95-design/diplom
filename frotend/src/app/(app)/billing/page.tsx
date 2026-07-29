"use client";

import BillingView from "@/components/player/BillingView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function BillingPage() {
  const p = usePlayer();
  const renewDate = p.user?.sub?.renews ? new Date(p.user.sub.renews).toLocaleDateString("mn-MN") : "";
  return (
    <BillingView
      email={p.email}
      user={p.user}
      isAdmin={p.isAdmin}
      renewDate={renewDate}
      onSubscribe={p.onSubscribe}
      onCancelSub={p.onCancelSub}
      onBack={() => p.goTo("home")}
    />
  );
}
