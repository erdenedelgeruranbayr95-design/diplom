const MQ_WORDS = ["мэдрэх", "чичиргээ", "давтамж", "хэмнэл", "өнгө", "мэдрэхүй"];

export default function Marquee() {
  return (
    <div className="mq">
      <div className="mq-in">
        {[...MQ_WORDS, ...MQ_WORDS].map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}
