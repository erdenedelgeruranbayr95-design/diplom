import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, View } from "react-native";

import { addPlaylistTrack, createPlaylist, fetchPlaylists } from "@/lib/api/client";
import type { Playlist } from "@/types";
import PromptModal from "./PromptModal";

/* Дууг жагсаалтад нэмэх сонгогч.

   Жагсаалтуудыг нээх бүрд дахин уншина — өөр дэлгэцээс шинэ жагсаалт үүсгэсэн
   байж болно. Дотроосоо шинэ жагсаалт үүсгэх боломжтой: хэрэглэгчийг "эхлээд
   Миний сан руу очиж үүсгэ" гэж явуулах нь урсгалыг тасалдаг. */
interface Props {
  visible: boolean;
  songId: string | null;
  onClose: () => void;
}

export default function AddToPlaylistModal({ visible, songId, onClose }: Props) {
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    setDone(null);
    setError(null);
    setPlaylists(null);
    fetchPlaylists()
      .then(setPlaylists)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Ачаалж чадсангүй"));
  }, [visible]);

  const add = useCallback(
    async (playlist: Playlist) => {
      if (!songId) return;
      setBusyId(playlist.id);
      setError(null);
      try {
        await addPlaylistTrack(playlist.id, songId);
        setDone(playlist.name);
        // Тухайн жагсаалтын тоог шууд нэмж харуулна (дахин татахгүй).
        setPlaylists(
          (prev) =>
            prev?.map((p) =>
              p.id === playlist.id
                ? { ...p, tracks: [...p.tracks, { id: songId, songId, position: p.tracks.length }] }
                : p,
            ) ?? null,
        );
      } catch (e) {
        setError(e instanceof Error ? e.message : "Нэмж чадсангүй");
      } finally {
        setBusyId(null);
      }
    },
    [songId],
  );

  const onCreate = useCallback(
    async (name: string) => {
      setCreating(false);
      try {
        const created = await createPlaylist(name);
        setPlaylists((prev) => [created, ...(prev ?? [])]);
        await add(created);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Жагсаалт үүсгэж чадсангүй");
      }
    },
    [add],
  );

  return (
    <>
      <Modal visible={visible && !creating} transparent animationType="slide" onRequestClose={onClose}>
        <Pressable className="flex-1 bg-black/70 justify-end" onPress={onClose}>
          <Pressable className="bg-surface-2 border-t border-line-2 rounded-t-panel p-5 max-h-[70%]" onPress={() => {}}>
            <Text className="text-ink text-heading font-semibold mb-1">Жагсаалтад нэмэх</Text>
            {done && <Text className="text-aqua text-note mb-2">✓ «{done}»-д нэмэгдлээ</Text>}
            {error && <Text className="text-danger text-note mb-2">{error}</Text>}

            <Pressable
              className="bg-aqua/10 border border-aqua rounded-lg px-4 py-3 mt-2 mb-3 items-center"
              onPress={() => setCreating(true)}
              accessibilityRole="button"
              accessibilityLabel="Шинэ жагсаалт үүсгээд нэмэх"
            >
              <Text className="text-aqua text-body font-semibold">+ Шинэ жагсаалт</Text>
            </Pressable>

            {!playlists && !error && <ActivityIndicator color="#38e8ce" className="my-4" />}
            {playlists?.length === 0 && (
              <Text className="text-dim text-note py-2">Жагсаалт алга — дээрээс үүсгэнэ үү.</Text>
            )}

            <ScrollView>
              {playlists?.map((p) => (
                <Pressable
                  key={p.id}
                  className="bg-surface border border-line rounded-lg px-4 py-3 mb-2 flex-row items-center active:bg-surface-2"
                  onPress={() => add(p)}
                  disabled={busyId === p.id}
                  accessibilityRole="button"
                  accessibilityLabel={`${p.name} жагсаалтад нэмэх`}
                >
                  <View className="flex-1">
                    <Text className="text-ink text-body font-semibold" numberOfLines={1}>
                      {p.name}
                    </Text>
                    <Text className="text-dim text-caption mt-0.5">{p.tracks.length} дуу</Text>
                  </View>
                  {busyId === p.id ? (
                    <ActivityIndicator size="small" color="#768583" />
                  ) : (
                    <Text className="text-aqua text-body ml-3">+</Text>
                  )}
                </Pressable>
              ))}
            </ScrollView>

            <Pressable
              className="rounded-full py-3 items-center border border-line-2 mt-2"
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Хаах"
            >
              <Text className="text-dim text-body">Хаах</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      <PromptModal
        visible={creating}
        title="Шинэ жагсаалт"
        placeholder="Жагсаалтын нэр"
        confirmLabel="Үүсгэх"
        onCancel={() => setCreating(false)}
        onSubmit={onCreate}
      />
    </>
  );
}
