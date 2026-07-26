"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { connectPhoneSocket, type BeatEvent, type TrackInfo } from "@/lib/socket/client";
import { getQrSession } from "@/lib/api/client";
import { VIB_LEVELS } from "@/lib/player/constants";
import type { Socket } from "socket.io-client";

type PageState = "loading" | "waiting" | "connected" | "expired" | "error";

export default function MobilePage() {
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
    <div className="mob-wrap">
      <div className="mob-inner">
        <span className="mono">МЭДРЭХ® / Утас</span>

        {state === "loading" && (
          <div className="mob-state">
            <span className="state-spinner" aria-hidden="true"></span>
            <p>Ачааллаж байна…</p>
          </div>
        )}

        {state === "expired" && (
          <div className="mob-state">
            <span className="mob-ic" aria-hidden="true">
              ⏱
            </span>
            <b>QR код хугацаа дууссан</b>
            <p>Desktop дээрээ шинэ QR үүсгэнэ үү.</p>
          </div>
        )}

        {state === "error" && (
          <div className="mob-state">
            <span className="mob-ic" aria-hidden="true">
              ⚠️
            </span>
            <b>Холбогдож чадсангүй</b>
            <p>Линк буруу эсвэл сесс олдсонгүй.</p>
          </div>
        )}

        {(state === "waiting" || state === "connected") && (
          <>
            <div className={"mob-pulse-wrap" + (pulse ? " on" : "")}>
              <span className="mob-pulse" aria-hidden="true"></span>
              <span className="mob-pulse-ic" aria-hidden="true">
                📳
              </span>
            </div>

            <div className={"mob-status" + (state === "connected" ? " on" : "")}>
              <i className="dv-dot" aria-hidden="true"></i>
              {state === "connected" ? "Холбогдсон" : "Холбогдож байна…"}
            </div>

            {track ? (
              <div className="mob-track">
                <b>{track.title}</b>
                {track.artist && <i>{track.artist}</i>}
              </div>
            ) : (
              <p className="mob-hint">Desktop дээр дуу тоглуулахад энд харагдана</p>
            )}

            <div className="mob-settings">
              <label className="mob-toggle">
                <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
                <span>Чичиргээ {enabled ? "асаалттай" : "унтраалттай"}</span>
              </label>

              <span className="mono">Хүч</span>
              <div className="sp-seg">
                {VIB_LEVELS.map((v, i) => (
                  <button key={v.label} className={strength === i ? "on" : ""} onClick={() => setStrength(i)}>
                    {v.label}
                  </button>
                ))}
              </div>

              <button className="bt bt-a" onClick={testVibration} disabled={!vibrateSupported}>
                {vibrateSupported ? "📳 Турших" : "Энэ төхөөрөмж дэмжихгүй"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
