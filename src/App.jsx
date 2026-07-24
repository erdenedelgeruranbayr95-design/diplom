import { useEffect, useState } from 'react'
import { initMedreh } from './engine.js'
import AuthModal, { seedAdmin } from './AuthModal.jsx'
import { seedFeed } from './library.js'
import AdminPanel from './AdminPanel.jsx'
import Player from './Player.jsx'
import SubscribeModal from './SubscribeModal.jsx'
import { useAuth } from './auth/AuthContext.jsx'
import gal01 from './assets/gal-01.jpg'
import gal02 from './assets/gal-02.jpg'
import gal03 from './assets/gal-03.jpg'
import gal04 from './assets/gal-04.jpg'
import gal05 from './assets/gal-05.jpg'
import gal06 from './assets/gal-06.jpg'

export default function App() {
  useEffect(() => { seedAdmin(); seedFeed(); return initMedreh() }, [])

  /* auth төлөв AuthContext-оос (session нэг эх сурвалж) */
  const { user, isAdmin, subscribed, login, logout: authLogout, setSub, cancelSub } = useAuth()

  const [authOpen, setAuthOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  /* нэвтэрсэн хэрэглэгч (сесс сэргээх/reload үед ч) шууд Player app руу орно —
     landing/marketing нь зөвхөн зочдод зориулагдана */
  const [playerOpen, setPlayerOpen] = useState(!!user)
  const [subOpen, setSubOpen] = useState(false)

  const handleAuth = (u) => { login(u); setPlayerOpen(true) }
  const logout = () => {
    authLogout()
    setAdminOpen(false); setPlayerOpen(false); setSubOpen(false)
  }
  const openPlayer = () => { user ? setPlayerOpen(true) : setAuthOpen(true) }
  const handleSubscribed = (sub) => setSub(sub)
  const handleCancelSub = () => cancelSub()

  return (
    <>
      <Preloader />
      <div className="cr" id="cr"></div>
      <div className="cd" id="cd"></div>
      <div className="grid-bg"></div>
      <div className="glow g1"></div>
      <div className="glow g2"></div>

      <Hero />
      <Dock user={user} isAdmin={isAdmin} onLogin={() => setAuthOpen(true)} onLogout={logout}
        onAdmin={() => setAdminOpen(true)} onPlayer={openPlayer} />
      <Marquee />
      <Feel />
      <Gallery />
      <How />
      <Cta />
      <Footer />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuth={handleAuth} />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} currentUser={user} />
      <Player open={playerOpen} onClose={() => setPlayerOpen(false)} user={user}
        subscribed={subscribed} onSubscribe={() => setSubOpen(true)}
        isAdmin={isAdmin} onAdmin={() => setAdminOpen(true)} onLogout={logout}
        onCancelSub={handleCancelSub} />
      <SubscribeModal open={subOpen} onClose={() => setSubOpen(false)} user={user}
        onSubscribed={handleSubscribed} />
    </>
  )
}

function Preloader() {
  return (
    <div className="pre" id="pre">
      <b>МЭДРЭХ</b>
      <b id="pct" style={{ fontSize: 'clamp(24px,4.5vw,54px)' }}>0</b>
      <div className="pre-line"><i id="pbar"></i></div>
    </div>
  )
}

