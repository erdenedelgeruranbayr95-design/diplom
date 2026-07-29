"use client";

/* Дууны анализын дэлгэрэнгүй — client-side (browser) тооцоолсон, backend-д хадгалагдсан
   үр дүнг харуулна (BPM, waveform, давтамжийн энерги гэх мэт). Премиум analytics dashboard
   маягаар (Apple Health, GitHub Insights-ийн metric card pattern) шинэчлэв: dt- эхэлсэн
   legacy CSS классуудыг (dt-title, dt-band гэх мэт) Tailwind руу хөрвүүлсэн. getSong()
   дуудлага, бүх metric утга/тооцоолол (rms, bassEnergy, midEnergy, trebleEnergy,
   waveformPeaks гэх мэт) бүхэлдээ хэвээр — зөвхөн визуал давхарга шинэчлэгдсэн. */
import { useEffect, useState } from "react";
import BackBar from "./BackBar";
import StatCard from "./StatCard";
import { Loading, ErrorState } from "@/components/ui/States";
import { SectionTitle } from "@/components/ui/PageHeader";
import { ICONS } from "@/lib/player/constants";
import { getSong } from "@/lib/api/client";
import type { Song } from "@/types/song";

const BANDS: { key: keyof Pick<Song, "rms" | "bassEnergy" | "midEnergy" | "trebleEnergy">; label: string }[] = [
  { key: "rms", label: "Loudness (RMS)" },
  { key: "bassEnergy", label: "Бас" },
  { key: "midEnergy", label: "Дунд" },
  { key: "trebleEnergy", label: "Өндөр" },
];

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
          <div className="flex flex-col gap-2 mb-7">
            <span className="w-fit text-[13px] font-semibold rounded-full py-2 px-4 bg-aqua text-[#04100E]">{song.genre || "Тодорхойгүй"}</span>
            <h2 className="font-display font-extrabold text-[clamp(26px,3.4vw,40px)] tracking-[-.04em] mt-1">{song.title}</h2>
            <p className="text-dim text-[14.5px]">Дуучин: {song.artist || "Тодорхойгүй"}</p>
          </div>

          {analyzing && (
            <p className="flex items-center gap-2 text-faint text-[12.5px] leading-[1.5] mb-5" role="status">
              <span aria-hidden="true">⏳</span> Анализ хийгдэж байна, түр хүлээнэ үү…
            </p>
          )}

          {!song.analyzedAt && !analyzing ? (
            <p className="text-faint text-[13.5px] text-center py-6 px-4">Энэ дуу хараахан анализ хийгдээгүй байна</p>
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
                <StatCard icon={ICONS.music} color="c-aqua" value={song.analyzedBpm ?? song.bpm ?? "—"} label="BPM" />
                <StatCard icon={ICONS.vibrate} color="c-gold" value={song.beatCount ?? "—"} label="Цохилтын тоо" />
                <StatCard icon={ICONS.phones} color="c-purple" value={durationLabel} label="Үргэлжлэх хугацаа" />
                <StatCard icon={ICONS.star} color="c-rose" value={song.peak !== null && song.peak !== undefined ? song.peak.toFixed(2) : "—"} label="Peak" />
              </div>

              <div className="mt-8">
                <SectionTitle title="Дууны түвшин" />
              </div>
              <div className="flex flex-col gap-4 rounded-2xl p-5 bg-white/[.035]">
                {BANDS.map(({ key, label }) => {
                  const raw = song[key];
                  const pct = raw !== null && raw !== undefined ? Math.round(raw * 100) : 0;
                  return (
                    <div key={key}>
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <b className="text-[13.5px] font-semibold min-w-[100px]">{label}</b>
                        <span className="font-mono text-[11px] text-aqua ml-auto">{pct}%</span>
                      </div>
                      <div className="h-[7px] rounded-full bg-white/[.09] overflow-hidden">
                        <div
                          className="h-full rounded-full [background:linear-gradient(90deg,rgba(56,232,206,.5),var(--aqua))] transition-[width] duration-[600ms] ease-[cubic-bezier(.16,.8,.24,1)]"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {song.waveformPeaks && song.waveformPeaks.length > 0 && (
                <>
                  <div className="mt-8">
                    <SectionTitle title="Долгион (waveform)" />
                  </div>
                  <div
                    className="grid grid-cols-7 gap-2.5 h-[180px] items-end border border-white/[.08] rounded-2xl p-[18px_18px_12px] bg-white/[.02]"
                    aria-label="Долгионы дүрслэл"
                  >
                    {song.waveformPeaks.map((p, i) => (
                      <div className="flex flex-col items-center gap-[7px] h-full justify-end" key={i}>
                        <i
                          className="w-full max-w-[44px] bg-[linear-gradient(180deg,rgba(56,232,206,.75),rgba(56,232,206,.2))] rounded-[6px_6px_2px_2px] transition-[height] duration-[600ms] ease-[cubic-bezier(.16,.8,.24,1)]"
                          style={{ height: `${Math.max(3, (p / maxPeak) * 100)}%` }}
                        ></i>
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
