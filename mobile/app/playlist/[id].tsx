import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import ConfirmModal from "@/components/ConfirmModal";
import PromptModal from "@/components/PromptModal";
import { Empty, ErrorState, Loading } from "@/components/States";
import SongRow from "@/components/SongRow";
import { deletePlaylist, fetchPlaylists, fetchSongs, removePlaylistTrack, renamePlaylist } from "@/lib/api/client";
import type { Playlist, Song } from "@/types";

export default function PlaylistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [removingTrack, setRemovingTrack] = useState<Song | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      setError(null);
      /* Backend-д "нэг жагсаалт авах" endpoint байхгүй — бүгдийг аваад шүүнэ.
         Хэрэглэгчийн жагсаалт цөөхөн тул нэмэлт зардал мэдэгдэхгүй. */
      const [all, pls] = await Promise.all([fetchSongs(), fetchPlaylists()]);
      setSongs(all);
      setPlaylist(pls.find((p) => p.id === id) ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ачаалж чадсангүй");
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const tracks = useMemo(() => {
    if (!playlist || !songs) return [];
    const byId = new Map(songs.map((s) => [s.id, s]));
    return playlist.tracks
      .slice()
      .sort((a, b) => a.position - b.position)
      .map((t) => byId.get(t.songId))
      .filter((s): s is Song => !!s);
  }, [playlist, songs]);

  const onRename = useCallback(
    async (name: string) => {
      if (!playlist) return;
      setRenaming(false);
      try {
        await renamePlaylist(playlist.id, name);
        setPlaylist((p) => (p ? { ...p, name } : p));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Нэр солиж чадсангүй");
      }
    },
    [playlist],
  );

  const onDelete = useCallback(async () => {
    if (!playlist) return;
    setDeleting(false);
    try {
      await deletePlaylist(playlist.id);
      router.back();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Устгаж чадсангүй");
    }
  }, [playlist, router]);

  const onRemoveTrack = useCallback(async () => {
    const song = removingTrack;
    if (!playlist || !song) return;
    setRemovingTrack(null);
    // Шууд хасаж харуулна; алдаа гарвал жинхэнэ төлөвийг сэргээнэ.
    setPlaylist((p) => (p ? { ...p, tracks: p.tracks.filter((t) => t.songId !== song.id) } : p));
    try {
      await removePlaylistTrack(playlist.id, song.id);
    } catch {
      load();
    }
  }, [playlist, removingTrack, load]);

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="px-5 pt-4 flex-row items-center justify-between">
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Буцах">
          <Text className="text-dim text-copy">‹ Буцах</Text>
        </Pressable>
        {playlist && (
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setRenaming(true)}
              accessibilityRole="button"
              accessibilityLabel="Нэр солих"
            >
              <Text className="text-dim text-copy">Нэр солих</Text>
            </Pressable>
            <Pressable
              onPress={() => setDeleting(true)}
              accessibilityRole="button"
              accessibilityLabel="Жагсаалт устгах"
            >
              <Text className="text-danger text-copy">Устгах</Text>
            </Pressable>
          </View>
        )}
      </View>

      {playlist && (
        <View className="px-5 pt-3 pb-2">
          <Text className="text-ink text-3xl font-bold" numberOfLines={2}>
            {playlist.name}
          </Text>
          <Text className="text-dim text-note mt-1">{tracks.length} дуу</Text>
        </View>
      )}

      <FlatList
        data={tracks}
        keyExtractor={(s) => s.id}
        contentContainerClassName="px-5 pb-8"
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={
          error ? (
            <ErrorState message={error} onRetry={load} />
          ) : !playlist ? (
            <Loading />
          ) : (
            <Empty
              title="Дуу нэмээгүй байна."
              hint="Дуу тоглуулах дэлгэц дээрх «Жагсаалтад нэмэх» товчоор нэмнэ."
            />
          )
        }
        renderItem={({ item }) => (
          <View>
            <SongRow song={item} />
            <Pressable
              className="absolute right-0 top-0 bottom-0 justify-center pr-4 pl-6"
              onPress={() => setRemovingTrack(item)}
              accessibilityRole="button"
              accessibilityLabel={`${item.title}-г жагсаалтаас хасах`}
            >
              <Text className="text-danger text-body">✕</Text>
            </Pressable>
          </View>
        )}
      />

      <PromptModal
        visible={renaming}
        title="Жагсаалтын нэр"
        initialValue={playlist?.name ?? ""}
        placeholder="Нэр"
        onCancel={() => setRenaming(false)}
        onSubmit={onRename}
      />

      <ConfirmModal
        visible={deleting}
        title="Жагсаалт устгах уу?"
        message={playlist?.name}
        confirmLabel="Устгах"
        destructive
        onCancel={() => setDeleting(false)}
        onConfirm={onDelete}
      />

      <ConfirmModal
        visible={!!removingTrack}
        title="Жагсаалтаас хасах уу?"
        message={removingTrack?.title}
        confirmLabel="Хасах"
        destructive
        onCancel={() => setRemovingTrack(null)}
        onConfirm={onRemoveTrack}
      />
    </SafeAreaView>
  );
}
