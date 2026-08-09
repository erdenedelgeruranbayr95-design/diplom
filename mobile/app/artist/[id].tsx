import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Cover from "@/components/Cover";
import { Empty, ErrorState, Loading } from "@/components/States";
import SongRow from "@/components/SongRow";
import { fetchArtist, fetchArtistSongs } from "@/lib/api/client";
import type { Artist, Song } from "@/types";

export default function ArtistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [artist, setArtist] = useState<Artist | null>(null);
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      setError(null);
      const [a, s] = await Promise.all([fetchArtist(id), fetchArtistSongs(id)]);
      setArtist(a);
      setSongs(s);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Дуучин ачаалж чадсангүй");
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  /* Дуучны `photoUrl` нь бүгд хоосон (backend-д зураг байхгүй) тул түүний эхний
     дууны коверыг төлөөлөх зураг болгоно — хоосон дөрвөлжингөөс утга учиртай. */
  const portrait = songs?.find((s) => s.coverUrl)?.coverUrl ?? null;

  const header = artist && (
    <View className="pb-4">
      <View className="flex-row items-center">
        <Cover url={artist.photoUrl ?? portrait} title={artist.name} size={88} rounded="lg" />
        <View className="flex-1 ml-4">
          <Text className="text-ink text-2xl font-bold" numberOfLines={2}>
            {artist.name}
          </Text>
          <Text className="text-dim text-note mt-1">{songs?.length ?? 0} дуу</Text>
        </View>
      </View>

      {artist.bio && (
        <View className="mt-5">
          <Text className="text-ink text-heading font-semibold mb-1.5">Танилцуулга</Text>
          <Text className="text-dim text-note leading-5">{artist.bio}</Text>
        </View>
      )}

      {artist.careerInfo && (
        <View className="mt-4">
          <Text className="text-ink text-heading font-semibold mb-1.5">Уран бүтээл</Text>
          <Text className="text-dim text-note leading-5">{artist.careerInfo}</Text>
        </View>
      )}

      <Text className="text-ink text-heading font-semibold mt-6 mb-1">Дуунууд</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="px-5 pt-4 pb-2">
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Буцах">
          <Text className="text-dim text-copy">‹ Буцах</Text>
        </Pressable>
      </View>

      <FlatList
        data={songs ?? []}
        keyExtractor={(s) => s.id}
        ListHeaderComponent={header}
        contentContainerClassName="px-5 pb-8"
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={
          error ? (
            <ErrorState message={error} onRetry={load} />
          ) : !artist ? (
            <Loading />
          ) : (
            <Empty title="Дуу алга." />
          )
        }
        renderItem={({ item }) => <SongRow song={item} />}
      />
    </SafeAreaView>
  );
}
