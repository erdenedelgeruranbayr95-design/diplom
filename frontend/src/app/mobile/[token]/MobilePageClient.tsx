"use client";

/* Гар утасны хосолсон хуудас — Desktop QR-аар холбогдож, дуутай синхроноор чичирнэ.
   .mob-* legacy CSS-ийг Tailwind болгов — .mob-ripple keyframe (haptic pulse), checkbox
   toggle-ийн :checked/:focus-visible зан төлөв бүхэлдээ хэвээр (Tailwind-аар шинээр
   давхардуулав), socket/vibration логик (init/vibrateForBeat/testVibration) огт
   өөрчлөгдөөгүй — зөвхөн визуал давхарга шинэчлэгдсэн. .dv-dot classname нь CSS дүрэмгүй
   байсан (харагдахгүй цэг) тул бодит Tailwind дугуй болгож засав. */
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { connectPhoneSocket, type BeatEvent, type TrackInfo } from "@/lib/socket/client";
import { getQrSession } from "@/lib/api/client";
import { VIB_LEVELS } from "@/lib/player/constants";
import type { Socket } from "socket.io-client";
import Icon from "@/components/ui/Icon";
import { ActionButton } from "@/components/ui/ActionGroup";

type PageState = "loading" | "waiting" | "connected" | "expired" | "error";

