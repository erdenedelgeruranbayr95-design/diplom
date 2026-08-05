import Icon from "@/components/ui/Icon";

export default function HeroSection() {
  return (
    // tabIndex=-1: skip-link (layout.tsx) энэ рүү programmatically focus() дуудна
    // (жинхэнэ Tab дараалалд ороход зориулаагүй, зөвхөн "Шууд агуулга руу очих"-ийн зорилт).
    <header className="hero" id="hero" tabIndex={-1}>
      <canvas id="stage"></canvas>
      <div className="hero-veil"></div>

      <span className="vside vs-l">Сонсголын бэрхшээлтэй хүмүүст</span>
      <span className="vside vs-r">20 Hz — 20 000 Hz</span>

      <div className="fc fc1" data-sp="0.12">
        <div className="fr">
          <img src="/gallery/zurgggg.jpg" alt="Хөгжмийн түлхүүр ба давтамжийн долгион" loading="lazy" decoding="async" />
          <div className="tint t-warm"></div>
        </div>
        <span className="cap">Тайз / 40 Hz</span>
      </div>

      <div className="mon" id="mon" data-sp="-0.08">
        <div className="mh">
          <span className="mono" style={{ fontSize: 9 }}>
            Шууд дохио
          </span>
          <span className="dot"></span>
        </div>
        <canvas id="monwave"></canvas>
        <div className="mf">
          <span className="mono" style={{ fontSize: 9 }}>
            Бас
          </span>
          <span className="mono" style={{ fontSize: 9 }}>
            Дунд
          </span>
          <span className="mono" style={{ fontSize: 9 }}>
            Өндөр
          </span>
        </div>
      </div>

      <div className="word">
        <div className="w-eyebrow">
          <span className="mono">Хөгжмийг мэдрэх систем</span>
        </div>
        <div className="fitbox" id="fitbox">
          <canvas id="slash"></canvas>
          <h1 id="wm">
            <em>
              <i>М</i>
            </em>
            <em>
              <i>Э</i>
            </em>
            <em>
              <i>Д</i>
            </em>
            <em>
              <i>Р</i>
            </em>
            <em>
              <i>Э</i>
            </em>
            <em>
              <i>Х</i>
            </em>
          </h1>
        </div>
        <p className="sub">(Дуу авиаг чичиргээ, гэрэл, хөдөлгөөн болгон хөрвүүлнэ)</p>
      </div>

      <div className="hmeta">
        <div>
          <span className="mono">Мэдрэхүйн суваг</span>
          <b>Чичиргээ · Гэрэл · Хөдөлгөөн</b>
        </div>
        <div>
          <span className="mono">Давтамжийн бүс</span>
          <b>3 бүс, тус бүр өөр хэлбэр</b>
        </div>
        <div>
          <span className="mono">Хоцролт</span>
          <b>40 мс дотор</b>
        </div>
        <div>
          <span className="mono">Платформ</span>
          <b>Web · Android</b>
        </div>
      </div>

      <div className="badge">
        <svg viewBox="0 0 100 100">
          <defs>
            <path id="cp" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          </defs>
          <text fill="#4E5B59" fontFamily="JetBrains Mono, monospace" fontSize="8.2" letterSpacing="3.2">
            <textPath href="#cp">ДООШ ГҮЙЛГЭЖ ҮЗ · ДООШ ГҮЙЛГЭЖ ҮЗ · </textPath>
          </text>
        </svg>
        <span className="arw">
          <Icon name="arrowDown" size={17} strokeWidth={1.6} />
        </span>
      </div>
    </header>
  );
}
