import type { Track } from "@/types/track";

export default function SideList({
  tracks,
  curId,
  playing,
  onPlay,
}: {
  tracks: Track[];
  curId: number | string | null;
  playing: boolean;
  onPlay: (t: Track) => void;
}) {
  return (
    <div className="sp-side-recent">
      {tracks.map((t) => (
        <button key={t.id} className={"sp-rcard" + (curId === t.id ? " on" : "")} onClick={() => onPlay(t)}>
          <img src={t.cover} alt="" />
          <span>{t.title}</span>
          {curId === t.id && playing ? (
            <span className="pl-eq sp-req" aria-hidden="true">
              <u></u>
              <u></u>
              <u></u>
            </span>
          ) : (
            <i aria-hidden="true">▶</i>
          )}
        </button>
      ))}
    </div>
  );
}
