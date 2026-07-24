import BackBar from './BackBar.jsx'
import { loadPayments } from '../library.js'
import { PREVIEW_SEC } from './constants.jsx'

/* Захиалгын удирдлага — Player.jsx-аас тусад нь гаргасан.
   loadPayments(email) нь read-only тул дотор нь дуудсан хэвээр.
   Props: email, user, isAdmin, subscribed, renewDate, onSubscribe(), onCancelSub(), onBack() */
export default function BillingView({ email, user, isAdmin, subscribed, renewDate, onSubscribe, onCancelSub, onBack }) {
  const payments = loadPayments(email)
  const active = user?.sub?.active
  const daysLeft = user?.sub?.renews ? Math.max(0, Math.ceil((user.sub.renews - Date.now()) / 86400000)) : 0

  return (
    <>
      <BackBar title="Захиалгын удирдлага" onBack={onBack} />
      <div className={'bil-plan' + (active || isAdmin ? ' pro' : '')}>
        <div>
          <span className="mono">Идэвхтэй план</span>
          <b>{isAdmin ? 'Админ — бүх эрх' : active ? 'МЭДРЭХ PRO' : user?.sub ? 'PRO (цуцлагдсан)' : 'Үнэгүй горим'}</b>
          <p>
            {isAdmin ? 'Админ эрхтэй тул төлбөр шаардлагагүй.'
              : active ? `Дараагийн төлбөр: ${renewDate} — ${daysLeft} хоногийн дараа · 9'900₮`
                : user?.sub ? `${renewDate} хүртэл эрх хадгалагдана, дараа нь үнэгүй горимд шилжинэ.`
                  : `Дуу тус бүрээс ${PREVIEW_SEC} секунд сонсох эрхтэй.`}
          </p>
          {active && !isAdmin && (
            <div className="bil-count" aria-label="Дараагийн төлбөр хүртэл">
              <i style={{ width: Math.min(100, ((30 - daysLeft) / 30) * 100) + '%' }}></i>
            </div>
          )}
        </div>
        <div className="bil-actions">
          {!isAdmin && active && (
            <button className="sp-prof-btn danger" onClick={() => {
              if (confirm('PRO захиалгаа цуцлах уу? ' + renewDate + ' хүртэл эрх чинь хадгалагдана.')) onCancelSub()
            }}>Захиалга цуцлах</button>
          )}
          {!isAdmin && !active && (
            <button className="sp-prof-btn accent" onClick={onSubscribe}>
              {user?.sub ? 'Сэргээх — 9\'900₮/сар' : 'PRO болох — 9\'900₮/сар'}
            </button>
          )}
        </div>
      </div>

      <h3 className="st-h">Планаа харьцуулах</h3>
      <div className="bil-compare">
        <div className={'bil-ccard' + (!active && !isAdmin ? ' current' : '')}>
          {!active && !isAdmin && <span className="bil-badge">Таны план</span>}
          <span className="mono">Үнэгүй</span>
          <b className="bil-price">0₮<i>/сар</i></b>
          <ul className="bil-feats">
            <li>Дуу тус бүрээс {PREVIEW_SEC} секунд</li>
            <li>Чичиргээ + гэрэл + визуал</li>
            <li>Мэдрэхүйн калибровк</li>
            <li>Дуртай / Хадгалах / Playlist</li>
            <li className="off">Бүтэн дуу — хаалттай</li>
            <li className="off">Олон төхөөрөмж — хаалттай</li>
          </ul>
        </div>

        <div className={'bil-ccard pro' + (active || isAdmin ? ' current' : '')}>
          {(active || isAdmin) && <span className="bil-badge">Идэвхтэй</span>}
          <span className="mono">МЭДРЭХ PRO</span>
          <b className="bil-price">9'900₮<i>/сар</i></b>
          <ul className="bil-feats">
            <li>Бүх дуу бүрэн, хязгааргүй</li>
            <li>Олон төхөөрөмж (gamepad, хантааз)</li>
            <li>Өндөр нарийвчлалтай хаптик</li>
            <li>Шинэ дуунд эрт хандах</li>
            <li>Реклам-гүй туршлага</li>
            <li>Мэдрэх горим бүрэн нээлттэй</li>
          </ul>
          {!isAdmin && !active && (
            <button className="bt bt-a bil-ccta" onClick={onSubscribe}>
              {user?.sub ? 'Сэргээх →' : 'PRO болох →'}
            </button>
          )}
        </div>
      </div>

      <h3 className="st-h">Төлбөрийн түүх</h3>
      {payments.length === 0 ? (
        <p className="adm-empty">Төлбөрийн түүх хоосон байна</p>
      ) : (
        <div className="bil-table">
          <div className="bil-row bil-head">
            <span className="mono">Огноо</span><span className="mono">План</span>
            <span className="mono">Төлбөрийн хэрэгсэл</span><span className="mono">Дүн</span><span className="mono">Төлөв</span>
          </div>
          {payments.map((p) => (
            <div className="bil-row" key={p.id}>
              <span>{new Date(p.date).toLocaleDateString('mn-MN')}</span>
              <span>{p.plan}</span>
              <span className="bil-mth">{p.method}</span>
              <span><b>{p.amount}</b></span>
              <span className="bil-ok">✓ {p.status}</span>
            </div>
          ))}
        </div>
      )}
      <p className="auth-note mono" style={{ textAlign: 'left' }}>Демо горим — Stripe test. Жинхэнэ мөнгө шилжээгүй.</p>
    </>
  )
}