function Hero() {
  return (
    <header className="hero" id="hero">
      <canvas id="stage"></canvas>
      <div className="hero-veil"></div>

      <span className="vside vs-l">Сонсголын бэрхшээлтэй хүмүүст</span>
      <span className="vside vs-r">20 Hz — 20 000 Hz</span>

      <div className="fc fc1" data-sp="0.12">
        <div className="fr">
          <img src={gal02} alt="Концертын танхим, гэрэлтсэн тайз" loading="lazy" />
          <div className="tint t-warm"></div>
        </div>
        <span className="cap">Тайз / 40 Hz</span>
      </div>

      <div className="mon" id="mon" data-sp="-0.08">
        <div className="mh">
          <span className="mono" style={{ fontSize: 9 }}>Шууд дохио</span>
          <span className="dot"></span>
        </div>
        <canvas id="monwave"></canvas>
        <div className="mf">
          <span className="mono" style={{ fontSize: 9 }}>Бас</span>
          <span className="mono" style={{ fontSize: 9 }}>Дунд</span>
          <span className="mono" style={{ fontSize: 9 }}>Өндөр</span>
        </div>
      </div>

      <div className="word">
        <div className="w-eyebrow"><span className="mono">Хөгжмийг мэдрэх систем</span></div>
        <div className="fitbox" id="fitbox">
          <canvas id="slash"></canvas>
          <h1 id="wm">
            <em><i>М</i></em><em><i>Э</i></em><em><i>Д</i></em><em><i>Р</i></em><em><i>Э</i></em><em><i>Х</i></em>
          </h1>
        </div>
        <p className="sub">(Дуу авиаг чичиргээ, гэрэл, хөдөлгөөн болгон хөрвүүлнэ)</p>
      </div>

      <div className="hmeta">
        <div><span className="mono">Мэдрэхүйн суваг</span><b>Чичиргээ · Гэрэл · Хөдөлгөөн</b></div>
        <div><span className="mono">Давтамжийн бүс</span><b>3 бүс, тус бүр өөр хэлбэр</b></div>
        <div><span className="mono">Хоцролт</span><b>40 мс дотор</b></div>
        <div><span className="mono">Платформ</span><b>Web · Android</b></div>
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
        <span className="arw">↓</span>
      </div>
    </header>
  )
}

function Dock({ user, isAdmin, onLogin, onLogout, onAdmin, onPlayer }) {
  return (
    <nav className="dock" id="dock">
      <div className="nav-left">
        <button className="disc" id="disc" aria-label="Дуу эхлүүлэх"></button>
        <a href="#top" className="nav-logo keep">МЭДРЭХ<sup>®</sup></a>
      </div>

      {/* landing-ийн цэс — зөвхөн зочдод (нэвтрээгүй үед) */}
      {!user && (
        <div className="nav-links">
          <a href="#top" className="keep">Нүүр</a>
          <a href="#feel">Мэдрэх</a>
          <a href="#gal">Галерей</a>
          <a href="#how">Хэрхэн</a>
        </div>
      )}

      <div className="nav-right">
        {/* нэвтэрсэн хэрэглэгч Player-ээ хаасан бол буцаж нээх зам */}
        {user && (
          <button className="nav-play keep" onClick={onPlayer}>♫ Тоглуулагч</button>
        )}
        {isAdmin && (
          <button className="dock-auth adm-btn keep" onClick={onAdmin}>Админ</button>
        )}
        {user ? (
          <button className="dock-auth keep" onClick={onLogout} title={user.email + ' · Гарах'}>
            {user.name} · Гарах
          </button>
        ) : (
          <button className="dock-auth keep" onClick={onLogin}>Нэвтрэх</button>
        )}
      </div>
    </nav>
  )
}

const MQ_WORDS = ['мэдрэх', 'чичиргээ', 'давтамж', 'хэмнэл', 'өнгө', 'мэдрэхүй']

