import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/lib/auth/AuthContext";
import { PhoneDevice } from "@/lib/haptics/PhoneDevice";
import { API_URL } from "@/lib/config";

const ROLE_LABEL: Record<string, string> = {
  ROOT: "Систем эзэмшигч",
  ADMIN: "Админ",
  CURATOR: "Куратор",
  MODERATOR: "Модератор",
  THERAPIST: "Эмчилгээний мэргэжилтэн",
  PARENT: "Эцэг эх",
  USER: "Хэрэглэгч",
};

const HEARING_LABEL: Record<string, string> = {
  deaf: "Сонсголгүй",
  hoh: "Сонсгол сул",
  hearing: "Сонсголтой",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center py-3 border-b border-line">
      <Text className="text-dim text-body">{label}</Text>
      <Text className="text-ink text-body ml-3 flex-1 text-right" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { user, logout, subscribed } = useAuth();

  // Төхөөрөмжийн чадварыг НЭГ л удаа асууна — native дуудлага тул render бүрд биш.
  const device = new PhoneDevice();

  function confirmLogout() {
    Alert.alert("Гарах уу?", user?.email ?? "", [
      { text: "Болих", style: "cancel" },
      { text: "Гарах", style: "destructive", onPress: () => logout() },
    ]);
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-5 pt-4 pb-10">
        <Text className="text-ink text-3xl font-bold">Профайл</Text>

        {user && (
          <>
            <View className="bg-surface border border-line rounded-lg px-4 mt-5">
              <Row label="Нэр" value={user.name} />
              <Row label="Имэйл" value={user.email} />
              <Row label="Эрх" value={ROLE_LABEL[user.role] ?? user.role} />
              <Row
                label="Сонсголын байдал"
                value={user.hearingProfile ? (HEARING_LABEL[user.hearingProfile] ?? user.hearingProfile) : "Заагаагүй"}
              />
              <View className="flex-row justify-between items-center py-3">
                <Text className="text-dim text-body">Захиалга</Text>
                <Text className={subscribed ? "text-aqua text-body" : "text-faint text-body"}>
                  {subscribed ? (user.sub?.plan ?? "Идэвхтэй") : "Идэвхгүй"}
                </Text>
              </View>
            </View>

            <Text className="text-ink text-heading font-semibold mt-8 mb-2">Төхөөрөмж</Text>
            <View className="bg-surface border border-line rounded-lg px-4">
              <Row
                label="Чичиргээний эрчим"
                value={device.hasAmplitudeControl ? "256 түвшин дэмжинэ" : "Зөвхөн он/офф"}
              />
              <View className="flex-row justify-between items-center py-3">
                <Text className="text-dim text-body">Сервер</Text>
                <Text className="text-faint text-caption font-mono ml-3 flex-1 text-right" numberOfLines={1}>
                  {API_URL}
                </Text>
              </View>
            </View>

            {!device.hasAmplitudeControl && (
              <Text className="text-warm text-caption mt-3">
                Таны утасны мотор эрчим ялгадаггүй тул бүх түвшин ижил хүчтэй чичирнэ. Энэ нь програмын
                алдаа биш, техник хангамжийн хязгаар.
              </Text>
            )}

            <Pressable
              className="mt-8 rounded-full py-4 items-center border border-danger"
              onPress={confirmLogout}
              accessibilityRole="button"
              accessibilityLabel="Гарах"
            >
              <Text className="text-danger text-title font-semibold">Гарах</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