export default function MobilePageClient() {
  const params = useParams<{ token: string }>();
  const token = params.token;

  const [state, setState] = useState<PageState>("loading");
  const [track, setTrack] = useState<TrackInfo | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [strength, setStrength] = useState(1); // VIB_LEVELS index
  const [pulse, setPulse] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const enabledRef = useRef(enabled);
  const strengthRef = useRef(strength);
  enabledRef.current = enabled;
  strengthRef.current = strength;

  useEffect(() => {
    let alive = true;

    async function init() {
      try {
        const session = await getQrSession(token);
        if (!alive) return;
        if (session.status === "EXPIRED") {
          setState("expired");
          return;
        }
      } catch {
        if (alive) setState("error");
        return;
      }

      const socket = connectPhoneSocket();
      socketRef.current = socket;

      socket.on("connect", () => {
        socket.emit("phone:join", { token }, (ack: { ok: boolean; error?: string }) => {
          if (!alive) return;
          if (ack.ok) setState("connected");
          else if (ack.error === "expired") setState("expired");
          else setState("error");
        });
      });

      socket.on("session:track", (info: TrackInfo) => {
        if (alive) setTrack(info);
      });

      socket.on("session:beat", (evt: BeatEvent) => {
        if (!alive || !enabledRef.current) return;
        vibrateForBeat(evt, strengthRef.current);
        setPulse(true);
        setTimeout(() => setPulse(false), 150);
      });

      socket.on("desktop:disconnected", () => {
        if (alive) setState("waiting");
      });
    }

    init();
    return () => {
      alive = false;
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  function vibrateForBeat(evt: BeatEvent, strengthIdx: number) {
    if (!("vibrate" in navigator)) return;
    const m = VIB_LEVELS[strengthIdx]?.mult ?? 1;
    try {
      /* 8-бүсийн Score байвал (evt.bands) хамгийн идэвхтэй бүсийн энергиэр
         амплитуд тохируулна — ганц моторт утас тул зэрэг олон бүс мэдрүүлэх
         боломжгүй ч дор хаяж СОГИЙН (loudest) бүсийн эрч хүчийг илэрхийлнэ. */
      if (evt.bands && evt.bands.length > 0) {
        const maxLevel = Math.max(...evt.bands);
        navigator.vibrate(Math.max(8, Math.round((30 + maxLevel * 150) * m)));
        return;
      }
      if (evt.band === "bass") {
        navigator.vibrate(Math.round((60 + evt.level * 80) * m));
      } else if (evt.band === "mid") {
        navigator.vibrate([Math.round(30 * m), 30, Math.round(30 * m)]);
      } else {
        navigator.vibrate(Math.max(8, Math.round(12 * m)));
      }
    } catch {
      /* noop */
    }
  }

  function testVibration() {
    if (!("vibrate" in navigator)) return;
    try {
      navigator.vibrate(200);
      setPulse(true);
      setTimeout(() => setPulse(false), 200);
    } catch {
      /* noop */
    }
  }

  const vibrateSupported = typeof navigator !== "undefined" && "vibrate" in navigator;

  return (
    <div className="min-h-[100svh] bg-bg text-ink flex items-center justify-center p-6">
      <div className="w-full max-w-[380px] flex flex-col items-center gap-[18px] text-center">
        <span className="mono">МЭДРЭХ® / Утас</span>

        {state === "loading" && (
          <div className="flex flex-col items-center gap-2.5 py-10">
            <span className="state-spinner" aria-hidden="true"></span>
            <p className="text-dim text-sm">Ачааллаж байна…</p>
          </div>
        )}

        {state === "expired" && (
          <div className="flex flex-col items-center gap-2.5 py-10">
            <span className="text-[40px]" aria-hidden="true">
              ⏱
            </span>
            <b className="text-ink font-display font-normal text-lg">QR код хугацаа дууссан</b>
            <p className="text-dim text-sm">Desktop дээрээ шинэ QR үүсгэнэ үү.</p>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center gap-2.5 py-10">
            <span className="w-16 h-16 rounded-full flex items-center justify-center text-[#FF8A8A] bg-[rgba(233,111,111,.12)] shadow-[inset_0_0_0_1px_rgba(233,111,111,.28)]" aria-hidden="true">
              <Icon name="alert" size={28} />
            </span>
            <b className="text-ink font-display font-normal text-lg">Холбогдож чадсангүй</b>
            <p className="text-dim text-sm">Линк буруу эсвэл сесс олдсонгүй.</p>
          </div>
        )}

        {(state === "waiting" || state === "connected") && (
          <>
            <div
              className={
                "relative w-[140px] h-[140px] rounded-full flex items-center justify-center bg-aqua/[.08] border border-white/[.1] transition-[transform,background] duration-150 " +
                (pulse ? "scale-[1.08] bg-aqua/[.22]" : "")
              }
            >
              <span
                className={
                  "absolute inset-0 rounded-full border-2 border-aqua pointer-events-none " +
                  (pulse ? "opacity-60 [animation:mob-ripple_.6s_cubic-bezier(.2,.8,.2,1)]" : "opacity-0")
                }
                aria-hidden="true"
              ></span>
              <span className="text-aqua" aria-hidden="true">
                <Icon name="vibrate" size={46} strokeWidth={1.4} />
              </span>
            </div>

            <div className={"inline-flex items-center gap-2 font-mono text-caption tracking-[.18em] uppercase " + (state === "connected" ? "text-aqua" : "text-dim")}>
              <i className={"w-2 h-2 rounded-full " + (state === "connected" ? "bg-aqua shadow-[0_0_8px_var(--aqua)]" : "bg-faint")} aria-hidden="true"></i>
              {state === "connected" ? "Холбогдсон" : "Холбогдож байна…"}
            </div>

            {track ? (
              <div className="flex flex-col gap-1">
                <b className="text-xl text-ink">{track.title}</b>
                {track.artist && <i className="not-italic text-dim">{track.artist}</i>}
              </div>
            ) : (
              <p className="text-dim text-body">Desktop дээр дуу тоглуулахад энд харагдана</p>
            )}

            <div className="w-full flex flex-col gap-3 items-center pt-3 border-t border-white/[.08]">
              <label className="flex items-center gap-2.5 text-sm min-h-11 cursor-pointer">
                <span className="relative flex-none">
                  <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="peer sr-only" />
                  <span
                    className="block w-[46px] h-7 rounded-full bg-white/[.14] border border-white/[.1] transition-colors duration-200 peer-checked:bg-aqua peer-checked:border-aqua peer-focus-visible:outline-none peer-focus-visible:shadow-glow-aqua"
                    aria-hidden="true"
                  ></span>
                  <span
                    className="absolute top-0.5 left-0.5 w-[22px] h-[22px] rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-[18px]"
                    aria-hidden="true"
                  ></span>
                </span>
                <span>Чичиргээ {enabled ? "асаалттай" : "унтраалттай"}</span>
              </label>

              <span className="mono">Хүч</span>
              <div className="grid grid-cols-3 gap-px bg-white/10 rounded-chip overflow-hidden w-full" role="group" aria-label="Чичиргээний хүч">
                {VIB_LEVELS.map((v, i) => (
                  <button
                    key={v.label}
                    className={
                      "py-2.5 px-1.5 min-h-11 text-note font-medium bg-surface-2 transition-colors duration-150 focus-visible:outline-none focus-visible:relative focus-visible:z-[1] focus-visible:shadow-glow-aqua " +
                      (strength === i ? "bg-aqua text-on-aqua font-semibold" : "text-dim")
                    }
                    onClick={() => setStrength(i)}
                    aria-pressed={strength === i}
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              <ActionButton
                variant="primary"
                size="lg"
                className="w-full"
                onClick={testVibration}
                disabled={!vibrateSupported}
              >
                {vibrateSupported && <Icon name="vibrate" size={15} />}
                {vibrateSupported ? "Турших" : "Энэ төхөөрөмж дэмжихгүй"}
              </ActionButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
