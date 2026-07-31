const STEPS = [
  { n: "01", name: "Дуу орж ирнэ", text: "Утсан дээрээ дуу тоглуулах эсвэл микрофоноор орчны дууг сонсгоно. Ямар ч хөгжим байж болно." },
  { n: "02", name: "Систем дууг задлана", text: "Апп дууг 3 хэсэгт хуваана — бүдүүн дуу (бөмбөр), дунд дуу (хоолой, гитар), нарийн дуу (цан, исгэрэх)." },
  { n: "03", name: "Мэдрэмж болгон хувиргана", text: "Бүдүүн дуу = хүчтэй урт чичиргээ, дунд = зөөлөн хэмнэл, нарийн = богино түргэн чичиргээ + гэрэл." },
  { n: "04", name: "Та мэдэрнэ", text: "Утас гарт чинь чичирч, дэлгэц хөгжмийн хэмнэлээр гэрэлтэнэ. Дуутай бараг зэрэг — нүд ирмэхээс ч хурдан." },
];

export default function HowItWorksSection() {
  return (
    <section id="how" className="relative z-[5] py-[100px]">
      <div className="max-w-wrap mx-auto px-8 relative z-[5]">
        <div className="head rv">
          <div className="flex items-center gap-3.5 mb-[26px] after:content-[''] after:flex-1 after:h-px after:bg-line">
            <span className="mono">03 / Хэрхэн ажилладаг вэ</span>
          </div>
          <h2 className="text-[clamp(30px,5.6vw,78px)]">
            <span className="ln">
              <i>Дуу хэрхэн мэдрэмж болдог вэ?</i>
            </span>
          </h2>
          <p className="mt-[22px] text-dim max-w-[46ch] text-lead">
            Сонсголгүй хүн хөгжмийг чихээрээ биш — гараараа, нүдээрээ мэдэрнэ. Энэ нь ердөө 4 алхмаар болдог:
          </p>
        </div>
        <div className="rv border-t border-line mt-[58px]">
          {STEPS.map((s) => (
            <div
              className="group relative grid grid-cols-[76px_1fr_1.15fr] max-[760px]:grid-cols-[36px_1fr] max-[760px]:[grid-template-areas:'n_h3'_'._p'] gap-6 max-[760px]:gap-x-3.5 max-[760px]:gap-y-1 py-8 border-b border-line items-baseline transition-[background,border-color] duration-[400ms] hover:bg-[linear-gradient(90deg,rgba(56,232,206,.06),transparent_60%)] hover:border-[rgba(56,232,206,.3)] before:content-[''] before:absolute before:left-0 before:top-0 before:-bottom-px before:w-0.5 before:bg-aqua before:scale-y-0 before:origin-bottom before:transition-transform before:duration-[400ms] before:ease-[cubic-bezier(.16,.8,.24,1)] hover:before:scale-y-100 hover:before:origin-top"
              key={s.n}
            >
              <span className="max-[760px]:[grid-area:n] font-mono text-caption tracking-[.2em] text-faint text-right transition-colors duration-[400ms] group-hover:text-aqua">
                {s.n}
              </span>
              <h3 className="max-[760px]:[grid-area:h3] text-[clamp(21px,2.6vw,32px)] font-normal tracking-[-.035em] transition-colors duration-[400ms] group-hover:text-aqua">
                {s.name}
              </h3>
              <p className="max-[760px]:[grid-area:p] text-dim text-lead">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
