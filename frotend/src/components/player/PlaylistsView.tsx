"use client";

/* Playlist удирдах — үүсгэх / жагсаах / нээх / дуу нэмэх-хасах / тоглуулах. Премиум
   music-library playlist experience (Spotify/Apple Music) руу шинэчлэв: илүү том cover
   карт, цэвэр create-хэсэг, дэлгэрэнгүй харагдацад илүү тод track мөрүүд. Бүх
   createPlaylist/deletePlaylist/addToPlaylist/removeFromPlaylist/onPlay callback, state
   (lists/name/openId/adding/q), event listener хэвээр — зөвхөн визуал давхарга шинэчлэгдсэн. */
import { useCallback, useEffect, useState } from "react";
import type { Track } from "@/types/track";
import BackBar from "./BackBar";
import { useToast } from "@/components/providers/ToastProvider";
import { Empty } from "@/components/ui/States";
import { SectionTitle } from "@/components/ui/PageHeader";
import {
  loadPlaylists, createPlaylist, deletePlaylist,
  addToPlaylist, removeFromPlaylist,
} from "@/lib/data/library";

export default function PlaylistsView({
  email, tracks, onPlay, curId, playing, onBack,
}: {
  email: string;
  tracks: Track[];
  onPlay: (t: Track) => void;
  curId: number | string | null;
  playing: boolean;
  onBack: () => void;
}) {
  const toast = useToast()
  const [lists, setLists] = useState<ReturnType<typeof loadPlaylists>>([])
  const [name, setName] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [q, setQ] = useState('')

  const refresh = useCallback(() => setLists(loadPlaylists(email)), [email])
  useEffect(() => {
    refresh()
    const on = () => refresh()
    addEventListener('medreh:playlists-changed', on)
    return () => removeEventListener('medreh:playlists-changed', on)
  }, [refresh])

  const byId = (id: number | string) => tracks.find((t) => t.id === id)
  const open = lists.find((p) => p.id === openId)

  function create(e: React.FormEvent) {
    e.preventDefault()
    if (name.trim().length < 2) { toast.error('Жагсаалтын нэрээ оруулна уу'); return }
    createPlaylist(email, name.trim())
    setName('')
    toast.success('«' + name.trim() + '» жагсаалт үүслээ')
  }
  function remove(p: { id: string; name: string }) {
    deletePlaylist(email, p.id)
    if (openId === p.id) setOpenId(null)
    toast.info('«' + p.name + '» устгагдлаа')
  }
  function playAll(p: { tracks: (number | string)[] }) {
    const first = p.tracks.map(byId).find(Boolean)
    if (first) onPlay(first)
    else toast.error('Жагсаалт хоосон байна')
  }

  /* ---- нээсэн жагсаалт ---- */
  if (open) {
    const items = open.tracks.map(byId).filter((t): t is Track => !!t)
    const candidates = tracks.filter((t) => !open.tracks.includes(t.id) &&
      (t.title + ' ' + t.artist).toLowerCase().includes(q.trim().toLowerCase()))
    return (
      <>
        <BackBar title={open.name} onBack={() => { setOpenId(null); setAdding(false) }} />
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <span className="mono">{items.length} дуу</span>
          <div className="flex gap-2.5">
            <button
              className="flex items-center gap-2 rounded-full text-[13px] font-semibold bg-aqua text-[#04100E] py-2.5 px-5 transition-[background,transform] duration-200 hover:bg-[#6FF3DE] active:scale-[.97] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:shadow-glow-aqua"
              onClick={() => playAll(open)}
              disabled={!items.length}
            >
              <span aria-hidden="true">▶</span> Бүгдийг тоглуулах
            </button>
            <button
              className="rounded-full text-[13px] font-semibold border border-white/[.12] text-ink py-2.5 px-5 transition-colors duration-200 hover:bg-white/[.06] focus-visible:outline-none focus-visible:shadow-glow-aqua"
              onClick={() => setAdding((a) => !a)}
            >
              {adding ? 'Хаах' : '＋ Дуу нэмэх'}
            </button>
          </div>
        </div>

        {adding && (
          <div className="mb-6 rounded-2xl p-4 bg-white/[.035]">
            <div className="relative mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-faint pointer-events-none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
              <input
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[.05] border border-white/[.06] text-ink text-[14px] font-[inherit] transition-[border-color,box-shadow,background] duration-300 focus:bg-white/[.08] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
                placeholder="Дуу хайх…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Нэмэх дуу хайх"
              />
            </div>
            <div className="flex flex-col gap-1 max-h-[360px] overflow-y-auto">
              {candidates.length === 0 && <Empty icon="🔍" title="Нэмэх дуу алга" hint="Өөр түлхүүр үгээр хайж үзнэ үү" />}
              {candidates.slice(0, 20).map((t) => (
                <div key={t.id} className="flex items-center gap-3 py-2 px-2.5 rounded-lg text-ink text-left hover:bg-white/[.04] transition-colors duration-150">
                  <img className="w-10 h-10 rounded-md object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)] flex-none" src={t.cover} alt="" loading="lazy" />
                  <span className="flex flex-col min-w-0 flex-1">
                    <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</b>
                    <i className="not-italic text-xs text-dim">{t.artist}</i>
                  </span>
                  <button
                    className="w-8 h-8 flex-none rounded-full flex items-center justify-center bg-aqua text-[#04100E] text-base transition-transform duration-150 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:shadow-glow-aqua"
                    onClick={() => { addToPlaylist(email, open.id, t.id); toast.success('Нэмэгдлээ') }}
                    aria-label={t.title + " нэмэх"}
                  >
                    ＋
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <Empty icon="🎧" title="Жагсаалт хоосон" hint="«＋ Дуу нэмэх» товчоор дуу нэмээрэй" />
        ) : (
          <div className="flex flex-col gap-0.5">
            {items.map((t, i) => {
              const isCur = curId === t.id
              return (
                <div
                  key={t.id}
                  className={
                    "grid grid-cols-[28px_44px_1fr_auto_auto_28px] gap-3 items-center py-2.5 px-3 rounded-lg text-ink text-left transition-colors duration-200 " +
                    (isCur ? "bg-aqua/[.08]" : "hover:bg-white/[.04]")
                  }
                >
                  <span className="mono !text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                  <img className="w-11 h-11 rounded-md object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)]" src={t.cover} alt="" loading="lazy" />
                  <button className="flex flex-col min-w-0 text-left bg-none border-none cursor-pointer focus-visible:outline-none" onClick={() => onPlay(t)}>
                    <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</b>
                    <i className="not-italic text-xs text-dim">{t.artist}</i>
                  </button>
                  <span className="mono !text-[9.5px] max-nav:hidden">{t.genre}</span>
                  <button
                    className="text-[11.5px] text-[#E88A9B] border border-[rgba(232,138,155,.3)] rounded-full py-1.5 px-3.5 transition-colors duration-250 hover:bg-[#E88A9B] hover:text-[#140306] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]"
                    onClick={() => { removeFromPlaylist(email, open.id, t.id); toast.info('Хасагдлаа') }}
                  >
                    Хасах
                  </button>
                  <span className="text-dim text-xs flex justify-center" aria-hidden="true">
                    {isCur && playing ? (
                      <span className="pl-eq" style={{ height: 14 }}>
                        <u></u>
                        <u></u>
                        <u></u>
                      </span>
                    ) : (
                      "▶"
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </>
    )
  }

  /* ---- жагсаалтуудын жагсаалт ---- */
  return (
    <>
      <BackBar title="Миний жагсаалтууд" onBack={onBack} />

      <form className="flex gap-2.5 mb-7" onSubmit={create}>
        <div className="relative flex-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-faint pointer-events-none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <input
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[.05] border border-white/[.06] text-ink text-[14px] font-[inherit] transition-[border-color,box-shadow,background] duration-300 focus:bg-white/[.08] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Шинэ жагсаалтын нэр…"
            aria-label="Шинэ жагсаалтын нэр"
          />
        </div>
        <button
          type="submit"
          className="flex-none rounded-full text-[13.5px] font-semibold bg-aqua text-[#04100E] py-3 px-6 transition-[background,transform] duration-200 hover:bg-[#6FF3DE] active:scale-[.97] focus-visible:outline-none focus-visible:shadow-glow-aqua"
        >
          ＋ Үүсгэх
        </button>
      </form>

      {lists.length === 0 ? (
        <Empty icon="🎵" title="Жагсаалт алга" hint="Дээрээс шинэ жагсаалт үүсгээд, дуртай дуугаа цуглуулаарай" />
      ) : (
        <>
          <SectionTitle title="Миний жагсаалтууд" description={`${lists.length} жагсаалт`} />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-4">
            {lists.map((p) => {
              const cover = p.tracks.map(byId).find(Boolean)?.cover
              return (
                <div
                  className="group relative bg-white/[.035] rounded-2xl overflow-hidden transition-[background,box-shadow,transform] duration-[280ms] ease-[cubic-bezier(.16,.8,.24,1)] hover:bg-white/[.055] hover:shadow-lg hover:-translate-y-1"
                  key={p.id}
                >
                  <button className="block w-full text-left bg-none border-none cursor-pointer p-3.5 focus-visible:outline-none focus-visible:shadow-glow-aqua" onClick={() => setOpenId(p.id)}>
                    <span className="grid place-items-center aspect-square rounded-lg overflow-hidden bg-white/5 mb-3 [&>img]:w-full [&>img]:h-full [&>img]:object-cover shadow-[0_8px_22px_rgba(0,0,0,.35)]">
                      {cover ? <img src={cover} alt="" loading="lazy" /> : <span className="text-[40px] text-faint" aria-hidden="true">♫</span>}
                    </span>
                    <b className="block text-[14.5px] font-semibold text-ink whitespace-nowrap overflow-hidden text-ellipsis">{p.name}</b>
                    <i className="block not-italic text-xs text-dim mt-0.5">{p.tracks.length} дуу</i>
                  </button>
                  <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <button
                      className="w-9 h-9 rounded-full border-none bg-[rgba(4,16,14,.8)] text-aqua cursor-pointer backdrop-blur-sm flex items-center justify-center transition-transform duration-150 hover:scale-110 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:shadow-glow-aqua"
                      onClick={() => playAll(p)}
                      disabled={!p.tracks.length}
                      aria-label="Тоглуулах"
                    >
                      ▶
                    </button>
                    <button
                      className="w-9 h-9 rounded-full border-none bg-[rgba(4,16,14,.8)] text-[#ff8a8a] cursor-pointer backdrop-blur-sm flex items-center justify-center transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]"
                      onClick={() => remove(p)}
                      aria-label="Устгах"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
