const BANDS = [
  { band: "bass", idx: "01", name: "Бас", hz: "20—250 Hz", ms: "230 · 80 · 230", tot: "540 ms" },
  { band: "mid", idx: "02", name: "Дунд", hz: "250 Hz—4 kHz", ms: "70 · 50 · 70 · 50 · 70", tot: "310 ms" },
  { band: "high", idx: "03", name: "Өндөр", hz: "4—20 kHz", ms: "24 × 9", tot: "216 ms" },
];

export default function Feel() {
  return (
    <section id="feel">
      <div className="wrap">
        <div className="head rv">
          <div className="eyebrow">
            <span className="mono">01 / Хаптик самбар</span>
          </div>
          <h2>
            <span className="ln">
              <i>Уншихаа боль.</i>
            </span>
            <span className="ln">
              <i>Дараад үз.</i>
            </span>
          </h2>
          <p>Давтамжийн гурван бүс, тус бүр өөрийн хаптик хэлбэртэй. Мөр дээр дарахад утас нь тэр хэлбэрээр чичрэнэ.</p>
        </div>

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

        <div className="anz rv">
          <div className="db">
            <span>0 dB</span>
            <span>−20</span>
            <span>−40</span>
            <span>−60</span>
          </div>
          <div className="plot">
            <div className="gl" style={{ top: 0 }}></div>
            <div className="gl" style={{ top: "33.3%" }}></div>
            <div className="gl" style={{ top: "66.6%" }}></div>
            <div className="gl" style={{ top: "100%" }}></div>
            <div className="bars" id="bars"></div>
          </div>
          <div className="anz-lb mono">
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
