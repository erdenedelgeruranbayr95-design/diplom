import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Empty, ErrorState, Loading } from "@/components/States";
import SongRow from "@/components/SongRow";
import { fetchSongs } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import { PhoneDevice } from "@/lib/haptics/PhoneDevice";
import type { Song } from "@/types";

/* Чичиргээний эрчмийн сорил — Android-ийн VibrationEffect.createWaveform нь
   амплитуд 0-255 дэмждэг тул эдгээр товч тус бүр ТОДОРХОЙ ЯЛГААТАЙ мэдрэгдэх ёстой.
   Вэб хувилбар дээр (navigator.vibrate) гурвуулаа ЯГ ИЖИЛ хүчтэй чичирдэг —
   энэ бол native апп хийсний гол ялгаа. */
const LEVELS = [
  { label: "Сул", strength: 0.2 },
  { label: "Дунд", strength: 0.55 },
  { label: "Хүчтэй", strength: 1 },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const [tracks, setTracks] = useState<Song[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");

  // Төхөөрөмжийн чичиргээ нь дэлгэц дахин зурагдах бүрд шинээр үүсэх шаардлагагүй.
  const device = useMemo(() => new PhoneDevice(), []);

  const load = useCallback(async () => {
    try {
      setError(null);
      setTracks(await fetchSongs());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Дуунуудыг ачаалж чадсангүй");
    }
  }, []);

  useEffect(() => {
    load();
    return () => device.stop();
  }, [load, device]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const visible = useMemo(() => {
    if (!tracks) return [];
    const q = query.trim().toLowerCase();
    if (!q) return tracks;
    return tracks.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        (s.artist ?? "").toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q),
    );
  }, [tracks, query]);

  /* Толгой хэсгийг `ListHeaderComponent`-ээр өгнө.

     ⚠️ Өмнө нь энэ бүхэн `ScrollView` дотор байж, дууны жагсаалт нь
     `<FlatList scrollEnabled={false}>` байсан — RN-д энэ бол эсрэг хэв маяг:
     виртуалчлал бүрэн унтарч бүх мөр зэрэг зурагддаг, RN "VirtualizedLists should
     never be nested inside plain ScrollViews" гэж анхааруулдаг. Одоо ганц FlatList. */
  const header = (
    <View>
      <View className="pt-4">
        <Text className="text-ink text-3xl font-bold" numberOfLines={1}>
          Өдрийн мэнд{user ? `, ${user.name}` : ""}
        </Text>
        <Text className="text-dim text-note mt-1">Өнөөдөр юу сонсох вэ?</Text>
      </View>

      <View className="mt-7">
        <Text className="text-ink text-heading font-semibold mb-1">Чичиргээний эрчим</Text>
        <Text className="text-faint text-caption mb-3 leading-4">
          {device.hasAmplitudeControl
            ? "Таны утас эрчмийн 256 түвшин дэмжинэ — гурвыг нь дарж ялгааг мэдрээрэй."
            : "⚠️ Таны утас эрчим ялгадаггүй — бүх түвшин ижил хүчтэй чичирнэ."}
        </Text>
        <View className="flex-row gap-3">
          {LEVELS.map((lvl) => (
            <Pressable
              key={lvl.label}
              className="flex-1 bg-surface-2 border border-line-2 rounded-chip py-4 items-center active:bg-surface"
              onPress={() => device.pulse(lvl.strength, 220)}
              accessibilityRole="button"
              accessibilityLabel={`${lvl.label} чичиргээ туршиж үзэх`}
            >
              <Text className="text-aqua text-title font-semibold">{lvl.label}</Text>
              <Text className="text-faint text-micro font-mono mt-1">{Math.round(lvl.strength * 255)}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="mt-8 mb-3">
        <Text className="text-ink text-heading font-semibold mb-3">
          Дуунууд{tracks ? ` (${visible.length})` : ""}
        </Text>
        <TextInput
          className="bg-surface border border-line-field rounded-sm text-ink text-copy px-4 py-3"
          placeholder="Дуу, дуучин, төрлөөр хайх"
          placeholderTextColor="#768583"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          accessibilityLabel="Дуу хайх"
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        contentContainerClassName="pb-10 px-5"
        ItemSeparatorComponent={() => <View className="h-2" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38e8ce" />}
        ListEmptyComponent={
          error ? (
            <ErrorState message={error} onRetry={load} />
          ) : !tracks ? (
            <Loading />
          ) : query ? (
            <Empty title="Илэрц олдсонгүй." hint={`"${query}" -тэй тохирох дуу алга.`} />
          ) : (
            <Empty title="Дуу олдсонгүй." />
          )
        }
        renderItem={({ item }) => <SongRow song={item} />}
      />
    </SafeAreaView>
  );
}
