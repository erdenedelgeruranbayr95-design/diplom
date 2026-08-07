import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Empty, ErrorState, Loading } from "@/components/States";
import SongRow from "@/components/SongRow";
import { fetchLibrary, fetchPlaylists, fetchSongs } from "@/lib/api/client";
import type { LibraryState, Playlist, Song } from "@/types";

type Tab = "liked" | "saved" | "playlists";

const TABS: { key: Tab; label: string }[] = [
  { key: "liked", label: "Дуртай" },
  { key: "saved", label: "Хадгалсан" },
  { key: "playlists", label: "Жагсаалт" },
];

export default function LibraryScreen() {
  const [tab, setTab] = useState<Tab>("liked");
  const [library, setLibrary] = useState<LibraryState | null>(null);
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const [lib, all, pls] = await Promise.all([fetchLibrary(), fetchSongs(), fetchPlaylists()]);
      setLibrary(lib);
      setSongs(all);
      setPlaylists(pls);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ачаалж чадсангүй");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /* Тоглуулагч дээр дуртай/хадгалах дарсны дараа буцаж ирэхэд жагсаалт хуучирсан
     байхаас сэргийлж, дэлгэц идэвхжих бүрд дахин уншина. */
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

  // ID-гаар хайх нь жагсаалт урт болоход мэдэгдэхүйц — нэг удаа индекс болгоно.
  const byId = useMemo(() => new Map((songs ?? []).map((s) => [s.id, s])), [songs]);

  const visible: Song[] = useMemo(() => {
    if (!library) return [];
    const ids = tab === "liked" ? library.likedIds : tab === "saved" ? library.savedIds : [];
    return ids.map((id) => byId.get(id)).filter((s): s is Song => !!s);
  }, [library, tab, byId]);

  const loading = !library && !error;

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="px-5 pt-4">
        <Text className="text-ink text-3xl font-bold">Миний сан</Text>
      </View>

      <View className="flex-row gap-2 px-5 mt-4">
        {TABS.map((t) => (
          <Pressable
            key={t.key}
            className={`flex-1 rounded-chip py-2.5 items-center border ${
              tab === t.key ? "bg-aqua/15 border-aqua" : "bg-surface border-line"
            }`}
            onPress={() => setTab(t.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: tab === t.key }}
          >
            <Text className={tab === t.key ? "text-aqua text-body" : "text-dim text-body"}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      {tab === "playlists" ? (
        <FlatList
          data={playlists ?? []}
          keyExtractor={(p) => p.id}
          contentContainerClassName="px-5 pt-4 pb-8"
          ItemSeparatorComponent={() => <View className="h-2" />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38e8ce" />}
          ListEmptyComponent={
            error ? (
              <ErrorState message={error} onRetry={load} />
            ) : loading ? (
              <Loading />
            ) : (
              <Empty title="Жагсаалт үүсгээгүй байна." hint="Вэб хувилбар дээрээс жагсаалт үүсгэж болно." />
            )
          }
          renderItem={({ item }) => (
            <View className="bg-surface border border-line rounded-lg px-4 py-3">
              <Text className="text-ink text-body font-semibold">{item.name}</Text>
              <Text className="text-dim text-caption mt-0.5">{item.tracks.length} дуу</Text>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(s) => s.id}
          contentContainerClassName="px-5 pt-4 pb-8"
          ItemSeparatorComponent={() => <View className="h-2" />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38e8ce" />}
          ListEmptyComponent={
            error ? (
              <ErrorState message={error} onRetry={load} />
            ) : loading ? (
              <Loading />
            ) : (
              <Empty
                title={tab === "liked" ? "Дуртай дуу алга." : "Хадгалсан дуу алга."}
                hint="Дуу тоглуулах дэлгэц дээрх ♥ эсвэл ◻ товчоор нэмнэ."
              />
            )
          }
          renderItem={({ item }) => <SongRow song={item} />}
        />
      )}
    </SafeAreaView>
  );
}
