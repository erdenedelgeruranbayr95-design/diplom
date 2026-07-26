"use client";

/* Дуун дээрх QR-аар нээгддэг public хуудас — нэвтрэлт шаардахгүй (GET /songs/:id нь @Public()).
   mobile/[token]/page.tsx-ийн public-page хэв маягийг дагана, гэхдээ Socket.io/vibration-гүй,
   зөвхөн энгийн audio player. */
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
    <div className="mob-wrap">
      <div className="mob-inner">
        <span className="mono">МЭДРЭХ®</span>

        {state === "loading" && (
          <div className="mob-state">
            <span className="state-spinner" aria-hidden="true"></span>
            <p>Ачааллаж байна…</p>
          </div>
        )}

        {state === "error" && (
          <div className="mob-state">
            <span className="mob-ic" aria-hidden="true">
              ⚠️
            </span>
            <b>Дуу олдсонгүй</b>
            <p>Линк буруу эсвэл дуу устсан байж болзошгүй.</p>
          </div>
        )}

        {state === "ready" && song && (
          <div className="mob-track">
            <b>{song.title}</b>
            {song.artist && <i>{song.artist}</i>}
            <audio controls autoPlay src={song.fileUrl} style={{ width: "100%", marginTop: 16 }} />
          </div>
        )}
      </div>
    </div>
  );
}
