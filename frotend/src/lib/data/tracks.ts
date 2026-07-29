/* Демо дууны сан — SoundHelix (T. Schürger), үнэгүй ашиглах зөвшөөрөлтэй.
   Файлууд public/tracks/-д, ковер зургууд public/gallery/-д хадгалагдсан. */
import type { Track } from "@/types/track";

export const TRACKS: Track[] = [
  { id: 1, title: "Гүн долгион", artist: "SoundHelix", genre: "Электрон", file: "/tracks/song-1.mp3", cover: "/gallery/gal-01.jpg" },
  { id: 2, title: "Шөнийн хэмнэл", artist: "SoundHelix", genre: "Чилл", file: "/tracks/song-2.mp3", cover: "/gallery/gal-02.jpg" },
  { id: 3, title: "Хотын гэрэл", artist: "SoundHelix", genre: "Синт поп", file: "/tracks/song-3.mp3", cover: "/gallery/gal-03.jpg" },
  { id: 4, title: "Цахилгаан зүрх", artist: "SoundHelix", genre: "Данс", file: "/tracks/song-4.mp3", cover: "/gallery/gal-04.jpg" },
  { id: 5, title: "Мөрөөдлийн зам", artist: "SoundHelix", genre: "Эмбиент", file: "/tracks/song-8.mp3", cover: "/gallery/gal-05.jpg" },
  { id: 6, title: "Аянгын цохилт", artist: "SoundHelix", genre: "Электрон рок", file: "/tracks/song-9.mp3", cover: "/gallery/gal-06.jpg" },
];
