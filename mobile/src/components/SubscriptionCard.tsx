import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import ConfirmModal from "./ConfirmModal";
import { cancelSubscription } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import { useCheckout } from "@/lib/payments/useCheckout";

/* PRO захиалгын карт — профайл дэлгэц дээр.

   Идэвхтэй үед: багц, сунгалтын огноо, цуцлах товч.
   Идэвхгүй үед: багцын давуу тал, «Картаар төлөх» товч (Stripe Checkout).

   ⚠️ PRO эрхийг ЭНЭ ДЭЛГЭЦ ОЛГОДОГГҮЙ. Түүнийг зөвхөн Stripe-ийн webhook олгоно —
   энд бид сервер юу гэж хэлснийг л харуулна (см. `useCheckout`). */

const PLAN_PRICE = "9'900₮";
const PERKS = [
  "Бүх дуунд бүрэн Haptic Score",
  "8 бүсийн нарийвчилсан чичиргээ",
  "Хязгааргүй тоглуулалт",
];

function fmtDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString("mn-MN");
}

export default function SubscriptionCard() {
  const { user, subscribed, refreshSession } = useAuth();
  const { phase, message, enabled, start, reset } = useCheckout();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const busy = phase === "opening" || phase === "verifying";
  const renews = fmtDate(user?.sub?.renews);

  async function doCancel() {
    setConfirmCancel(false);
    setCanceling(true);
    /* Алдаа гарсан ч сессийг дахин уншина — сервер дээр цуцлагдсан эсэхийг
       ТААМАГЛАХГҮЙ, зөвхөн бодит төлөвийг харуулна. */
    await cancelSubscription().catch(() => {});
    await refreshSession();
    setCanceling(false);
  }

  return (
    <View className="bg-surface border border-line rounded-lg px-4 py-4 mt-8">
      <View className="flex-row items-center justify-between">
        <Text className="text-ink text-heading font-semibold">МЭДРЭХ PRO</Text>
        <Text className={subscribed ? "text-aqua text-micro font-mono" : "text-faint text-micro font-mono"}>
          {subscribed ? "ИДЭВХТЭЙ" : "ИДЭВХГҮЙ"}
        </Text>
      </View>

      {subscribed ? (
        <>
          <Text className="text-dim text-caption mt-1">
            {renews ? `${renews}-нд автоматаар сунгагдана` : "Сар бүр автоматаар сунгагдана"}
          </Text>
          <Pressable
            className="mt-4 rounded-chip py-2.5 items-center border border-line-2 active:bg-surface-2"
            onPress={() => setConfirmCancel(true)}
            disabled={canceling}
            accessibilityRole="button"
            accessibilityLabel="Захиалга цуцлах"
          >
            {canceling ? (
              <ActivityIndicator color="#768583" />
            ) : (
              <Text className="text-dim text-body">Захиалга цуцлах</Text>
            )}
          </Pressable>
        </>
      ) : (
        <>
          <Text className="text-ink text-2xl font-bold mt-2">
            {PLAN_PRICE}
            <Text className="text-dim text-caption font-normal"> / сар</Text>
          </Text>

          <View className="mt-3">
            {PERKS.map((perk) => (
              <View key={perk} className="flex-row items-start mt-1.5">
                <Ionicons name="checkmark" size={15} color="#38e8ce" style={{ marginTop: 2 }} />
                <Text className="text-dim text-caption ml-2 flex-1 leading-4">{perk}</Text>
              </View>
            ))}
          </View>

          {/* Явцын мэдээллийг ИЛ хэлнэ — хөтөч рүү гарч, буцаж ирэх урсгал нь
              хэрэглэгчид ойлгомжгүй байж болно. */}
          {phase === "verifying" && (
            <Text className="text-warm text-caption mt-3 leading-4">
              Төлбөрийг баталгаажуулж байна… Хэдэн секунд хүлээнэ үү.
            </Text>
          )}
          {phase === "pending" && (
            <Text className="text-warm text-caption mt-3 leading-4">
              Баталгаажуулалт хүлээгдэж байна. Төлбөр амжилттай бол хэдхэн минутын дотор PRO эрх
              автоматаар нээгдэнэ.
            </Text>
          )}
          {phase === "error" && (
            <Text className="text-rose text-caption mt-3 leading-4">{message}</Text>
          )}
          {enabled === false && (
            <Text className="text-faint text-caption mt-3 leading-4">
              Төлбөрийн систем одоогоор тохируулагдаагүй байна.
            </Text>
          )}

          <Pressable
            className={`mt-4 rounded-chip py-3 items-center ${
              busy || enabled === false ? "bg-surface-2 border border-line-2" : "bg-aqua active:opacity-80"
            }`}
            onPress={() => (phase === "error" || phase === "pending" ? reset() : void start())}
            disabled={busy || enabled === false}
            accessibilityRole="button"
            accessibilityLabel="Картаар төлөх"
          >
            {busy ? (
              <ActivityIndicator color="#768583" />
            ) : (
              <Text className={enabled === false ? "text-faint text-body" : "text-on-aqua text-body font-semibold"}>
                {phase === "error" || phase === "pending" ? "Дахин оролдох" : "Картаар төлөх"}
              </Text>
            )}
          </Pressable>

          <Text className="text-faint text-micro font-mono mt-3 text-center leading-4">
            Stripe-ийн аюулгүй хуудас нээгдэнэ. Картын мэдээлэл апп руу орж ирэхгүй.
          </Text>
        </>
      )}

      <ConfirmModal
        visible={confirmCancel}
        title="Захиалга цуцлах уу?"
        message="Төлсөн хугацааныхаа эцэс хүртэл PRO эрх хэвээр байна. Дараа нь автоматаар сунгагдахаа болино."
        confirmLabel="Цуцлах"
        onConfirm={doCancel}
        onCancel={() => setConfirmCancel(false)}
      />
    </View>
  );
}
