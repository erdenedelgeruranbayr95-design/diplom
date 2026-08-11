import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Linking } from "react-native";
import * as ExpoLinking from "expo-linking";

import { fetchPaymentsConfig, startCheckout } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";

/* Stripe Checkout-ийн гар утасны урсгал.

   АЛХМУУД
     1. `POST /payments/checkout` → Stripe-ийн `url`
     2. `Linking.openURL(url)` → СИСТЕМИЙН хөтөч нээгдэнэ
     3. Хэрэглэгч картаа өгнө → Stripe нь `medreh://?status=success` рүү буцаана
     4. Апп сэрнэ → сессийг серверээс дахин уншиж PRO эрхийг шалгана

   ⚠️ ЯАГААД `expo-web-browser` БИШ ВЭ
   Тэр нь шинэ NATIVE модуль тул APK-г дахин угсрахыг шаардана. `Linking` бол
   React Native-ийн ЦӨМД байдаг — шинэ хамаарал нэмэгдэхгүй, одоогийн build дээр
   шууд ажиллана. Ялгаа нь: in-app custom tab биш, гадаад хөтөч нээгдэнэ.

   ⚠️ ХОЁР ЗАМААР сэрэхийг барина:
     · deep link (`Linking` "url" event) — хэрэглэгч Stripe-ийн буцах товчоор ирвэл
     · AppState "active" — хэрэглэгч хөтчөө ГАРААР хаагаад буцаж ирвэл
   Зөвхөн deep link дээр найдвал хоёр дахь тохиолдолд PRO эрх нээгдсэн ч дэлгэц
   хуучин хэвээр үлдэж, хэрэглэгч "төлбөр ажиллаагүй" гэж ойлгоно.

   ⚠️ Webhook нь буцалтаас ХОЦРОХ боломжтой (Stripe хоёуланг зэрэг явуулдаг,
   дараалал баталгаагүй) тул нэг уншаад дүгнэхгүй — хэдэн секунд дахин оролдоно. */

const POLL_INTERVAL_MS = 1500;
const POLL_ATTEMPTS = 8; // ~12 секунд

export type CheckoutPhase = "idle" | "opening" | "verifying" | "active" | "pending" | "error";

export interface CheckoutState {
  phase: CheckoutPhase;
  /** `error` фазад харуулах мессеж. */
  message: string;
  /** Backend дээр Stripe тохируулагдсан эсэх. `null` = хараахан мэдэгдэхгүй. */
  enabled: boolean | null;
  start: () => Promise<void>;
  reset: () => void;
}

export function useCheckout(): CheckoutState {
  const { refreshSession, subscribed } = useAuth();
  const [phase, setPhase] = useState<CheckoutPhase>("idle");
  const [message, setMessage] = useState("");
  const [enabled, setEnabled] = useState<boolean | null>(null);

  /* Хөтөч рүү гарсан эсэх. Зөвхөн ҮҮНИЙ дараах сэрэлтийг л төлбөрийн буцалт
     гэж үзнэ — эс бөгөөс хэрэглэгч апп сэлгэх бүрд дэмий шалгалт явна. */
  const awaitingReturn = useRef(false);
  const verifyingRef = useRef(false);

  useEffect(() => {
    let alive = true;
    fetchPaymentsConfig()
      .then((cfg) => alive && setEnabled(cfg.enabled))
      .catch(() => alive && setEnabled(false));
    return () => {
      alive = false;
    };
  }, []);

  /** Сервер PRO эрхийг олгосон эсэхийг давтан шалгана. */
  const verify = useCallback(async () => {
    if (verifyingRef.current) return;
    verifyingRef.current = true;
    awaitingReturn.current = false;
    setPhase("verifying");

    try {
      for (let attempt = 0; attempt < POLL_ATTEMPTS; attempt++) {
        const user = await refreshSession();
        if (user?.sub?.active) {
          setPhase("active");
          return;
        }
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      }
      /* Хугацаа дуусав. Төлбөр амжилтгүй БАЙХ АЛБАГҮЙ — webhook удаашралтай ч
         байж болно. "Амжилтгүй" гэж ХЭЛЭХГҮЙ, үнэнийг хэлнэ. */
      setPhase("pending");
    } finally {
      verifyingRef.current = false;
    }
  }, [refreshSession]);

  /* Deep link-ээр буцаж ирэх зам. */
  useEffect(() => {
    const sub = Linking.addEventListener("url", ({ url }) => {
      if (!awaitingReturn.current) return;
      /* `status=cancel` бол хэрэглэгч өөрөө татгалзсан — шалгах шаардлагагүй. */
      if (url.includes("status=cancel")) {
        awaitingReturn.current = false;
        setPhase("idle");
        return;
      }
      void verify();
    });
    return () => sub.remove();
  }, [verify]);

  /* Хөтчөө гараар хааж буцаж ирэх зам. */
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state !== "active" || !awaitingReturn.current) return;
      void verify();
    });
    return () => sub.remove();
  }, [verify]);

  /* Хэрэглэгч аль хэдийн PRO болсон бол хүлээхээ болино (жиш. өөр төхөөрөмжөөс
     төлсөн, эсвэл админ гараар олгосон). */
  useEffect(() => {
    if (subscribed && phase === "verifying") setPhase("active");
  }, [subscribed, phase]);

  const start = useCallback(async () => {
    setMessage("");
    setPhase("opening");
    try {
      /* `medreh://` deep link — backend нь allowlist-ээр шалгана (open-redirect
         хамгаалалт), тиймээс scheme нь `app.json`-ийнхтэй ТААРАХ ёстой. */
      const returnUrl = ExpoLinking.createURL("/");
      const { url } = await startCheckout(returnUrl);

      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) throw new Error("Хөтөч нээгдсэнгүй");

      awaitingReturn.current = true;
      await Linking.openURL(url);
      /* Апп ард үлдэнэ. Дараагийн алхам нь дээрх сэрэх сонсогчид. */
    } catch (err) {
      awaitingReturn.current = false;
      setPhase("error");
      setMessage(
        err instanceof Error && err.message
          ? err.message
          : "Төлбөрийн хуудас нээгдсэнгүй. Сүлжээгээ шалгана уу.",
      );
    }
  }, []);

  const reset = useCallback(() => {
    awaitingReturn.current = false;
    setMessage("");
    setPhase("idle");
  }, []);

  return { phase, message, enabled, start, reset };
}
