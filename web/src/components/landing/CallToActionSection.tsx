export default function Cta() {
  return (
    <section className="cta">
      <div className="wrap">
        <span className="mono">Эхлэл</span>
        <h2 className="rv" style={{ marginTop: 32 }}>
          <span className="ln">
            <i>ЧИМЭЭГҮЙ</i>
          </span>
          <span className="ln">
            <i>БАЙДАЛ</i>
          </span>
          <span className="ln">
            <i>ХООСОН БИШ</i>
          </span>
        </h2>
        <div className="row">
          <button className="bt bt-a mag" data-go="#feel">
            Аппыг турших
          </button>
          <button className="bt mag" data-go="#how">
            Хэрхэн ажилладаг вэ
          </button>
        </div>
      </div>
    </section>
  );
}
