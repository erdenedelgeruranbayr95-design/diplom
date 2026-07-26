const SLIDES = [
  { no: "01", img: "/gallery/gal-01.jpg", tint: "t-cool", name: "Гүн бас", hz: "40 Hz", alt: "Чанга яригчийн ойрын зураг" },
  { no: "02", img: "/gallery/gal-02.jpg", tint: "t-warm", name: "Танхимын нөсөө", hz: "320 Hz", alt: "Концертын танхим, гэрэлтсэн тайз" },
  { no: "03", img: "/gallery/gal-03.jpg", tint: "t-cool", name: "Хурц өндөр", hz: "8 kHz", alt: "Лазер гэрлийн туяа бүхий тайз" },
  { no: "04", img: "/gallery/gal-04.jpg", tint: "t-rose", name: "Цохилтын хэлбэр", hz: "90 Hz", alt: "Гараа өргөсөн үзэгчид" },
  { no: "05", img: "/gallery/gal-05.jpg", tint: "t-warm", name: "Чимээгүй завсар", hz: "0 Hz", alt: "Микрофоны ойрын зураг" },
  { no: "06", img: "/gallery/gal-06.jpg", tint: "t-cool", name: "Бүтэн спектр", hz: "20—20k", alt: "Олон өнгийн гэрлийн шоу" },
];

export default function Gallery() {
  return (
    <div className="gal-outer" id="gal">
      <div className="gal-sticky">
        <div className="gal-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              <span className="mono">02 / Галерей</span>
            </div>
            <h2>Дуу бүр өөрийн дүр төрхтэй</h2>
          </div>
          <div className="gal-prog">
            <span className="mono" id="galno">
              01
            </span>
            <div className="track">
              <i id="galbar"></i>
            </div>
            <span className="mono">06</span>
          </div>
        </div>
        <div className="gal-track" id="track">
          {SLIDES.map((s) => (
            <div className="slide" key={s.no}>
              <div className="fr">
                <span className="no">{s.no}</span>
                <img src={s.img} alt={s.alt} loading="lazy" />
                <div className={`tint ${s.tint}`}></div>
              </div>
              <div className="meta">
                <h3>{s.name}</h3>
                <span className="mono">{s.hz}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
