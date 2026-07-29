/* app/page.tsx-д inline байсан дэвсгэрийн эффектийн 5 div-ийг тусад нь гаргасан.
   .cr/.cd (id="cr"/id="cd") — landing-engine.js эдгээрийг getElementById-ээр олж курсорын
   trail эффект (mouse-follow + .on hover-grow) хэрэгжүүлдэг тул ЗОРИУДААР хөндөөгүй —
   className/id хосыг өөрчлөхгүй орхив (Tailwind-руу хөрвүүлбэл JS selector эвдэрнэ).
   .grid-bg/.glow (g1/g2) нь landing-engine.js-д огт ашиглагдаагүй цэвэр CSS декор тул
   Tailwind-руу хөрвүүлсэн. */
export default function BackgroundEffects() {
  return (
    <>
      <div className="cr" id="cr"></div>
      <div className="cd" id="cd"></div>
      <div className="fixed inset-0 z-0 pointer-events-none [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:100px_100px] [mask-image:radial-gradient(ellipse_130%_90%_at_50%_22%,#000_14%,transparent_74%)] opacity-50"></div>
      <div className="fixed z-0 pointer-events-none rounded-full blur-[150px] w-[1050px] h-[400px] bg-[#0E5C53] -top-[250px] left-1/2 -translate-x-1/2 opacity-40"></div>
      <div className="fixed z-0 pointer-events-none rounded-full blur-[150px] w-[520px] h-[520px] bg-[#3A2135] -bottom-[260px] -left-[200px] opacity-30"></div>
    </>
  );
}
