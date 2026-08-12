"use client";

/* Уран бүтээлчийн профайл — хэрэглэгч өөрөө үүсгэж, засна.

   Профайлтай болмогц нэмсэн дуу нь АВТОМАТААР энэ нэрд холбогдоно (backend-ийн
   `SongsController.create` дуудагчийн профайлыг хайдаг). Өөрийгөө өөр дуучин
   гэж бичих боломжгүй.

   Хоёр төрлийн эзэн энд ирнэ:
     • ARTIST дүртэй — бүртгүүлэхдээ «Уран бүтээлч» сонгосон. Профайл нь админы
       баталгаажуулалт хүлээнэ; БАТАЛГААЖСАНЫ ДАРАА дуу, цомог нь ШУУД нийтлэгдэнэ.
     • Энгийн хэрэглэгч — профайл үүсгэсэн ч дуу нь ноорог хэвээр үүсч, куратор
       нийтэлнэ (хуучин зам).

   Аль ч тохиолдолд төлөвийг ИЛ харуулна, эс бөгөөс уран бүтээлч «дуу минь алга
   болов» гэж бодно. */
import { useCallback, useEffect, useState } from "react";
import BackBar from "../BackBar";
import Icon from "@/components/ui/Icon";
import { ActionButton } from "@/components/ui/ActionGroup";
import { Empty, ErrorState } from "@/components/ui/States";
import StatusBadge from "@/components/ui/StatusBadge";
import { FIELD_CAPTION_CLS, FIELD_INPUT_CLS, FIELD_LABEL_CLS } from "@/components/ui/form-styles";
import ArtistAlbumsPanel from "@/components/artist/ArtistAlbumsPanel";
import ImagePicker from "@/components/ui/ImagePicker";
import { fetchMyArtist, fetchMyArtistSongs, saveMyArtist } from "@/lib/api/client";
import { uploadCoverImage } from "@/lib/songs/upload";
import { useToast } from "@/components/providers/ToastProvider";
import type { Artist, Song } from "@/types/song";

export default function ArtistProfileView({ onBack }: { onBack: () => void }) {
  const toast = useToast();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  /* Хөрөг зураг — ФАЙЛААР сонгоно (холбоос бичихгүй). Сонгосон файл нь
     хадгалах мөчид л S3 руу очно; `photoCleared` нь «байгаа зургаа хассан»
     (шинийг сонгоогүй) тохиолдлыг ялгана — эс бөгөөс хассан нь мэдэгдэхгүй. */
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoCleared, setPhotoCleared] = useState(false);

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
      const photoKey = photo ? await uploadCoverImage(photo) : undefined;
      const saved = await saveMyArtist({
        name,
        bio: ((f.get("bio") as string) || "").trim() || undefined,
        careerInfo: ((f.get("careerInfo") as string) || "").trim() || undefined,
        photoKey,
        /* Зөвхөн ХАССАН үед хоосон утга явуулна. Огт хөндөөгүй бол талбарыг
           илгээхгүй — backend үлдээсэн зургийг нь хэвээр хадгална. */
        photoUrl: !photo && photoCleared ? "" : undefined,
      });
      setArtist(saved);
      setPhoto(null);
      setPhotoCleared(false);
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

          {/* Баталгаажуулалтын төлөв — уран бүтээлч «яагаад цомог нэмэх товч
              байхгүй байна» гэж эргэлзэхээс сэргийлж ШАЛТГААНЫГ нь хэлнэ. */}
          {artist && !artist.approved && (
            <div className="rounded-panel border border-warm/25 bg-warm/[.06] p-5 mb-6 flex gap-3.5 items-start">
              <span className="text-warm flex-none mt-0.5">
                <Icon name="hourglass" size={18} />
              </span>
              <div>
                <b className="font-display text-note block mb-1.5">Админы баталгаажуулалт хүлээж байна</b>
                <p className="text-dim text-body leading-6">
                  Профайл тань хянагдаж байна. Баталгаажмагц дуу, цомгоо чөлөөтэй нэмж, шууд
                  нийтлэх боломжтой болно.
                </p>
              </div>
            </div>
          )}

          {artist?.approved && (
            <div className="rounded-panel border border-aqua/25 bg-aqua/[.06] p-5 mb-6 flex gap-3.5 items-start">
              <span className="text-aqua flex-none mt-0.5">
                <Icon name="check" size={18} />
              </span>
              <div>
                <b className="font-display text-note block mb-1.5">Профайл баталгаажсан</b>
                <p className="text-dim text-body leading-6">
                  Нэмсэн дуу, цомог тань сайт дээр шууд нийтлэгдэнэ.
                </p>
              </div>
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

            <ImagePicker
              caption="Өөрийн зураг"
              hint="Компьютер/утаснаасаа зургаа сонгоно — холбоос бичих шаардлагагүй"
              file={photo}
              onPick={(picked) => {
                setPhoto(picked);
                setPhotoCleared(picked === null);
              }}
              currentUrl={photoCleared ? null : artist?.photoUrl}
              round
              size={96}
              disabled={busy}
            />

            <ActionButton variant="primary" type="submit" disabled={busy} className="self-start">
              {busy ? "Хадгалж байна…" : artist ? "Хадгалах" : "Профайл үүсгэх"}
            </ActionButton>
          </form>

          {/* Цомог зөвхөн БАТАЛГААЖСАН уран бүтээлчид — backend ч ялгаагүй
              татгалздаг тул баталгаажаагүй хүнд харуулах нь зөвхөн 403 л өгнө. */}
          {artist?.approved && (
            <section className="mb-9">
              <b className="font-display text-heading block mb-3">Миний цомгууд</b>
              <ArtistAlbumsPanel artistName={artist.name} songs={songs} onSongsChanged={load} />
            </section>
          )}

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
