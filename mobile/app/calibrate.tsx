import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ErrorState, Loading } from "@/components/States";
import { fetchSensoryProfile, saveSensoryProfile } from "@/lib/api/client";
import { PhoneDevice } from "@/lib/haptics/PhoneDevice";
import { VIB_LEVELS } from "@/lib/player/constants";
import { usePreferences } from "@/lib/prefs/PreferencesContext";
import type { SensoryProfile } from "@/types";

/* Мэдрэхүйн калибровк.

   Хөгжмийн давтамжийн гурван бүсийг ТУС ТУСАД нь мэдрүүлж, хэрэглэгч аль нь
   өөрт нь мэдрэгддэгийг тогтооно. Сонсголгүй хүн бүр өөр өөр давтамжид өөр
   мэдрэмжтэй байдаг тул энэ нь зүгээр нэг тохиргоо биш, хувийн тохируулга.

   Бүсийн хэв маяг нь вэбийн `DevicesView`-ийн `BAND_PAT`-тай ИЖИЛ:
     бас   — урт, хүчтэй цохилт
     дунд  — дунд зэргийн давхар цохилт
     өндөр — богино, олон цохилт
   Native модуль амплитуд дэмждэг тул вэбээс ЯЛГААТАЙ нь эрчим нь ч бодитоор
   ялгаатай (вэб дээр бүгд ижил хүчтэй). */

const BANDS = [
  { key: "bass" as const, label: "Бас", hz: "20–250 Hz", timings: [0, 230, 80, 230], amp: 1 },
  { key: "mid" as const, label: "Дунд", hz: "250 Hz – 4 kHz", timings: [0, 70, 50, 70, 50, 70], amp: 0.65 },
  { key: "high" as const, label: "Өндөр", hz: "4–20 kHz", timings: [0, 24, 24, 24, 24, 24, 24], amp: 0.35 },
];

