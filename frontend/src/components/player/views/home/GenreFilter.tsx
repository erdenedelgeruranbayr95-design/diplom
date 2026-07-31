"use client";

/** Төрлөөр шүүх — Нүүрийн хайлтын хэсгийн дээд талд. */
export default function GenreFilter({
  genres,
  activeGenre,
  onSelect,
}: {
  genres: string[];
  activeGenre: string;
  onSelect: (genre: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Төрлөөр шүүх">
      {genres.map((genre) => (
        <button
          key={genre}
          className={
            "text-body rounded-full py-2.5 px-[18px] border transition-[background,border-color,color,box-shadow] duration-250 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
            (activeGenre === genre
              ? "bg-aqua border-aqua text-on-aqua font-semibold shadow-[0_4px_18px_rgba(56,232,206,.32)]"
              : "bg-white/[.05] border-white/[.06] text-ink hover:bg-white/10")
          }
          onClick={() => onSelect(genre)}
          aria-pressed={activeGenre === genre}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
