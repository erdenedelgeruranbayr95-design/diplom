import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

import Cover from "./Cover";
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
      /* Удаан дарвал дэлгэрэнгүй — жагсаалтаас шууд хүрэх хоёр дахь зам.
         Дарахад тоглуулах нь ҮНДСЭН үйлдэл тул түүнийг өөрчлөөгүй. */
      onLongPress={() => router.push({ pathname: "/song/[id]", params: { id: song.id } })}
      accessibilityRole="button"
      accessibilityLabel={`${song.title}, ${song.artist ?? "тодорхойгүй дуучин"}${ready ? ", чичиргээтэй" : ""}`}
      accessibilityHint="Тоглуулах дэлгэц нээнэ. Удаан дарвал дэлгэрэнгүй."
    >
      <Cover url={song.coverThumbUrl ?? song.coverUrl} title={song.title} size={44} />
      <View className="flex-1 ml-3">
        <Text className="text-ink text-body font-semibold" numberOfLines={1}>
          {song.title}
        </Text>
        {/* Төрөл нь `null` байж болно (Jamendo импорт) — тэр үед салгагч цэгийг
            ч бас хасна, эс бөгөөс "Дуучин · " гэж дүүжлэгдсэн харагдана. */}
        <Text className="text-dim text-caption mt-0.5" numberOfLines={1}>
          {[song.artist ?? "Тодорхойгүй", song.genre].filter(Boolean).join(" · ")}
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
