import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";

import Cover from "./Cover";
import PagedRail from "./PagedRail";
import type { Recommendation } from "@/lib/player/recommendations";
import type { Song } from "@/types";

/* Санал болгосон дуунуудын хэвтээ эгнээ.

   Карт бүр ЯАГААД санал болгогдсоныг бичнэ (`reasons`) — оноо нь хэрэглэгчийн
   бодит сонсголын өгөгдлөөс гарсан тул шалтгааныг ил хэлж болно. Тайлбаргүй
   "AI санал" гэдэг нь хэрэглэгчид итгэл төрүүлэхгүй.

   `SongRail`-тай ижил хуудаслалт (`PagedRail`) — нэг хуудсанд 2 карт, хажуудаа
   сум. Урьд нь чөлөөт гүйлгээтэй байсан тул хэрэглэгч цаана нь өөр санал байгааг
   МЭДЭХГҮЙ өнгөрөх магадлалтай байв; одоо сум ба `1/4` тоолуур нь үлдсэнийг
   нүдээр хэлнэ. */

/* Картын хүрээ дотор ковер нь px-4 (16) / py-3 (12)-ийн дотор сууна. Сумыг
   зургийн голд таарууллаа — эс бөгөөс текстийн түвшинд хазайж харагдана. */
const PAD_X = 16;
const PAD_TOP = 12;

export default function RecommendationRail({ items }: { items: Recommendation<Song>[] }) {
  const router = useRouter();

  return (
    <PagedRail
      title="Танд санал болгож байна"
      subtitle="Таны сонссон түүхэнд тулгуурлав"
      items={items}
      keyOf={(rec) => rec.track.id}
      arrowCenter={(cardWidth) => PAD_TOP + (cardWidth - PAD_X * 2) / 2}
      renderItem={(rec, cardWidth) => (
        <Pressable
          className="bg-surface border border-aqua/40 rounded-lg px-4 py-3 active:bg-surface-2"
          onPress={() => router.push({ pathname: "/player/[id]", params: { id: rec.track.id } })}
          accessibilityRole="button"
          accessibilityLabel={`${rec.track.title}. ${rec.reasons[0] ?? ""}`}
        >
          <Cover
            url={rec.track.coverThumbUrl ?? rec.track.coverUrl}
            title={rec.track.title}
            size={cardWidth - PAD_X * 2}
            rounded="lg"
          />
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
      )}
    />
  );
}
