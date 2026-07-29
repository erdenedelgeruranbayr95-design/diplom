export default function CallToActionSection() {
  return (
    <section className="text-center p-[50px_0_56px] [&>div>h2]:text-[clamp(30px,7.5vw,108px)] [&>div>h2]:leading-[.92]">
      <div className="max-w-wrap mx-auto px-8 relative z-[5]">
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
        <div className="flex gap-3.5 justify-center mt-[46px] flex-wrap">
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
