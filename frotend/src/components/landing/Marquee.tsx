const MQ_WORDS = ["мэдрэх", "чичиргээ", "давтамж", "хэмнэл", "өнгө", "мэдрэхүй"];

export default function Marquee() {
  return (
    <div className="border-t border-b border-line py-5 overflow-hidden relative z-[5]">
      <div className="flex w-max [animation:sc_34s_linear_infinite]">
        {[...MQ_WORDS, ...MQ_WORDS].map((w, i) => (
          <span
            key={i}
            className="font-display font-light text-[clamp(18px,2.8vw,36px)] text-[rgba(242,245,244,.32)] whitespace-nowrap flex items-center gap-9 pr-9 tracking-[-.03em] after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-aqua after:flex-[0_0_6px] after:opacity-70"
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
