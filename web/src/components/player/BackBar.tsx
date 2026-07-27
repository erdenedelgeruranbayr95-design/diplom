export default function BackBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-[18px] mb-6">
      <button
        className="text-[13.5px] text-dim border border-line rounded-full py-[9px] px-[18px] whitespace-nowrap transition-colors duration-[250ms] hover:text-aqua hover:border-[rgba(56,232,206,.4)]"
        onClick={onBack}
      >
        ← Буцах
      </button>
      <h2 className="sp-h" style={{ margin: 0 }}>
        {title}
      </h2>
    </div>
  );
}
