import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <div className="nf">
      <span className="nf-code">404</span>
      <h1>Хуудас олдсонгүй</h1>
      <p>Таны хайсан хуудас байхгүй эсвэл зөөгдсөн байна.</p>
      <Link className="bt bt-a inline-flex items-center gap-2" href="/">
        <Icon name="arrowLeft" size={15} />
        Нүүр хуудас руу буцах
      </Link>
    </div>
  );
}
