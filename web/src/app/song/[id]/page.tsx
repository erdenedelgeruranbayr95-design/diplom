"use client";

/* Дуун дээрх QR-аар нээгддэг public хуудас — нэвтрэлт шаардахгүй (GET /songs/:id нь @Public()).
   mobile/[token]/page.tsx-ийн public-page хэв маягийг дагана (.mob-* legacy CSS-ийг Tailwind
   болгов), гэхдээ Socket.io/vibration-гүй, зөвхөн энгийн audio player. getSong() дуудлага
   огт өөрчлөгдөөгүй — зөвхөн визуал давхарга шинэчлэгдсэн. */
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSong } from "@/lib/api/client";
import type { Song } from "@/types/song";

type PageState = "loading" | "ready" | "error";

export default function SongPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [state, setState] = useState<PageState>("loading");
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    let alive = true;
    getSong(id)
      .then((s) => {
        if (!alive) return;
        setSong(s);
        setState("ready");
      })
      .catch(() => {
        if (alive) setState("error");
      });
    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <div className="min-h-[100svh] bg-bg text-ink flex items-center justify-center p-6">
      <div className="w-full max-w-[380px] flex flex-col items-center gap-[18px] text-center">
        <span className="mono">МЭДРЭХ®</span>

        {state === "loading" && (
          <div className="flex flex-col items-center gap-2.5 py-10">
            <span className="state-spinner" aria-hidden="true"></span>
            <p className="text-dim text-sm">Ачааллаж байна…</p>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center gap-2.5 py-10">
            <span className="text-[40px]" aria-hidden="true">
              ⚠️
            </span>
            <b className="text-ink font-display font-normal text-lg">Дуу олдсонгүй</b>
            <p className="text-dim text-sm">Линк буруу эсвэл дуу устсан байж болзошгүй.</p>
          </div>
        )}

        {state === "ready" && song && (
          <div className="flex flex-col gap-1 w-full">
            <b className="text-xl text-ink">{song.title}</b>
            {song.artist && <i className="not-italic text-dim">{song.artist}</i>}
            <audio controls autoPlay src={song.fileUrl} className="w-full mt-4" />
          </div>
        )}
      </div>
    </div>
  );
}
