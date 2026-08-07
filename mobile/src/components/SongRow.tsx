import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

import type { Song } from "@/types";

/* Дууны мөр — Нүүр болон Миний сан хоёулаа ижил харагдана.

   `analysisStatus` шошго нь энэ аппын хувьд ЧУХАЛ: зөвхөн `READY` дуу
   `beatTimestamps`-тай тул чичиргээ өгнө. Бусад нь чимээгүй тоглох тул хэрэглэгч
   урьдчилж мэдэх ёстой — эс бөгөөс апп эвдэрсэн гэж бодно. */
export default function SongRow({ song }: { song: Song }) {
  const router = useRouter();
  const ready = song.analysisStatus === "READY";

  return (
    <Pressable
      className="bg-surface border border-line rounded-lg px-4 py-3 flex-row items-center active:bg-surface-2"
      onPress={() => router.push({ pathname: "/player/[id]", params: { id: song.id } })}
      accessibilityRole="button"
      accessibilityLabel={`${song.title}, ${song.artist ?? "тодорхойгүй дуучин"}${ready ? ", чичиргээтэй" : ""}`}
      accessibilityHint="Тоглуулах дэлгэц нээнэ"
    >
      <View className="flex-1">
        <Text className="text-ink text-body font-semibold" numberOfLines={1}>
          {song.title}
        </Text>
        <Text className="text-dim text-caption mt-0.5" numberOfLines={1}>
          {song.artist ?? "Тодорхойгүй"} · {song.genre}
        </Text>
      </View>
      {ready ? (
        <Text className="text-aqua text-micro font-mono ml-3">HAPTIC</Text>
      ) : (
        <Text className="text-faint text-micro font-mono ml-3">{song.analysisStatus}</Text>
      )}
    </Pressable>
  );
}
