"use client";

/* Socket.io холбогч — desktop нь JWT-ээр (одоогийн api/client.ts-ийн in-memory access token
   дахин ашиглана), phone нь auth-гүй (QR REST endpoint-той ижил @Public() зарчим). */
import { io, type Socket } from "socket.io-client";
import { getAccessToken } from "@/lib/api/client";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000";

/* Үе шат 4: 8-бүсийн Haptic Score байгаа үед `bands` (8 элементтэй массив, 0..1)
   дамжуулна. `band`/`level` (хуучин 3-бүсийн fallback) ХЭВЭЭР байна. */
export interface BeatEvent {
  band: "bass" | "mid" | "high";
  level: number;
  bands?: number[];
}
export interface TrackInfo {
  title: string;
  artist?: string;
}
export interface AckResponse {
  ok: boolean;
  error?: string;
  status?: string;
}

export function connectDesktopSocket(): Socket {
  return io(WS_URL, { auth: { token: getAccessToken() }, autoConnect: true });
}

export function connectPhoneSocket(): Socket {
  return io(WS_URL, { autoConnect: true });
}
