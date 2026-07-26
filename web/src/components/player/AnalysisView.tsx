"use client";

import { useEffect, useState } from "react";
import BackBar from "./BackBar";
import StatCard from "./StatCard";
import { Loading, ErrorState } from "@/components/ui/States";
import { ICONS } from "@/lib/player/constants";
import { getSong } from "@/lib/api/client";
import type { Song } from "@/types/song";

/* Дууны анализын дэлгэрэнгүй — client-side (browser) тооцоолсон, backend-д хадгалагдсан
   үр дүнг харуулна (BPM, waveform, давтамжийн энерги гэх мэт). */
export default function AnalysisView({
  songId,
  analyzing,
  onBack,
}: {
  songId: string | null;
  analyzing?: boolean;
  onBack: () => void;
}) {
  const [song, setSong] = useState<Song | null>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!songId) return;
    setLoading(true);
    setErr("");
    getSong(songId)
      .then(setSong)
      .catch((e) => setErr(e.message || "Анализ ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }, [songId]);

  if (!songId) return null;

  const durationLabel = song?.duration ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, "0")}` : "—";
  const maxPeak = song?.waveformPeaks?.length ? Math.max(...song.waveformPeaks, 0.01) : 1;

  return (
    <>
      <BackBar title="Дууны анализ" onBack={onBack} />

      {loading && <Loading label="Анализ ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Анализ ачаалагдсангүй" hint={err} onRetry={() => setErr("")} />}

      {!loading && !err && song && (
        <>
          <div className="dt-right" style={{ marginBottom: 24 }}>
            <span className="sp-chip on dt-genre">{song.genre || "Тодорхойгүй"}</span>
            <h2 className="dt-title">{song.title}</h2>
            <p className="dt-artist">Дуучин: {song.artist || "Тодорхойгүй"}</p>
          </div>

          {analyzing && (
            <p className="sp-side-empty" style={{ marginBottom: 16 }}>
              ⏳ Анализ хийгдэж байна, түр хүлээнэ үү…
            </p>
          )}

          {!song.analyzedAt && !analyzing ? (
            <p className="adm-empty">Энэ дуу хараахан анализ хийгдээгүй байна</p>
          ) : (
            <>
              <div className="st-cards">
                <StatCard icon={ICONS.music} color="c-aqua" value={song.analyzedBpm ?? song.bpm ?? "—"} label="BPM" />
                <StatCard icon={ICONS.vibrate} color="c-gold" value={song.beatCount ?? "—"} label="Цохилтын тоо" />
                <StatCard icon={ICONS.phones} color="c-purple" value={durationLabel} label="Үргэлжлэх хугацаа" />
                <StatCard icon={ICONS.star} color="c-rose" value={song.peak !== null && song.peak !== undefined ? song.peak.toFixed(2) : "—"} label="Peak" />
              </div>

              <h3 className="st-h">Дууны түвшин</h3>
              <div className="dt-bands">
                <div className="dt-band">
                  <div className="dt-band-top">
                    <b>Loudness (RMS)</b>
                    <span className="dt-pct">{song.rms !== null && song.rms !== undefined ? Math.round(song.rms * 100) : 0}%</span>
                  </div>
                  <div className="dt-meter">
                    <i style={{ width: `${song.rms !== null && song.rms !== undefined ? song.rms * 100 : 0}%` }}></i>
                  </div>
                </div>
                <div className="dt-band">
                  <div className="dt-band-top">
                    <b>Бас</b>
                    <span className="dt-pct">{song.bassEnergy !== null && song.bassEnergy !== undefined ? Math.round(song.bassEnergy * 100) : 0}%</span>
                  </div>
                  <div className="dt-meter">
                    <i style={{ width: `${song.bassEnergy !== null && song.bassEnergy !== undefined ? song.bassEnergy * 100 : 0}%` }}></i>
                  </div>
                </div>
                <div className="dt-band">
                  <div className="dt-band-top">
                    <b>Дунд</b>
                    <span className="dt-pct">{song.midEnergy !== null && song.midEnergy !== undefined ? Math.round(song.midEnergy * 100) : 0}%</span>
                  </div>
                  <div className="dt-meter">
                    <i style={{ width: `${song.midEnergy !== null && song.midEnergy !== undefined ? song.midEnergy * 100 : 0}%` }}></i>
                  </div>
                </div>
                <div className="dt-band">
                  <div className="dt-band-top">
                    <b>Өндөр</b>
                    <span className="dt-pct">{song.trebleEnergy !== null && song.trebleEnergy !== undefined ? Math.round(song.trebleEnergy * 100) : 0}%</span>
                  </div>
                  <div className="dt-meter">
                    <i style={{ width: `${song.trebleEnergy !== null && song.trebleEnergy !== undefined ? song.trebleEnergy * 100 : 0}%` }}></i>
                  </div>
                </div>
              </div>

              {song.waveformPeaks && song.waveformPeaks.length > 0 && (
                <>
                  <h3 className="st-h">Долгион (waveform)</h3>
                  <div className="st-chart" aria-label="Долгионы дүрслэл">
                    {song.waveformPeaks.map((p, i) => (
                      <div className="st-col" key={i}>
                        <i style={{ height: `${Math.max(3, (p / maxPeak) * 100)}%` }}></i>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