export default function CalibrateScreen() {
  const router = useRouter();
  const { setPref } = usePreferences();
  const [profile, setProfile] = useState<SensoryProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState<string | null>(null);

  const device = useMemo(() => new PhoneDevice(), []);

  const load = useCallback(async () => {
    try {
      setError(null);
      setProfile(await fetchSensoryProfile());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Тохиргоо ачаалж чадсангүй");
    }
  }, []);

  useEffect(() => {
    load();
    return () => device.stop();
  }, [load, device]);

  /* Бүсийн хэв маягийг тухайн бүсийн эрчмээр тоглуулна. `pulse()` нь ганц
     импульс өгдөг тул олон цохилтыг дараалуулж дуудна. */
  const testBand = useCallback(
    (band: (typeof BANDS)[number]) => {
      setTesting(band.key);
      const level = VIB_LEVELS[profile?.vibLevel ?? 1]?.mult ?? 1;
      let delay = 0;
      band.timings.forEach((ms, i) => {
        if (i % 2 === 1) {
          const at = delay;
          setTimeout(() => device.pulse(Math.min(1, band.amp * level), ms), at);
        }
        delay += ms;
      });
      setTimeout(() => setTesting(null), delay + 200);
    },
    [device, profile],
  );

  const update = useCallback(
    async (patch: Partial<SensoryProfile>) => {
      if (!profile) return;
      const next = { ...profile, ...patch };
      setProfile(next); // шууд харуулна, сүлжээг хүлээхгүй
      setSaving(true);
      try {
        await saveSensoryProfile({ ...patch, calibrated: true });
        // Серверийн эрчмийг локал тохиргоотой синхронд байлгана.
        if (patch.vibLevel !== undefined) setPref("vibLevel", patch.vibLevel);
      } catch (e) {
        setProfile(profile); // амжилтгүй бол буцаана
        setError(e instanceof Error ? e.message : "Хадгалж чадсангүй");
      } finally {
        setSaving(false);
      }
    },
    [profile, setPref],
  );

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="px-5 pt-4 flex-row items-center justify-between">
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Буцах">
          <Text className="text-dim text-copy">‹ Буцах</Text>
        </Pressable>
        {saving && <ActivityIndicator size="small" color="#768583" />}
      </View>

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Text className="text-ink text-3xl font-bold mt-3">Калибровк</Text>
        <Text className="text-dim text-note mt-1 leading-5">
          Хөгжмийн гурван давтамжийн бүсийг тус тусад нь мэдэрч үзээд, өөрт тань мэдрэгддэгийг
          нь үлдээнэ. Энэ тохиргоо таны бүртгэлд хадгалагдаж, вэб дээр ч мөрдөгдөнө.
        </Text>

        {error && <ErrorState message={error} onRetry={load} />}
        {!profile && !error && <Loading />}

        {profile && (
          <>
            {device.backend !== "amplitude" && (
              <Text className="text-warm text-caption mt-4 leading-4">
                ⚠️ Эрчмийн 256 түвшин ажиллахгүй: {device.reason}. Бүсүүд зөвхөн ХЭМНЭЛЭЭРЭЭ
                ялгарна.
              </Text>
            )}

            <Text className="text-ink text-heading font-semibold mt-7 mb-2">Давтамжийн бүс</Text>
            {BANDS.map((band) => (
              <View key={band.key} className="bg-surface border border-line rounded-lg px-4 py-3 mb-2">
                <View className="flex-row items-center">
                  <View className="flex-1">
                    <Text className="text-ink text-body font-semibold">{band.label}</Text>
                    <Text className="text-faint text-caption font-mono mt-0.5">{band.hz}</Text>
                  </View>
                  <Switch
                    value={profile.bands[band.key]}
                    onValueChange={(v) => update({ bands: { ...profile.bands, [band.key]: v } })}
                    trackColor={{ false: "#101817", true: "rgba(56,232,206,0.45)" }}
                    thumbColor={profile.bands[band.key] ? "#38e8ce" : "#768583"}
                    accessibilityLabel={`${band.label} бүс`}
                  />
                </View>
                <Pressable
                  className="mt-3 rounded-chip py-2.5 items-center border border-line-2 active:bg-surface-2"
                  onPress={() => testBand(band)}
                  accessibilityRole="button"
                  accessibilityLabel={`${band.label} бүсийг мэдэрч үзэх`}
                >
                  <Text className={testing === band.key ? "text-aqua text-body" : "text-dim text-body"}>
                    {testing === band.key ? "Мэдэрч байна…" : "Мэдэрч үзэх"}
                  </Text>
                </Pressable>
              </View>
            ))}

            <Text className="text-ink text-heading font-semibold mt-6 mb-2">Ерөнхий хүч</Text>
            <View className="flex-row gap-2">
              {VIB_LEVELS.map((lvl, i) => (
                <Pressable
                  key={lvl.label}
                  className={`flex-1 rounded-chip py-3 items-center border ${
                    profile.vibLevel === i ? "bg-aqua/15 border-aqua" : "bg-surface border-line"
                  }`}
                  onPress={() => {
                    update({ vibLevel: i });
                    device.pulse(Math.min(1, lvl.mult), 200);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: profile.vibLevel === i }}
                  accessibilityLabel={`Ерөнхий хүч: ${lvl.label}`}
                >
                  <Text className={profile.vibLevel === i ? "text-aqua text-body" : "text-dim text-body"}>
                    {lvl.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View className="bg-surface-2 border border-line rounded-lg px-4 py-3 mt-7">
              <Text className={profile.calibrated ? "text-aqua text-body" : "text-dim text-body"}>
                {profile.calibrated ? "✓ Калибровк хийгдсэн" : "Калибровк хийгдээгүй"}
              </Text>
              <Text className="text-faint text-caption mt-1 leading-4">
                Тохиргоо өөрчлөх бүрд шууд хадгалагдана.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
