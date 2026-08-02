"use client";

import { useCallback, useRef, useState } from "react";

/* Микрофон (live) горим — гадаад дуу чимээ (жишээ хажуугийн speaker) авч, 8-бүсийн
   энергийг AudioWorklet-оор тооцоолж, DeviceRouter-т шууд дамжуулна. `useHapticEngine`-
   ийн songId-тэй playback-аас ТУСДАА зам — songId шаардахгүй, ямар ч дуу чимээнд
   ажиллана (жишээ: Мэдрэх апп нээгээгүй жинхэнэ хамтлагийн тоглолт дээр ашиглах).

   AudioWorklet файл: public/worklets/mic-band-processor.js (Goertzel-style, CPU хямд). */
export interface MicHapticMode {
  active: boolean;
  error: string | null;
  /** Хамгийн сүүлийн 8 бүсийн энерги (0..1) — амьд ref, UI-д шинэчлэгдэнэ. */
  bandLevelsRef: React.MutableRefObject<number[]>;
  /** Амжилттай эсэхийг шууд буцаана (React state race condition-оос сэргийлж). */
  start: () => Promise<boolean>;
  stop: () => void;
}

export function useMicHapticMode(onBands?: (bands: number[]) => void): MicHapticMode {
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bandLevelsRef = useRef<number[]>(new Array(8).fill(0));
  const ctxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nodeRef = useRef<AudioWorkletNode | null>(null);
  const onBandsRef = useRef(onBands);
  onBandsRef.current = onBands;

  const start = useCallback(async (): Promise<boolean> => {
    if (ctxRef.current) return true; // аль хэдийн идэвхтэй
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false } });
      streamRef.current = stream;

      const ctx = new AudioContext();
      ctxRef.current = ctx;
      await ctx.audioWorklet.addModule("/worklets/mic-band-processor.js");

      const source = ctx.createMediaStreamSource(stream);
      const node = new AudioWorkletNode(ctx, "mic-band-processor");
      nodeRef.current = node;
      node.port.onmessage = (evt: MessageEvent<{ bands: number[] }>) => {
        bandLevelsRef.current = evt.data.bands;
        onBandsRef.current?.(evt.data.bands);
      };
      source.connect(node);
      setActive(true);
      return true;
    } catch (err) {
      setError((err as Error).message || "Микрофонд хандах эрх өгөгдөөгүй байна");
      stop();
      return false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = useCallback(() => {
    nodeRef.current?.port.close();
    nodeRef.current?.disconnect();
    nodeRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    void ctxRef.current?.close().catch(() => {});
    ctxRef.current = null;
    bandLevelsRef.current = new Array(8).fill(0);
    setActive(false);
  }, []);

  return { active, error, bandLevelsRef, start, stop };
}
