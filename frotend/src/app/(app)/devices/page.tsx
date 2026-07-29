"use client";

import DevicesView from "@/components/player/DevicesView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function DevicesPage() {
  const p = usePlayer();
  return (
    <DevicesView
      prefs={p.prefs}
      onUpdatePrefs={p.updatePrefs}
      canVibrate={p.canVibrate}
      onBack={() => p.goTo("home")}
      deviceSync={p.deviceSync}
    />
  );
}
