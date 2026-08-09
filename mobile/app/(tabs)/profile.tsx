import { useMemo, useState } from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import ConfirmModal from "@/components/ConfirmModal";
import { useAuth } from "@/lib/auth/AuthContext";
import { PhoneDevice } from "@/lib/haptics/PhoneDevice";
import { VIB_LEVELS } from "@/lib/player/constants";
import { usePreferences } from "@/lib/prefs/PreferencesContext";
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
  const router = useRouter();
  const { user, logout, subscribed } = useAuth();
  const { vibrationOn, vibLevel, reducedMotion, setPref } = usePreferences();

  // Төхөөрөмжийн чадварыг НЭГ л удаа асууна — native дуудлага тул render бүрд биш.
  const device = useMemo(() => new PhoneDevice(), []);

  const [loggingOut, setLoggingOut] = useState(false);

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

            {/* ---- мэдрэхүйн тохиргоо ----
                Эдгээр нь төхөөрөмж дээр ХАДГАЛАГДАНА. Мэдрэхүйн тохиргоо бол
                хувь хүний тогтвортой хэрэгцээ — дуу солих бүрд дахин тааруулах
                ёсгүй. */}
            <Text className="text-ink text-heading font-semibold mt-8 mb-2">Мэдрэхүй</Text>
            <View className="bg-surface border border-line rounded-lg px-4">
              <View className="flex-row justify-between items-center py-3 border-b border-line">
                <View className="flex-1 mr-3">
                  <Text className="text-ink text-body">Чичиргээ</Text>
                  <Text className="text-faint text-caption mt-0.5">Дуу тоглуулахад чичиргээ өгнө</Text>
                </View>
                <Switch
                  value={vibrationOn}
                  onValueChange={(v) => setPref("vibrationOn", v)}
                  trackColor={{ false: "#101817", true: "rgba(56,232,206,0.45)" }}
                  thumbColor={vibrationOn ? "#38e8ce" : "#768583"}
                  accessibilityLabel="Чичиргээ"
                />
              </View>

              <View className="py-3 border-b border-line">
                <Text className="text-ink text-body mb-2">Чичиргээний хүч</Text>
                <View className="flex-row gap-2">
                  {VIB_LEVELS.map((lvl, i) => (
                    <Pressable
                      key={lvl.label}
                      className={`flex-1 rounded-chip py-2.5 items-center border ${
                        vibLevel === i ? "bg-aqua/15 border-aqua" : "bg-surface-2 border-line"
                      }`}
                      onPress={() => {
                        setPref("vibLevel", i);
                        // Шууд мэдрүүлнэ — сонголтоо тухайн агшинд шалгах боломж.
                        device.pulse(lvl.mult > 1 ? 1 : lvl.mult, 200);
                      }}
                      accessibilityRole="button"
                      accessibilityState={{ selected: vibLevel === i }}
                      accessibilityLabel={`Чичиргээний хүч: ${lvl.label}`}
                    >
                      <Text className={vibLevel === i ? "text-aqua text-body" : "text-dim text-body"}>
                        {lvl.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <Text className="text-faint text-caption mt-2">Дарж туршиж үзнэ</Text>
              </View>

              <View className="flex-row justify-between items-center py-3">
                <View className="flex-1 mr-3">
                  <Text className="text-ink text-body">Хөдөлгөөн багасгах</Text>
                  <Text className="text-faint text-caption mt-0.5">
                    Цохилтын пульс намуухан болно (арилахгүй)
                  </Text>
                </View>
                <Switch
                  value={reducedMotion}
                  onValueChange={(v) => setPref("reducedMotion", v)}
                  trackColor={{ false: "#101817", true: "rgba(56,232,206,0.45)" }}
                  thumbColor={reducedMotion ? "#38e8ce" : "#768583"}
                  accessibilityLabel="Хөдөлгөөн багасгах"
                />
              </View>
            </View>

            <Pressable
              className="bg-surface border border-aqua/40 rounded-lg px-4 py-3.5 mt-3 flex-row items-center"
              onPress={() => router.push("/calibrate")}
              accessibilityRole="button"
              accessibilityLabel="Мэдрэхүйн калибровк"
            >
              <View className="flex-1">
                <Text className="text-aqua text-body font-semibold">Калибровк хийх</Text>
                <Text className="text-faint text-caption mt-0.5">
                  Давтамжийн бүсүүдийг мэдэрч, өөрт тохируулна
                </Text>
              </View>
              <Text className="text-aqua text-body ml-3">›</Text>
            </Pressable>

            <Pressable
              className="bg-surface border border-line rounded-lg px-4 py-3.5 mt-2 flex-row items-center"
              onPress={() => router.push("/help")}
              accessibilityRole="button"
              accessibilityLabel="Тусламж"
            >
              <View className="flex-1">
                <Text className="text-ink text-body font-semibold">Тусламж</Text>
                <Text className="text-faint text-caption mt-0.5">
                  Хэрхэн ашиглах вэ · чичиргээ ажиллахгүй бол
                </Text>
              </View>
              <Text className="text-dim text-body ml-3">›</Text>
            </Pressable>

            <Text className="text-ink text-heading font-semibold mt-8 mb-2">Төхөөрөмж</Text>
            <View className="bg-surface border border-line rounded-lg px-4">
              <Row
                label="Чичиргээний эрчим"
                value={
                  device.backend === "amplitude"
                    ? "256 түвшин (амплитуд)"
                    : device.backend === "waveform"
                      ? "Зөвхөн хугацаагаар"
                      : device.backend === "preset"
                        ? "3 бэлэн түвшин"
                        : "Байхгүй"
                }
              />
              <View className="flex-row justify-between items-center py-3">
                <Text className="text-dim text-body">Сервер</Text>
                <Text className="text-faint text-caption font-mono ml-3 flex-1 text-right" numberOfLines={1}>
                  {API_URL}
                </Text>
              </View>
            </View>

            {device.backend !== "amplitude" && (
              <Text className="text-warm text-caption mt-3 leading-4">{device.reason}</Text>
            )}

            <Pressable
              className="mt-8 rounded-full py-4 items-center border border-danger"
              onPress={() => setLoggingOut(true)}
              accessibilityRole="button"
              accessibilityLabel="Гарах"
            >
              <Text className="text-danger text-title font-semibold">Гарах</Text>
            </Pressable>
          </>
        )}
      </ScrollView>

      <ConfirmModal
        visible={loggingOut}
        title="Гарах уу?"
        message={user?.email}
        confirmLabel="Гарах"
        destructive
        onCancel={() => setLoggingOut(false)}
        onConfirm={() => {
          setLoggingOut(false);
          logout();
        }}
      />
    </SafeAreaView>
  );
}
