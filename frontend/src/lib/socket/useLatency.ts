"use client";

/* WebSocket round-trip latency-г Engine.IO протоколын native ping/pong давхаргаас
   хэмждэг hook — backend-д ямар ч шинэ event нэмэхгүй (session.gateway.ts бүхэлдээ
   хэвээр). engine.io-client нь холболт бүрт сервертэй тогтмол ping/pong солилцдог
   (protocol-level heartbeat), "ping" илгээх мөчийг тэмдэглээд, "pong" ирэхэд зөрүүг
   тооцно — энэ бол socket.io-ийн суурь механизм, бидний нэмсэн зүйл биш. */
import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";

export type LatencyQuality = "excellent" | "good" | "poor" | null;

export function latencyQuality(ms: number | null): LatencyQuality {
  if (ms == null) return null;
  if (ms < 60) return "excellent";
  if (ms < 200) return "good";
  return "poor";
}

export function useLatency(socket: Socket | null): number | null {
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const pingAtRef = useRef<number>(0);

  useEffect(() => {
    if (!socket) {
      setLatencyMs(null);
      return;
    }
    const engine = (socket.io as unknown as { engine?: NodeJS.EventEmitter }).engine;
    if (!engine) return;

    const onPacket = (packet: { type: string }) => {
      if (packet.type === "ping") pingAtRef.current = performance.now();
      else if (packet.type === "pong" && pingAtRef.current) {
        setLatencyMs(Math.round(performance.now() - pingAtRef.current));
      }
    };
    engine.on("packet", onPacket);
    return () => {
      engine.off("packet", onPacket);
    };
  }, [socket]);

  return latencyMs;
}
