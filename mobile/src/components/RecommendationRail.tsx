import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import Cover from "./Cover";
import type { Recommendation } from "@/lib/player/recommendations";
import type { Song } from "@/types";

/* Санал болгосон дуунуудын хэвтээ эгнээ.

   Карт бүр ЯАГААД санал болгогдсоныг бичнэ (`reasons`) — оноо нь хэрэглэгчийн
   бодит сонсголын өгөгдлөөс гарсан тул шалтгааныг ил хэлж болно. Тайлбаргүй
   "AI санал" гэдэг нь хэрэглэгчид итгэл төрүүлэхгүй. */
export default function RecommendationRail({ items }: { items: Recommendation<Song>[] }) {
  const router = useRouter();
  if (items.length === 0) return null;

  return (
    <View className="mt-8">
      <Text className="text-ink text-heading font-semibold mb-1">Танд санал болгож байна</Text>
      <Text className="text-faint text-caption mb-3">Таны сонссон түүхэнд тулгуурлав</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 pr-5"
        accessibilityRole="list"
      >
        {items.map((rec) => (
          <Pressable
            key={rec.track.id}
            className="w-44 bg-surface border border-aqua/40 rounded-lg px-4 py-3 active:bg-surface-2"
            onPress={() => router.push({ pathname: "/player/[id]", params: { id: rec.track.id } })}
            accessibilityRole="button"
            accessibilityLabel={`${rec.track.title}. ${rec.reasons[0] ?? ""}`}
          >
            <Cover url={rec.track.coverUrl} title={rec.track.title} size={144} rounded="lg" />
            <Text className="text-aqua text-micro font-mono mt-2.5 mb-1">САНАЛ</Text>
            <Text className="text-ink text-body font-semibold" numberOfLines={1}>
              {rec.track.title}
            </Text>
            <Text className="text-dim text-caption mt-0.5" numberOfLines={1}>
              {rec.track.artist ?? "Тодорхойгүй"}
            </Text>
            {rec.reasons[0] && (
              <Text className="text-aqua/80 text-caption mt-2 leading-4" numberOfLines={3}>
                {rec.reasons[0]}
              </Text>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
