const BANDS = [
  { band: "bass", idx: "01", name: "Бас", hz: "20—250 Hz", ms: "230 · 80 · 230", tot: "540 ms" },
  { band: "mid", idx: "02", name: "Дунд", hz: "250 Hz—4 kHz", ms: "70 · 50 · 70 · 50 · 70", tot: "310 ms" },
  { band: "high", idx: "03", name: "Өндөр", hz: "4—20 kHz", ms: "24 × 9", tot: "216 ms" },
];

export default function Feel() {
  return (
    <section id="feel" className="relative z-[5] py-[100px]">
      <div className="max-w-wrap mx-auto px-8 relative z-[5]">
        <div className="head rv">
          <div className="flex items-center gap-3.5 mb-[26px] after:content-[''] after:flex-1 after:h-px after:bg-line">
            <span className="mono">01 / Хаптик самбар</span>
          </div>
          <h2 className="text-[clamp(30px,5.6vw,78px)]">
            <span className="ln">
              <i>Уншихаа боль.</i>
            </span>
            <span className="ln">
              <i>Дараад үз.</i>
            </span>
          </h2>
          <p className="mt-[22px] text-dim max-w-[46ch] text-lead">
            Давтамжийн гурван бүс, тус бүр өөрийн хаптик хэлбэртэй. Мөр дээр дарахад утас нь тэр хэлбэрээр чичрэнэ.
          </p>
        </div>

        {/* .console/.c-top/.crow/.idx/.hz/.hap/.scope/.ring/.ms/.tot classname-үүд ЗОРИУДААР хэвээр
            орхигдсон — landing-engine.js эдгээрийг querySelectorAll/dataset.band-аар олж
            canvas scope зурах, haptic анимаци, beat дээр .hit класс нэмэх зэрэг JS логикт шууд
            ашигладаг тул Tailwind-руу хөрвүүлэхэд эвдрэх эрсдэлтэй (canvas/animation-д хүрэхгүй
            байхыг баталгаажуулах даалгаврын шаардлагын дагуу). */}
        <div className="console rv">
          <div className="c-top">
            <span>№</span>
            <span>Бүс</span>
            <span>Давтамж</span>
            <span>Долгион</span>
            <span>Хаптик хэв маяг</span>
            <span>Урт</span>
          </div>
          {BANDS.map((b) => (
            <button className="crow" data-band={b.band} key={b.band}>
              <span className="ring"></span>
              <span className="idx">{b.idx}</span>
              <h3>{b.name}</h3>
              <span className="hz">{b.hz}</span>
              <canvas className="scope" data-band={b.band}></canvas>
              <div>
                <div className="hap" data-band={b.band}></div>
                <div className="ms">{b.ms}</div>
              </div>
              <span className="tot">{b.tot}</span>
            </button>
          ))}
        </div>

        <div className="rv border border-line border-t-0 p-[22px_26px_18px] grid grid-cols-[40px_1fr] gap-3.5">
          <div className="flex flex-col justify-between font-mono text-micro text-faint tracking-[.1em] h-[108px]">
            <span>0 dB</span>
            <span>−20</span>
            <span>−40</span>
            <span>−60</span>
          </div>
          <div className="relative h-[108px]">
            <div className="absolute left-0 right-0 h-px bg-[rgba(242,245,244,.05)]" style={{ top: 0 }}></div>
            <div className="absolute left-0 right-0 h-px bg-[rgba(242,245,244,.05)]" style={{ top: "33.3%" }}></div>
            <div className="absolute left-0 right-0 h-px bg-[rgba(242,245,244,.05)]" style={{ top: "66.6%" }}></div>
            <div className="absolute left-0 right-0 h-px bg-[rgba(242,245,244,.05)]" style={{ top: "100%" }}></div>
            {/* #bars — landing-engine.js getElementById-ээр олж analyzer-ийн 72 баганыг шууд
                удирддаг тул id/классыг хэвээр орхив, зөвхөн эцэг .plot-ийн статик layout хөрвүүлсэн. */}
            <div className="bars" id="bars"></div>
          </div>
          <div className="mono flex justify-between mt-[11px] [grid-column:2]">
            <span>20 Hz</span>
            <span>250 Hz</span>
            <span>4 kHz</span>
            <span>20 kHz</span>
          </div>
        </div>
      </div>
    </section>
  );
}
