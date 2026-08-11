import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";

import Cover from "./Cover";
import PagedRail from "./PagedRail";
import type { Song } from "@/types";

/* Дуунуудын хуудаслалттай карусель — нэг хуудсанд ХОЁР дуу.

   Гүйлгэх/сум/хэмжилтийн бүх логик нь `PagedRail`-д — `RecommendationRail` ч
   яг ижил бүрхүүл ашигладаг тул хоёр газарт давхардуулахгүй. Энд зөвхөн картын
   агуулга үлдэнэ. */
export default function SongRail({ title, songs }: { title: string; songs: Song[] }) {
  const router = useRouter();

  return (
    <PagedRail
      title={title}
      items={songs}
      keyOf={(song) => song.id}
      renderItem={(song, cardWidth) => {
        const ready = song.analysisStatus === "READY";
        return (
          <Pressable
            className="active:opacity-70"
            onPress={() => router.push({ pathname: "/player/[id]", params: { id: song.id } })}
            onLongPress={() => router.push({ pathname: "/song/[id]", params: { id: song.id } })}
            accessibilityRole="button"
            accessibilityLabel={`${song.title}, ${song.artist ?? "тодорхойгүй дуучин"}${ready ? "" : ", шинжлэгдээгүй"}`}
            accessibilityHint="Тоглуулах дэлгэц нээнэ. Удаан дарвал дэлгэрэнгүй."
          >
            <Cover url={song.coverThumbUrl ?? song.coverUrl} title={song.title} size={cardWidth} rounded="lg" />
            <Text className="text-ink text-body font-semibold mt-2.5" numberOfLines={1}>
              {song.title}
            </Text>
            <Text className="text-dim text-caption mt-0.5" numberOfLines={1}>
              {song.artist ?? "Тодорхойгүй"}
            </Text>
            {/* Шинжлэгдээгүй дуу чимээгүй тоглоно — үүнийг ЗААВАЛ хэлнэ. */}
            {!ready && <Text className="text-faint text-micro font-mono mt-0.5">{song.analysisStatus}</Text>}
          </Pressable>
        );
      }}
    />
  );
}
