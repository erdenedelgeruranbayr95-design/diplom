import CircularGallery from "./CircularGallery";

const SLIDES = [
  { image: "/gallery/gal-01.jpg", text: "Гүн бас — 40 Hz" },
  { image: "/gallery/gal-02.jpg", text: "Танхимын нөсөө — 320 Hz" },
  { image: "/gallery/gal-03.jpg", text: "Хурц өндөр — 8 kHz" },
  { image: "/gallery/gal-04.jpg", text: "Цохилтын хэлбэр — 90 Hz" },
  { image: "/gallery/gal-05.jpg", text: "Чимээгүй завсар — 0 Hz" },
  { image: "/gallery/gal-06.jpg", text: "Бүтэн спектр — 20—20k" },
];

export default function Gallery() {
  return (
    <div className="relative z-[5] py-[100px]">
      <div className="max-w-wrap mx-auto px-8 mb-10">
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          <span className="mono">02 / Галерей</span>
        </div>
        <h2>Дуу бүр өөрийн дүр төрхтэй</h2>
      </div>
      <div style={{ height: "440px", position: "relative" }}>
        <CircularGallery items={SLIDES} bend={1} textColor="#ffffff" borderRadius={0.05} scrollEase={0.05} scrollSpeed={2} />
      </div>
    </div>
  );
}
