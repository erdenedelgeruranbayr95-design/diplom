"use client";

import { useCallback, useEffect, useState } from "react";
import type { Track } from "@/types/track";
import BackBar from "./BackBar";
import { useToast } from "@/components/providers/ToastProvider";
import { Empty } from "@/components/ui/States";
import {
  loadPlaylists, createPlaylist, deletePlaylist,
  addToPlaylist, removeFromPlaylist,
} from "@/lib/data/library";

/* Playlist удирдах — үүсгэх / жагсаах / нээх / дуу нэмэх-хасах / тоглуулах */
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
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <span className="mono">{items.length} дуу</span>
          <div className="flex gap-2">
            <button className="bt bt-a" onClick={() => playAll(open)} disabled={!items.length}>▶ Бүгдийг тоглуулах</button>
            <button className="bt" onClick={() => setAdding((a) => !a)}>{adding ? 'Хаах' : '＋ Дуу нэмэх'}</button>
          </div>
        </div>

        {adding && (
          <div className="mb-4">
            <input
              className="w-full p-[12px_14px] rounded-sm bg-white/[.04] border border-line text-ink text-[14.5px] font-[inherit] transition-[border-color,box-shadow] duration-300 mb-2.5 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
              placeholder="Дуу хайх…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <div className="flex flex-col">
              {candidates.length === 0 && <p className="adm-empty">Нэмэх дуу алга</p>}
              {candidates.slice(0, 20).map((t) => (
                <div key={t.id} className="grid grid-cols-[34px_44px_1fr_auto_34px_34px_30px] gap-3 items-center py-2.5 px-3.5 mb-0.5 rounded-[11px] text-ink text-left">
                  <span aria-hidden="true"></span>
                  <img className="w-11 h-11 rounded-lg object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)]" src={t.cover} alt="" />
                  <span className="flex flex-col min-w-0">
                    <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</b>
                    <i className="not-italic text-xs text-dim">{t.artist}</i>
                  </span>
                  <button
                    className="bt bt-a !py-1.5 !px-3.5 !text-sm"
                    onClick={() => { addToPlaylist(email, open.id, t.id); toast.success('Нэмэгдлээ') }}
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
          <div className="flex flex-col">
            {items.map((t, i) => {
              const isCur = curId === t.id
              return (
                <div
                  key={t.id}
                  className={
                    "grid grid-cols-[34px_44px_1fr_auto_34px_34px_30px] gap-3 items-center py-2.5 px-3.5 mb-0.5 rounded-[11px] text-ink text-left " +
                    (isCur ? "bg-[rgba(56,232,206,.08)]" : "")
                  }
                >
                  <span className="mono !text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                  <img className="w-11 h-11 rounded-lg object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)]" src={t.cover} alt="" />
                  <button className="flex flex-col min-w-0 text-left bg-none border-none cursor-pointer" onClick={() => onPlay(t)}>
                    <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</b>
                    <i className="not-italic text-xs text-dim">{t.artist}</i>
                  </button>
                  <span className="mono !text-[9.5px] max-nav:hidden">{t.genre}</span>
                  <button className="adm-del" onClick={() => { removeFromPlaylist(email, open.id, t.id); toast.info('Хасагдлаа') }}>Хасах</button>
                  <span className="text-dim text-xs flex justify-center" aria-hidden="true">{isCur && playing ? '▮▮' : '▶'}</span>
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

      <form className="flex gap-2.5 my-1.5 mb-5" onSubmit={create}>
        <input
          className="flex-1 w-full p-[12px_14px] rounded-sm bg-white/[.04] border border-line text-ink text-[14.5px] font-[inherit] transition-[border-color,box-shadow] duration-300 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Шинэ жагсаалтын нэр…"
        />
        <button type="submit" className="bt bt-a">＋ Үүсгэх</button>
      </form>

      {lists.length === 0 ? (
        <Empty icon="🎵" title="Жагсаалт алга" hint="Дээрээс шинэ жагсаалт үүсгээд, дуртай дуугаа цуглуулаарай" />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
          {lists.map((p) => {
            const cover = p.tracks.map(byId).find(Boolean)?.cover
            return (
              <div
                className="group relative bg-white/[.03] border border-line rounded-lg overflow-hidden transition-[border-color,box-shadow] duration-250 hover:border-white/[.16] hover:shadow-sm"
                key={p.id}
              >
                <button className="block w-full text-left bg-none border-none cursor-pointer p-3" onClick={() => setOpenId(p.id)}>
                  <span className="grid place-items-center aspect-square rounded-[11px] overflow-hidden bg-white/5 mb-2.5 [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
                    {cover ? <img src={cover} alt="" /> : <span className="text-[40px] text-faint" aria-hidden="true">♫</span>}
                  </span>
                  <b className="block text-sm text-ink">{p.name}</b>
                  <i className="block not-italic text-xs text-dim mt-0.5">{p.tracks.length} дуу</i>
                </button>
                <div className="absolute top-[18px] right-[18px] flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <button
                    className="w-8 h-8 rounded-full border-none bg-[rgba(4,16,14,.75)] text-aqua cursor-pointer backdrop-blur-sm"
                    onClick={() => playAll(p)}
                    disabled={!p.tracks.length}
                    aria-label="Тоглуулах"
                  >
                    ▶
                  </button>
                  <button
                    className="w-8 h-8 rounded-full border-none bg-[rgba(4,16,14,.75)] text-[#ff8a8a] cursor-pointer backdrop-blur-sm"
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
      )}
    </>
  )
}
