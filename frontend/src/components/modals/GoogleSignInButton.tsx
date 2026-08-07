"use client";

/* Google Identity Services (GSI) "Sign in with Google" товч — `accounts.google.com/gsi/client`
   скриптийг ачаалж, Google-ийн өөрийнх нь HTML товчийг заасан div-д рендэр хийнэ. Товч
   дарагдахад Google клиент талд ID token (JWT) үүсгэж `callback`-д дамжуулна — backend
   энэ токеныг баталгаажуулна (auth.service.ts loginWithGoogle). GOOGLE_CLIENT_ID
   тохируулаагүй бол (dev орчинд) юу ч рендэрлэхгүй, алдаа шидэхгүй. */
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (resp: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (el: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

// Vercel build cache invalidate хийх зорилготой тайлбар мөр — NEXT_PUBLIC_GOOGLE_CLIENT_ID
// dashboard дээр шинэчлэгдсэн ч, энэ файл хөндөгдөөгүй бол webpack хуучин утгыг
// bundle-д дахин ашиглаж болзошгүй.
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function GoogleSignInButton({ onCredential }: { onCredential: (idToken: string) => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !containerRef.current) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    function renderButton() {
      if (cancelled || !window.google || !containerRef.current) return;
      /* Google-ийн `width` параметр ЗӨВХӨН тогтмол пиксел авдаг ("100%"/"auto" зэрэг
         дэмждэггүй) — өмнө нь тогтмол 336px заасан нь нарийн mobile viewport дээр
         эцэг container-аас урт гарч, товч тайрагдах/давхцах асуудал үүсгэдэг байсан.
         Container-ийн БОДИТ өргөнөөр дахин рендэрлэж, хэдийгээр (modal нээгдэх vед
         animation) хэмжээ өөрчлөгдвөл ResizeObserver-оор дахин тааруулна. */
      const width = Math.max(200, Math.min(336, Math.round(containerRef.current.clientWidth)));
      containerRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(containerRef.current, {
        type: "standard",
        theme: "filled_black",
        size: "large",
        shape: "pill",
        width,
        text: "continue_with",
        locale: "mn",
      });
    }

    function init() {
      if (cancelled || !window.google || !containerRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID as string,
        callback: (resp) => onCredential(resp.credential),
        /* auto_select=false: Google-ийн "One Tap" prompt (хэрэглэгч аль хэдийн энэ
           сайтад Google-аар нэвтэрсэн бол хуудас нээгмэгц АВТОМАТААР гарч ирдэг,
           renderButton()-ийн dark theme-д захирагддаггүй тусдаа цагаан card) идэвхгvй
           болгоно — хэрэглэгч зөвхөн доор рендэрлэсэн (dark theme-той) товч дарж л
           нэвтэрнэ. */
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      renderButton();

      resizeObserver = new ResizeObserver(() => renderButton());
      resizeObserver.observe(containerRef.current);
    }

    if (window.google) {
      init();
      return () => resizeObserver?.disconnect();
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = init;
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!GOOGLE_CLIENT_ID) return null;

  return <div ref={containerRef} className="flex justify-center w-full max-w-[336px] mx-auto" />;
}
