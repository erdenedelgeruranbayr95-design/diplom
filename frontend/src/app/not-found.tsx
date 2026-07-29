import Link from "next/link";

export default function NotFound() {
  return (
    <div className="nf">
      <span className="nf-code">404</span>
      <h1>Хуудас олдсонгүй</h1>
      <p>Таны хайсан хуудас байхгүй эсвэл зөөгдсөн байна.</p>
      <Link className="bt bt-a" href="/">
        ← Нүүр хуудас руу буцах
      </Link>
    </div>
  );
}
