"use client";

/* QR холболт + Socket.io session-ийг Player.tsx болон DevicesView.tsx хоёулаа ашиглах
   нэгдсэн hook — давхар socket холболт үүсэхээс сэргийлнэ. */
import { useCallback, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { connectDesktopSocket, type AckResponse, type BeatEvent, type TrackInfo } from "./client";
import { createQrSession } from "@/lib/api/client";

export type QrSyncState = "idle" | "loading" | "waiting" | "connected" | "error";

export function useDeviceSync(onPhoneConnected?: () => void) {
  const [qrState, setQrState] = useState<QrSyncState>("idle");
  const [qrToken, setQrToken] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const onPhoneConnectedRef = useRef(onPhoneConnected);
  onPhoneConnectedRef.current = onPhoneConnected;

  function ensureSocket(): Socket {
    if (!socketRef.current) {
      socketRef.current = connectDesktopSocket();
      socketRef.current.on("phone:connected", () => {
        setQrState("connected");
        /* Шинээр (эсвэл дахин) холбогдсон утас руу одоогийн тоглож буй дууны
           мэдээллийг шууд sync хийнэ — эс бол "desktop:track-changed" зөвхөн
           дуу солиход л явдаг тул дундуур нэгдсэн утас юу ч мэдэхгүй үлдэнэ. */
        onPhoneConnectedRef.current?.();
      });
      socketRef.current.on("phone:disconnected", () => setQrState("waiting"));
    }
    return socketRef.current;
  }

  const createSession = useCallback(async () => {
    setQrState("loading");
    try {
      const session = await createQrSession();
      const socket = ensureSocket();
      socket.emit("desktop:create-session", { token: session.token }, (ack: AckResponse) => {
        if (ack.ok) {
          setQrToken(session.token);
          setQrState("waiting");
        } else {
          setQrState("error");
        }
      });
    } catch {
      setQrState("error");
    }
  }, []);

  const emitBeat = useCallback((evt: BeatEvent) => {
    socketRef.current?.emit("desktop:beat", evt);
  }, []);

  const emitTrackChanged = useCallback((info: TrackInfo) => {
    socketRef.current?.emit("desktop:track-changed", info);
  }, []);

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setQrState("idle");
    setQrToken(null);
  }, []);

  return {
    qrState,
    qrToken,
    isConnected: qrState === "connected",
    createSession,
    emitBeat,
    emitTrackChanged,
    disconnect,
  };
}
