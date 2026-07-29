"use client";

/* Admin "PRO Management" таб-ын ДЕМО давхарга — backend дээр Payment/Subscription-ийн
   write endpoint байхгүй тул (зөвхөн User.subActive/subPlan унших боломжтой) бодит
   Approve/Reject урсгал хийх боломжгүй. Энэ модуль бол localhost demo layer: SubscribeModal
   QR нээгдэх үед энд нэг "PENDING" бичлэг нэмнэ (per-user localStorage-ийн оронд shared,
   бүх browser tab/admin харах боломжтой нэг key), admin Approve/Reject хийхэд зөвхөн энэ
   demo record-ийн статусыг өөрчилнө. SubscribeModal-ийн бодит автомат-success урсгал
   (localStorage LegacyUser.sub + pushPayment) энэ модультай ЗЭРЭГЦЭЭ, тусад нь ажиллана —
   субscription-ийн жинхэнэ логикт хүрэлгүй. Backend/JWT/DB огт хөндөгдөөгүй. */
export type PaymentRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AdminPaymentRequest {
  id: string;
  userEmail: string;
  userName: string;
  plan: string;
  amount: string;
  method: string;
  submittedAt: number;
  status: PaymentRequestStatus;
  note?: string;
  reason?: string;
  decidedAt?: number;
}

const KEY = "medreh_admin_payment_requests";

export function loadPaymentRequests(): AdminPaymentRequest[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") || [];
  } catch {
    return [];
  }
}

function save(list: AdminPaymentRequest[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  dispatchEvent(new CustomEvent("medreh:payment-requests-changed"));
}

export function pushPaymentRequest(entry: Omit<AdminPaymentRequest, "id" | "submittedAt" | "status">) {
  const list = loadPaymentRequests();
  list.unshift({ ...entry, id: "req-" + Date.now(), submittedAt: Date.now(), status: "PENDING" });
  save(list);
}

export function decidePaymentRequest(id: string, status: "APPROVED" | "REJECTED", reason?: string) {
  const list = loadPaymentRequests();
  const r = list.find((x) => x.id === id);
  if (!r) return;
  r.status = status;
  r.decidedAt = Date.now();
  if (reason) r.reason = reason;
  save(list);
}
