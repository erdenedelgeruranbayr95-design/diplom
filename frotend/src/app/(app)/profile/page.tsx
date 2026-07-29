"use client";

import ProfileView from "@/components/player/ProfileView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function ProfilePage() {
  const p = usePlayer();
  return <ProfileView onBack={() => p.goTo("home")} prefs={p.prefs} onUpdatePrefs={p.updatePrefs} />;
}
