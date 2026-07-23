/* Демо дууны сан — SoundHelix (T. Schürger), үнэгүй ашиглах зөвшөөрөлтэй.
   Файлууд public/tracks/-д локал хадгалагдсан. */
import cov1 from './assets/gal-01.jpg'
import cov2 from './assets/gal-02.jpg'
import cov3 from './assets/gal-03.jpg'
import cov4 from './assets/gal-04.jpg'
import cov5 from './assets/gal-05.jpg'
import cov6 from './assets/gal-06.jpg'

export const TRACKS = [
  { id: 1, title: 'Гүн долгион', artist: 'SoundHelix', genre: 'Электрон', file: '/tracks/song-1.mp3', cover: cov1 },
  { id: 2, title: 'Шөнийн хэмнэл', artist: 'SoundHelix', genre: 'Чилл', file: '/tracks/song-2.mp3', cover: cov2 },
  { id: 3, title: 'Хотын гэрэл', artist: 'SoundHelix', genre: 'Синт поп', file: '/tracks/song-3.mp3', cover: cov3 },
  { id: 4, title: 'Цахилгаан зүрх', artist: 'SoundHelix', genre: 'Данс', file: '/tracks/song-4.mp3', cover: cov4 },
  { id: 5, title: 'Мөрөөдлийн зам', artist: 'SoundHelix', genre: 'Эмбиент', file: '/tracks/song-8.mp3', cover: cov5 },
  { id: 6, title: 'Аянгын цохилт', artist: 'SoundHelix', genre: 'Электрон рок', file: '/tracks/song-9.mp3', cover: cov6 },
]
