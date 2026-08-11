import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Empty, ErrorState, Loading } from "@/components/States";
import { fetchStats } from "@/lib/api/client";
import { TAB_SAFE_PB } from "@/lib/layout";
import type { ListeningStats } from "@/types";

function formatMinutes(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}с`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m} мин`;
  return `${Math.floor(m / 60)}ц ${m % 60}м`;
}

/** Утгуудыг хамгийн томтой нь харьцуулж хэвтээ баганаар харуулна — Recharts нь
 *  DOM-д тулгуурладаг тул RN-д ажиллахгүй, энгийн View-гээр хийв. */
function BarRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? Math.max(4, (value / max) * 100) : 0;
  return (
    <View className="mb-3">
      <View className="flex-row justify-between mb-1">
        <Text className="text-dim text-caption" numberOfLines={1}>
          {label}
        </Text>
        <Text className="text-faint text-caption font-mono ml-2">{value}</Text>
      </View>
      <View className="h-2 bg-line rounded-bar overflow-hidden">
        <View className="h-full bg-aqua rounded-bar" style={{ width: `${pct}%` }} />
      </View>
    </View>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <View className="flex-1 bg-surface border border-line rounded-lg px-4 py-4">
      <Text className="text-ink text-3xl font-bold">{value}</Text>
      <Text className="text-faint text-micro font-mono uppercase mt-1">{label}</Text>
    </View>
  );
}

export default function StatsScreen() {
  const [stats, setStats] = useState<ListeningStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      setStats(await fetchStats());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Статистик ачаалж чадсангүй");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const genres = useMemo(() => {
    if (!stats) return [];
    return Object.entries(stats.byGenre)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [stats]);

  const maxGenre = genres.length ? genres[0][1] : 0;

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView
        contentContainerClassName={`px-5 pt-4 ${TAB_SAFE_PB}`}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38e8ce" />}
      >
        <Text className="text-ink text-3xl font-bold">Статистик</Text>

        {error && <ErrorState message={error} onRetry={load} />}
        {!stats && !error && <Loading />}

        {stats && (
          <>
            <View className="flex-row gap-3 mt-5">
              <StatTile value={formatMinutes(stats.total)} label="нийт сонссон" />
              <StatTile value={String(stats.vib)} label="чичиргээ" />
            </View>

            <View className="flex-row gap-3 mt-3">
              <StatTile value={String(Object.keys(stats.byTrack).length)} label="сонссон дуу" />
              <StatTile value={String(Object.keys(stats.byGenre).length)} label="төрөл" />
            </View>

            <Text className="text-ink text-heading font-semibold mt-8 mb-3">Төрлөөр</Text>
            {genres.length === 0 ? (
              <Empty
                title="Мэдээлэл алга."
                hint="Дуу сонсож эхэлбэл энд таны сонсдог төрлүүд харагдана."
              />
            ) : (
              genres.map(([genre, count]) => <BarRow key={genre} label={genre} value={count} max={maxGenre} />)
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
