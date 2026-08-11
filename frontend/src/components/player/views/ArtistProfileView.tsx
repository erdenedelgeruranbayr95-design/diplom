"use client";

/* Уран бүтээлчийн профайл — хэрэглэгч өөрөө үүсгэж, засна.

   Профайлтай болмогц нэмсэн дуу нь АВТОМАТААР энэ нэрд холбогдоно (backend-ийн
   `SongsController.create` дуудагчийн профайлыг хайдаг). Өөрийгөө өөр дуучин
   гэж бичих боломжгүй.

   ⚠️ Тусдаа `ARTIST` дүр нэмээгүй: дүр бол ЭРХ, уран бүтээлч бол ХЭН БОЛОХ.
   Мөн `Role` enum өөрчлөх нь гар утасны аппын дүрийн хүснэгтийг хөндөх байсан.

   Дуу нь ноорог хэвээр үүсч, куратор/админ нийтэлнэ — энэ дэлгэц түүнийг
   ил харуулна, эс бөгөөс уран бүтээлч «дуу минь алга болов» гэж бодно. */
import { useCallback, useEffect, useState } from "react";
import BackBar from "../BackBar";
import Icon from "@/components/ui/Icon";
import { ActionButton } from "@/components/ui/ActionGroup";
import { Empty, ErrorState } from "@/components/ui/States";
import StatusBadge from "@/components/ui/StatusBadge";
import { FIELD_CAPTION_CLS, FIELD_INPUT_CLS, FIELD_LABEL_CLS } from "@/components/ui/form-styles";
import { fetchMyArtist, fetchMyArtistSongs, saveMyArtist } from "@/lib/api/client";
import { useToast } from "@/components/providers/ToastProvider";
import type { Artist, Song } from "@/types/song";

export default function ArtistProfileView({ onBack }: { onBack: () => void }) {
  const toast = useToast();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchMyArtist(), fetchMyArtistSongs().catch(() => [])])
      .then(([a, s]) => {
        setArtist(a);
        setSongs(s);
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = ((f.get("name") as string) || "").trim();
    if (name.length < 2) {
      toast.error("Уран бүтээлчийн нэрээ оруулна уу");
      return;
    }
    setBusy(true);
    try {
      const saved = await saveMyArtist({
        name,
        bio: ((f.get("bio") as string) || "").trim() || undefined,
        careerInfo: ((f.get("careerInfo") as string) || "").trim() || undefined,
        photoUrl: ((f.get("photoUrl") as string) || "").trim() || undefined,
      });
      setArtist(saved);
      toast.success(artist ? "Профайл шинэчлэгдлээ" : `«${saved.name}» профайл үүслээ`);
    } catch (err) {
      /* Нэр давхцвал backend 409 буцаана — мессежийг нь шууд харуулна, учир нь
         тэр нь аль нэр авагдсаныг тодорхой хэлдэг. */
      toast.error(err instanceof Error ? err.message : "Хадгалахад алдаа гарлаа");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <BackBar title={artist ? artist.name : "Уран бүтээлч болох"} onBack={onBack} />

      {loading ? (
        <p className="text-dim text-body py-8">Ачаалж байна…</p>
      ) : error ? (
        <ErrorState title="Ачаалахад алдаа гарлаа" hint={error} onRetry={load} />
      ) : (
        <>
          {!artist && (
            <div className="rounded-panel border border-aqua/25 bg-aqua/[.06] p-5 mb-6">
              <b className="font-display text-note block mb-1.5">Уран бүтээлчийн профайл үүсгэх</b>
              <p className="text-dim text-body leading-6">
                Профайл үүсгэсний дараа нэмсэн дуу тань энэ нэрэн дор бүртгэгдэнэ. Дуу нь эхлээд
                хүлээгдэж, админ шалгаад сайт дээр нийтэлнэ.
              </p>
            </div>
          )}

          <form className="flex flex-col gap-4 mb-9" onSubmit={save}>
            <div>
              <label className={FIELD_LABEL_CLS} htmlFor="ap-name">
                Уран бүтээлчийн нэр
              </label>
              <input
                id="ap-name"
                name="name"
                className={FIELD_INPUT_CLS}
                defaultValue={artist?.name ?? ""}
                placeholder="Жишээ: Болд"
                maxLength={60}
                required
              />
              <p className={FIELD_CAPTION_CLS}>
                Энэ нэр давтагдашгүй байх ёстой. Дуунууд тань энэ нэрээр харагдана.
              </p>
            </div>

            <div>
              <label className={FIELD_LABEL_CLS} htmlFor="ap-bio">
                Товч танилцуулга
              </label>
              <textarea
                id="ap-bio"
                name="bio"
                className={FIELD_INPUT_CLS + " min-h-[92px] resize-y"}
                defaultValue={artist?.bio ?? ""}
                placeholder="Хэдэн өгүүлбэрээр өөрийгөө танилцуулна уу"
                maxLength={1000}
              />
            </div>

            <div>
              <label className={FIELD_LABEL_CLS} htmlFor="ap-career">
                Уран бүтээлийн замнал
              </label>
              <textarea
                id="ap-career"
                name="careerInfo"
                className={FIELD_INPUT_CLS + " min-h-[92px] resize-y"}
                defaultValue={artist?.careerInfo ?? ""}
                placeholder="Цомог, тоглолт, хамтрал…"
                maxLength={1000}
              />
            </div>

            <div>
              <label className={FIELD_LABEL_CLS} htmlFor="ap-photo">
                Зургийн холбоос
              </label>
              <input
                id="ap-photo"
                name="photoUrl"
                type="url"
                className={FIELD_INPUT_CLS}
                defaultValue={artist?.photoUrl ?? ""}
                placeholder="https://…"
                maxLength={500}
              />
            </div>

            <ActionButton variant="primary" type="submit" disabled={busy} className="self-start">
              {busy ? "Хадгалж байна…" : artist ? "Хадгалах" : "Профайл үүсгэх"}
            </ActionButton>
          </form>

          {artist && (
            <>
              <b className="font-display text-heading block mb-3">Миний дуунууд</b>
              {songs.length === 0 ? (
                <Empty
                  icon="music"
                  title="Дуу нэмээгүй байна"
                  hint="«Дуу нэмэх» цэсээр анхны дуугаа оруулаарай"
                />
              ) : (
                <ul className="flex flex-col gap-2">
                  {songs.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between gap-3 border border-white/[.08] rounded-xl px-4 py-3 bg-white/[.03]"
                    >
                      <span className="min-w-0">
                        <b className="block text-copy truncate">{s.title}</b>
                        <i className="not-italic text-dim text-note">{s.genre}</i>
                      </span>
                      {/* Ноорог гэдэг нь «алдаа» биш — админы шалгалт хүлээж буй
                          гэдгийг ойлгомжтой хэлнэ. */}
                      <StatusBadge
                        label={s.published ? "Нийтлэгдсэн" : "Хүлээгдэж байна"}
                        tone={s.published ? "aqua" : "warm"}
                        dot
                      />
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-faint text-note mt-4 flex items-start gap-2">
                <span className="mt-0.5 flex-none">
                  <Icon name="info" size={13} />
                </span>
                Нэмсэн дуу админы шалгалтаас өнгөрсний дараа сайт дээр харагдана.
              </p>
            </>
          )}
        </>
      )}
    </>
  );
}
