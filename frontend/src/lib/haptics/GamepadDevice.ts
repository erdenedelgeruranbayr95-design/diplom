"use client";

import type { HapticDevice } from "./HapticDevice";

/* Gamepad Vibration API (`GamepadHapticActuator.playEffect('dual-rumble')`) ороосон
   HapticDevice хэрэгжилт. Хоёр моторт (strong/weak) тул `supportsMultiZone: false` —
   8-бүсийн Score-ийн хамгийн идэвхтэй бүсийг сонгож нэг rumble импульс болгоно.

   Roadmap-ийн "бас→strong · өндөр→weak" зааврыг `setBand`-д тусгав: доод давтамжийн
   бүсүүд (zone индекс бага) strongMagnitude руу, дээд давтамж (zone индекс өндөр)
   weakMagnitude руу илүү их жинтэйгээр орно. */
export class GamepadDevice implements HapticDevice {
  readonly id = "gamepad";
  readonly label = "Gamepad";
  readonly supportsMultiZone = false;

  private index: number | null = null;

  async connect(): Promise<boolean> {
    const gp = this.findGamepad();
    if (!gp) return false;
    this.index = gp.index;
    return true;
  }

  disconnect(): void {
    this.index = null;
  }

  isConnected(): boolean {
    return this.findGamepad() !== null;
  }

  private findGamepad(): Gamepad | null {
    if (typeof navigator === "undefined" || !navigator.getGamepads) return null;
    return [...navigator.getGamepads()].find((g): g is Gamepad => !!g) || null;
  }

  private actuator(): (Gamepad & { vibrationActuator?: { playEffect: (type: string, params: Record<string, number>) => Promise<unknown> } }) | null {
    const gp = this.index !== null ? navigator.getGamepads?.()[this.index] : this.findGamepad();
    return (gp as ReturnType<GamepadDevice["actuator"]>) || null;
  }

  pulse(strength: number, durationMs = 200): void {
    const gp = this.actuator();
    const act = gp?.vibrationActuator;
    if (!act?.playEffect) return;
    act
      .playEffect("dual-rumble", {
        duration: durationMs,
        strongMagnitude: Math.min(1, strength),
        weakMagnitude: Math.min(1, strength * 0.55),
      })
      .catch(() => {});
  }

  /** Бас (zone бага) → strong мотор давамгайлна, өндөр (zone өндөр) → weak мотор
   *  давамгайлна — roadmap-ийн "бас→strong, өндөр→weak" заавар. */
  setBand(zone: number, level: number): void {
    if (level < 0.08) return;
    const gp = this.actuator();
    const act = gp?.vibrationActuator;
    if (!act?.playEffect) return;
    const t = zone / 7; // 0 (бас) .. 1 (өндөр)
    act
      .playEffect("dual-rumble", {
        duration: 90,
        strongMagnitude: Math.min(1, level * (1 - t)),
        weakMagnitude: Math.min(1, level * t),
      })
      .catch(() => {});
  }

  stop(): void {
    const gp = this.actuator();
    gp?.vibrationActuator?.playEffect("dual-rumble", { duration: 0, strongMagnitude: 0, weakMagnitude: 0 }).catch(() => {});
  }
}
