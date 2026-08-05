"use client";

/* SubscribeModal-ийн ДЕМО картын алхам.

   ⚠️ ЧУХАЛ — АЮУЛГҮЙ БАЙДАЛ: энэ форм нь БОДИТ төлбөрийн систем биш. Оруулсан картын
   мэдээлэл нь зөвхөн энэ компонентын React state-д амьдарна:
     · backend руу ИЛГЭЭГДЭХГҮЙ (`subscribeMe()` нь зөвхөн планы нэрийг явуулна)
     · localStorage/cookie-д ХАДГАЛАГДАХГҮЙ
     · формыг хаах үед state-тэйгээ хамт алга болно
   Шалгалт (Luhn, хугацаа, CVC) нь зөвхөн UX-ийн зорилготой — "буруу дугаар" оруулахад
   алдаа харуулж чадах эсэхийг хамгаалалт дээр үзүүлэхийн тулд.

   Аль ч банк/төлбөрийн байгууллагын нэр, лого, брэндийг ЗОРИУДААР ашиглаагүй. */
import { useState } from "react";
import { ActionButton } from "@/components/ui/ActionGroup";
import { FIELD_CAPTION_CLS, FIELD_LABEL_CLS, VALIDATED_INPUT_CLS } from "@/components/ui/form-styles";
import Icon from "@/components/ui/Icon";

/** Luhn алгоритм — картын дугаарын хяналтын цифр зөв эсэх. */
function luhnValid(digits: string): boolean {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

/** "4111111111111111" → "4111 1111 1111 1111" (4-4-4-4 бүлэглэл). */
function groupNumber(raw: string): string {
  return (raw.match(/.{1,4}/g) ?? []).join(" ");
}

export default function DemoCardForm({ busy, onPay }: { busy: boolean; onPay: () => void }) {
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [holder, setHolder] = useState("");
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const digits = number.replace(/\D/g, "");

    if (digits.length < 13 || digits.length > 19 || !luhnValid(digits)) {
      setErr("Картын дугаар буруу байна");
      return;
    }

    const m = expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
    if (!m) {
      setErr("Хүчинтэй хугацааг САР/ЖИЛ (жишээ: 09/28) хэлбэрээр бичнэ үү");
      return;
    }
    const month = Number(m[1]);
    const year = 2000 + Number(m[2]);
    if (month < 1 || month > 12) {
      setErr("Сар 01–12 хооронд байх ёстой");
      return;
    }
    /* Тухайн сарын СҮҮЛИЙН өдрийг хүртэл хүчинтэй — картууд ингэж ажилладаг. */
    const lastDay = new Date(year, month, 0, 23, 59, 59);
    if (lastDay.getTime() < Date.now()) {
      setErr("Картын хугацаа дууссан байна");
      return;
    }

    if (!/^\d{3,4}$/.test(cvc)) {
      setErr("CVC 3 эсвэл 4 оронтой байна");
      return;
    }
    if (holder.trim().length < 2) {
      setErr("Карт эзэмшигчийн нэрийг бичнэ үү");
      return;
    }

    setErr("");
    onPay();
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <label className={FIELD_LABEL_CLS}>
        <span className={FIELD_CAPTION_CLS}>Картын дугаар</span>
        <input
          className={VALIDATED_INPUT_CLS}
          inputMode="numeric"
          autoComplete="off"
          placeholder="4111 1111 1111 1111"
          value={number}
          onChange={(e) => setNumber(groupNumber(e.target.value.replace(/\D/g, "").slice(0, 19)))}
          aria-invalid={err.includes("дугаар") || undefined}
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className={FIELD_LABEL_CLS}>
          <span className={FIELD_CAPTION_CLS}>Хүчинтэй хугацаа</span>
          <input
            className={VALIDATED_INPUT_CLS}
            inputMode="numeric"
            autoComplete="off"
            placeholder="09/28"
            value={expiry}
            onChange={(e) => {
              const d = e.target.value.replace(/\D/g, "").slice(0, 4);
              setExpiry(d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d);
            }}
            aria-invalid={err.includes("хугацаа") || err.includes("Сар") || undefined}
          />
        </label>
        <label className={FIELD_LABEL_CLS}>
          <span className={FIELD_CAPTION_CLS}>CVC</span>
          <input
            className={VALIDATED_INPUT_CLS}
            inputMode="numeric"
            autoComplete="off"
            placeholder="123"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            aria-invalid={err.includes("CVC") || undefined}
          />
        </label>
      </div>

      <label className={FIELD_LABEL_CLS}>
        <span className={FIELD_CAPTION_CLS}>Карт эзэмшигчийн нэр</span>
        <input
          className={VALIDATED_INPUT_CLS}
          autoComplete="off"
          placeholder="BAT ERDENE"
          value={holder}
          onChange={(e) => setHolder(e.target.value)}
          aria-invalid={err.includes("нэр") || undefined}
        />
      </label>

      {err && (
        <p className="text-body text-danger" role="alert">
          {err}
        </p>
      )}

      <ActionButton type="submit" variant="primary" className="w-full" disabled={busy}>
        {busy ? "Баталгаажуулж байна…" : "9'900₮ төлөх"}
        {!busy && <Icon name="arrowRight" size={15} />}
      </ActionButton>

      <p className="text-caption text-faint leading-[1.5]">
        Туршилтын карт: <b className="text-dim">4111 1111 1111 1111</b>, хугацаа ирээдүйн аль ч огноо, CVC 123.
        Оруулсан мэдээлэл сервер рүү илгээгдэхгүй, хаана ч хадгалагдахгүй.
      </p>
    </form>
  );
}
