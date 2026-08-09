import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import ConfirmModal from "@/components/ConfirmModal";
import PromptModal from "@/components/PromptModal";
import { Empty, ErrorState, Loading } from "@/components/States";
import SongRow from "@/components/SongRow";
import {
  createPlaylist,
  deleteHistory,
  fetchHistory,
  fetchLibrary,
  fetchPlaylists,
  fetchSongs,
} from "@/lib/api/client";
import type { HistoryRow, LibraryState, Playlist, Song } from "@/types";

type Tab = "liked" | "saved" | "playlists" | "history";

const TABS: { key: Tab; label: string }[] = [
  { key: "liked", label: "Дуртай" },
  { key: "saved", label: "Хадгалсан" },
  { key: "playlists", label: "Жагсаалт" },
  { key: "history", label: "Түүх" },
];

function formatPlayed(iso: string, durationMs: number | null): string {
  const d = new Date(iso);
  const date = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  if (!durationMs) return date;
  const sec = Math.round(durationMs / 1000);
  const dur = sec < 60 ? `${sec}с` : `${Math.floor(sec / 60)}м ${sec % 60}с`;
  return `${date} · ${dur}`;
}

export default function LibraryScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("liked");
  const [library, setLibrary] = useState<LibraryState | null>(null);
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
  const [history, setHistory] = useState<HistoryRow[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [removingHistory, setRemovingHistory] = useState<HistoryRow | null>(null);

  const onCreate = useCallback(async (name: string) => {
    setCreating(false);
    try {
      const created = await createPlaylist(name);
      setPlaylists((prev) => [created, ...(prev ?? [])]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Жагсаалт үүсгэж чадсангүй");
    }
  }, []);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const [lib, all, pls, hist] = await Promise.all([
        fetchLibrary(),
        fetchSongs(),
        fetchPlaylists(),
        fetchHistory(),
      ]);
      setLibrary(lib);
      setSongs(all);
      setPlaylists(pls);
      setHistory(hist.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ачаалж чадсангүй");
    }
  }, []);

  /* Мөрийг ЖАГСААЛТААС ШУУД хасна (дахин татахгүй) — сүлжээ удаан үед мөр
     хэсэг зуур үлдэж, хэрэглэгч дахин дарж 404 авахаас сэргийлнэ. */
  const removeRow = useCallback(async () => {
    const row = removingHistory;
    if (!row) return;
    setRemovingHistory(null);
    setHistory((prev) => prev?.filter((h) => h.id !== row.id) ?? null);
    try {
      await deleteHistory(row.id);
    } catch {
      load(); // амжилтгүй бол жинхэнэ төлөвийг сэргээнэ
    }
  }, [removingHistory, load]);

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
            {/* 4 чип нарийн дэлгэцэд багтахын тулд жижиг хэмжээ + мөр таслахгүй. */}
            <Text
              className={tab === t.key ? "text-aqua text-caption" : "text-dim text-caption"}
              numberOfLines={1}
            >
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {tab === "history" ? (
        <FlatList
          data={history ?? []}
          keyExtractor={(h) => h.id}
          contentContainerClassName="px-5 pt-4 pb-8"
          ItemSeparatorComponent={() => <View className="h-2" />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38e8ce" />}
          ListEmptyComponent={
            error ? (
              <ErrorState message={error} onRetry={load} />
            ) : loading ? (
              <Loading />
            ) : (
              <Empty title="Сонссон түүх алга." hint="Дуу 5 секундээс дээш сонсоход энд бүртгэгдэнэ." />
            )
          }
          renderItem={({ item }) => (
            <Pressable
              className="bg-surface border border-line rounded-lg px-4 py-3 flex-row items-center active:bg-surface-2"
              onPress={() => router.push({ pathname: "/player/[id]", params: { id: item.songId } })}
              onLongPress={() => setRemovingHistory(item)}
              accessibilityRole="button"
              accessibilityLabel={`${item.song.title} дахин тоглуулах`}
              accessibilityHint="Удаан дарвал түүхээс хасна"
            >
              <View className="flex-1">
                <Text className="text-ink text-body font-semibold" numberOfLines={1}>
                  {item.song.title}
                </Text>
                <Text className="text-dim text-caption mt-0.5" numberOfLines={1}>
                  {item.song.artist ?? "Тодорхойгүй"} · {formatPlayed(item.playedAt, item.durationMs)}
                </Text>
              </View>
              {/* Чичиргээтэй сонссон эсэх — энэ аппын гол хэмжүүр. */}
              {item.vibrations && <Text className="text-aqua text-micro font-mono ml-3">VIB</Text>}
            </Pressable>
          )}
        />
      ) : tab === "playlists" ? (
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
              <Empty title="Жагсаалт үүсгээгүй байна." hint="Дээрх товчоор шинэ жагсаалт үүсгэнэ." />
            )
          }
          ListHeaderComponent={
            <Pressable
              className="bg-aqua/10 border border-aqua rounded-lg px-4 py-3 mb-2 items-center"
              onPress={() => setCreating(true)}
              accessibilityRole="button"
              accessibilityLabel="Шинэ жагсаалт үүсгэх"
            >
              <Text className="text-aqua text-body font-semibold">+ Шинэ жагсаалт</Text>
            </Pressable>
          }
          renderItem={({ item }) => (
            <Pressable
              className="bg-surface border border-line rounded-lg px-4 py-3 active:bg-surface-2"
              onPress={() => router.push({ pathname: "/playlist/[id]", params: { id: item.id } })}
              accessibilityRole="button"
              accessibilityLabel={`${item.name}, ${item.tracks.length} дуу`}
            >
              <Text className="text-ink text-body font-semibold">{item.name}</Text>
              <Text className="text-dim text-caption mt-0.5">{item.tracks.length} дуу</Text>
            </Pressable>
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

      <PromptModal
        visible={creating}
        title="Шинэ жагсаалт"
        placeholder="Жагсаалтын нэр"
        confirmLabel="Үүсгэх"
        onCancel={() => setCreating(false)}
        onSubmit={onCreate}
      />

      <ConfirmModal
        visible={!!removingHistory}
        title="Түүхээс хасах уу?"
        message={removingHistory?.song.title}
        confirmLabel="Хасах"
        destructive
        onCancel={() => setRemovingHistory(null)}
        onConfirm={removeRow}
      />
    </SafeAreaView>
  );
}
