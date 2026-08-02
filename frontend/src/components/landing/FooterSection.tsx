import Link from "next/link";

export default function FooterSection() {
  return (
    <footer>
      <div className="max-w-wrap mx-auto px-8 relative z-[5] flex justify-between gap-5 flex-wrap text-dim text-body">
        <span>МЭДРЭХ® — дипломын төслийн үзүүлэн</span>
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/legal/privacy" className="hover:text-ink transition-colors duration-150">Нууцлалын бодлого</Link>
          <Link href="/legal/terms" className="hover:text-ink transition-colors duration-150">Үйлчилгээний нөхцөл</Link>
          <span className="mono">Canvas · WebGL · Web Audio API · Vibration API</span>
        </div>
      </div>
    </footer>
  );
}
