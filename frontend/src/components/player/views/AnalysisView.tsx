"use client";

/* Дууны анализын дэлгэрэнгүй — client-side (browser) тооцоолсон, backend-д хадгалагдсан
   үр дүнг харуулна (BPM, waveform, давтамжийн энерги гэх мэт). Премиум analytics dashboard
   маягаар (Apple Health, GitHub Insights-ийн metric card pattern) шинэчлэв: dt- эхэлсэн
   legacy CSS классуудыг (dt-title, dt-band гэх мэт) Tailwind руу хөрвүүлсэн. getSong()
   дуудлага, бүх metric утга/тооцоолол (rms, waveformPeaks гэх мэт) бүхэлдээ хэвээр.
   Бүсийн харагдац: `song.bandEnergies` (8 бүс, worker Haptic Score-той зах тохирсон)
   байвал үүнийг харуулна, хуучин (bandEnergies-гүй) дуунд 3-бүсийн bassEnergy/
   midEnergy/trebleEnergy-руу буцаж ордог (backwards-compat, см. analyze.ts). */
import BackBar from "../BackBar";
import StatCard from "../StatCard";
import { Loading, ErrorState } from "@/components/ui/States";
import { SectionTitle } from "@/components/ui/PageHeader";
import { ICONS } from "@/lib/player/constants";
import { getSong } from "@/lib/api/client";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import type { Song } from "@/types/song";

const BAND_LABELS_8 = ["Дэд-бас", "Бас", "Доод дунд", "Дунд", "Дээд дунд", "Тод", "Гялгар", "Агаар"];

export default function AnalysisView({
  songId,
  analyzing,
  onBack,
}: {
  songId: string | null;
  analyzing?: boolean;
  onBack: () => void;
}) {
  const {
    data: song,
    loading,
    error,
    setError,
  } = useAsyncResource<Song | null>(() => getSong(songId!), [songId], {
    initialData: null,
    enabled: !!songId,
    errorMessage: "Анализ ачаалахад алдаа гарлаа",
  });

  if (!songId) return null;

  const durationLabel = song?.duration ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, "0")}` : "—";
  const maxPeak = song?.waveformPeaks?.length ? Math.max(...song.waveformPeaks, 0.01) : 1;

  return (
    <>
      <BackBar title="Дууны анализ" onBack={onBack} />

      {loading && <Loading label="Анализ ачааллаж байна…" />}
      {!loading && error && <ErrorState title="Анализ ачаалагдсангүй" hint={error} onRetry={() => setError("")} />}

      {!loading && !error && song && (
        <>
          <div className="flex flex-col gap-2 mb-7">
            <span className="w-fit text-body font-semibold rounded-full py-2 px-4 bg-aqua text-on-aqua">{song.genre || "Тодорхойгүй"}</span>
            <h2 className="font-display font-extrabold text-[clamp(26px,3.4vw,40px)] tracking-[-.04em] mt-1">{song.title}</h2>
            <p className="text-dim text-copy">Дуучин: {song.artist || "Тодорхойгүй"}</p>
          </div>

          {analyzing && (
            <p className="flex items-center gap-2 text-faint text-note leading-[1.5] mb-5" role="status">
              <span aria-hidden="true">⏳</span> Анализ хийгдэж байна, түр хүлээнэ үү…
            </p>
          )}

          {!song.analyzedAt && !analyzing ? (
            <p className="text-faint text-body text-center py-6 px-4">Энэ дуу хараахан анализ хийгдээгүй байна</p>
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
                <StatCard icon={ICONS.activity} color="c-aqua" value={song.analyzedBpm ?? song.bpm ?? "—"} label="BPM" />
                <StatCard icon={ICONS.vibrate} color="c-gold" value={song.beatCount ?? "—"} label="Цохилтын тоо" />
                <StatCard icon={ICONS.clock} color="c-purple" value={durationLabel} label="Үргэлжлэх хугацаа" />
                <StatCard icon={ICONS.waveform} color="c-rose" value={song.peak !== null && song.peak !== undefined ? song.peak.toFixed(2) : "—"} label="Дээд түвшин" />
              </div>

              <div className="mt-8">
                <SectionTitle
                  title="Дууны түвшин"
                  description={
                    song.bandEnergies && song.bandEnergies.length > 0
                      ? "8 логарифм бүс (worker Haptic Score-той зах тохирсон)"
                      : undefined
                  }
                />
              </div>
              <div className="flex flex-col gap-4 border border-white/[.08] rounded-2xl p-5 bg-white/[.02]">
                {[
                  { key: "rms" as const, label: "Loudness (RMS)", value: song.rms },
                  ...(song.bandEnergies && song.bandEnergies.length > 0
                    ? song.bandEnergies.map((value, i) => ({ key: `band-${i}`, label: BAND_LABELS_8[i] ?? `Бүс ${i + 1}`, value }))
                    : [
                        { key: "bassEnergy" as const, label: "Бас", value: song.bassEnergy },
                        { key: "midEnergy" as const, label: "Дунд", value: song.midEnergy },
                        { key: "trebleEnergy" as const, label: "Өндөр", value: song.trebleEnergy },
                      ]),
                ].map(({ key, label, value }) => {
                  const pct = value !== null && value !== undefined ? Math.round(value * 100) : 0;
                  return (
                    <div key={key}>
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <b className="text-body font-semibold min-w-[100px]">{label}</b>
                        <span className="font-mono text-caption text-aqua ml-auto">{pct}%</span>
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