function Marquee() {
  return (
    <div className="mq">
      <div className="mq-in">
        {[...MQ_WORDS, ...MQ_WORDS].map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  )
}

const BANDS = [
  { band: 'bass', idx: '01', name: 'Бас', hz: '20—250 Hz', ms: '230 · 80 · 230', tot: '540 ms' },
  { band: 'mid', idx: '02', name: 'Дунд', hz: '250 Hz—4 kHz', ms: '70 · 50 · 70 · 50 · 70', tot: '310 ms' },
  { band: 'high', idx: '03', name: 'Өндөр', hz: '4—20 kHz', ms: '24 × 9', tot: '216 ms' },
]

function Feel() {
  return (
    <section id="feel">
      <div className="wrap">
        <div className="head rv">
          <div className="eyebrow"><span className="mono">01 / Хаптик самбар</span></div>
          <h2>
            <span className="ln"><i>Уншихаа боль.</i></span>
            <span className="ln"><i>Дараад үз.</i></span>
          </h2>
          <p>Давтамжийн гурван бүс, тус бүр өөрийн хаптик хэлбэртэй. Мөр дээр дарахад утас нь тэр хэлбэрээр чичрэнэ.</p>
        </div>

        <div className="console rv">
          <div className="c-top">
            <span>№</span><span>Бүс</span><span>Давтамж</span><span>Долгион</span><span>Хаптик хэв маяг</span><span>Урт</span>
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
          <div className="db"><span>0 dB</span><span>−20</span><span>−40</span><span>−60</span></div>
          <div className="plot">
            <div className="gl" style={{ top: 0 }}></div>
            <div className="gl" style={{ top: '33.3%' }}></div>
            <div className="gl" style={{ top: '66.6%' }}></div>
            <div className="gl" style={{ top: '100%' }}></div>
            <div className="bars" id="bars"></div>
          </div>
          <div className="anz-lb mono">
            <span>20 Hz</span><span>250 Hz</span><span>4 kHz</span><span>20 kHz</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const SLIDES = [
  { no: '01', img: gal01, tint: 't-cool', name: 'Гүн бас', hz: '40 Hz', alt: 'Чанга яригчийн ойрын зураг' },
  { no: '02', img: gal02, tint: 't-warm', name: 'Танхимын нөсөө', hz: '320 Hz', alt: 'Концертын танхим, гэрэлтсэн тайз' },
  { no: '03', img: gal03, tint: 't-cool', name: 'Хурц өндөр', hz: '8 kHz', alt: 'Лазер гэрлийн туяа бүхий тайз' },
  { no: '04', img: gal04, tint: 't-rose', name: 'Цохилтын хэлбэр', hz: '90 Hz', alt: 'Гараа өргөсөн үзэгчид' },
  { no: '05', img: gal05, tint: 't-warm', name: 'Чимээгүй завсар', hz: '0 Hz', alt: 'Микрофоны ойрын зураг' },
  { no: '06', img: gal06, tint: 't-cool', name: 'Бүтэн спектр', hz: '20—20k', alt: 'Олон өнгийн гэрлийн шоу' },
]

function Gallery() {
  return (
    <div className="gal-outer" id="gal">
      <div className="gal-sticky">
        <div className="gal-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}><span className="mono">02 / Галерей</span></div>
            <h2>Дуу бүр өөрийн дүр төрхтэй</h2>
          </div>
          <div className="gal-prog">
            <span className="mono" id="galno">01</span>
            <div className="track"><i id="galbar"></i></div>
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
  )
}

const STEPS = [
  { n: '01', name: 'Дуу орж ирнэ', text: 'Утсан дээрээ дуу тоглуулах эсвэл микрофоноор орчны дууг сонсгоно. Ямар ч хөгжим байж болно.' },
  { n: '02', name: 'Систем дууг задлана', text: 'Апп дууг 3 хэсэгт хуваана — бүдүүн дуу (бөмбөр), дунд дуу (хоолой, гитар), нарийн дуу (цан, исгэрэх).' },
  { n: '03', name: 'Мэдрэмж болгон хувиргана', text: 'Бүдүүн дуу = хүчтэй урт чичиргээ, дунд = зөөлөн хэмнэл, нарийн = богино түргэн чичиргээ + гэрэл.' },
  { n: '04', name: 'Та мэдэрнэ', text: 'Утас гарт чинь чичирч, дэлгэц хөгжмийн хэмнэлээр гэрэлтэнэ. Дуутай бараг зэрэг — нүд ирмэхээс ч хурдан.' },
]

function How() {
  return (
    <section id="how">
      <div className="wrap">
        <div className="head rv">
          <div className="eyebrow"><span className="mono">03 / Хэрхэн ажилладаг вэ</span></div>
          <h2><span className="ln"><i>Дуу хэрхэн мэдрэмж болдог вэ?</i></span></h2>
          <p>
            Сонсголгүй хүн хөгжмийг чихээрээ биш — гараараа, нүдээрээ мэдэрнэ.
            Энэ нь ердөө 4 алхмаар болдог:
          </p>
        </div>
        <div className="steps rv">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <span className="n">{s.n}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="cta">
      <div className="wrap">
        <span className="mono">Эхлэл</span>
        <h2 className="rv" style={{ marginTop: 32 }}>
          <span className="ln"><i>ЧИМЭЭГҮЙ</i></span>
          <span className="ln"><i>БАЙДАЛ</i></span>
          <span className="ln"><i>ХООСОН БИШ</i></span>
        </h2>
        <div className="row">
          <button className="bt bt-a mag" data-go="#feel">Аппыг турших</button>
          <button className="bt mag" data-go="#how">Хэрхэн ажилладаг вэ</button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap fin">
        <span>МЭДРЭХ® — дипломын төслийн үзүүлэн</span>
        <span className="mono">Canvas · WebGL · Web Audio API · Vibration API</span>
      </div>
    </footer>
  )
}
