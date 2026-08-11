import { useCallback, useRef, useState, type ReactNode } from "react";
import { FlatList, Pressable, Text, View, type LayoutChangeEvent } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

/* Хуудаслалттай хэвтээ карусель — нэг хуудсанд ХОЁР карт, хажуудаа сум.

   ⚠️ `ScrollView` БИШ, `FlatList`. ScrollView нь бүх хуудсаа нэг дор зурдаг тул
   51 дууны ковер зураг зэрэг татагдаж, нүүр хуудас мэдэгдэхүйц удаан болж байв.
   FlatList нь харагдаж буй хуудсыг л зурна (виртуалчлал) — зөвхөн 2-4 зураг.

   Хуруугаараа чирэх нь хэвээр — сум бол зөвхөн НЭМЭЛТ зам. Сонсголын бэрхшээлтэй
   хэрэглэгч чирэх дохиог мэддэг ч, сум нь юу гүйлгэж болохыг НҮДЭЭР харуулна
   (илэрхий байдал), мөн screen reader-т тодорхой товч болж өгнө.

   Энэ бүрэлдэхүүн нь ЗӨВХӨН хуудаслалт/сум/хэмжилтийг хариуцна — картын дотор юу
   байхыг дуудагч тал `renderItem`-ээр өгнө. `SongRail` ба `RecommendationRail`
   хоёр яг ижил гүйлгэх зан төлөвтэй ч карт нь тэс өөр (нэг нь нүцгэн ковер, нөгөө
   нь хүрээтэй + шалтгааны текст) тул зөвхөн бүрхүүлийг л хуваалцана. */

const GAP = 12;
const ARROW = 34;

interface Page<T> {
  key: string;
  items: T[];
}

interface Props<T> {
  title: string;
  /** Гарчгийн доорх тайлбар мөр (сонголтоор). */
  subtitle?: string;
  items: T[];
  keyOf: (item: T) => string;
  perPage?: number;
  /** Сумны босоо ТӨВ картын дээд ирмэгээс. Өгөгдөөгүй бол картын гол.
   *
   *  Карт болгонд ковер зураг ижил байрлалд байдаггүй: `SongRail`-д зураг нь
   *  картын дээд ирмэгээс шууд эхэлдэг ч `RecommendationRail`-д хүрээ/padding-ийн
   *  дотор сууна. Сум зургийн голд таарахгүй бол хазайж харагдана. */
  arrowCenter?: (cardWidth: number) => number;
  renderItem: (item: T, cardWidth: number) => ReactNode;
}

export default function PagedRail<T>({
  title,
  subtitle,
  items,
  keyOf,
  perPage = 2,
  arrowCenter,
  renderItem,
}: Props<T>) {
  const listRef = useRef<FlatList<Page<T>>>(null);
  const [width, setWidth] = useState(0);
  const [page, setPage] = useState(0);

  const pages: Page<T>[] = [];
  for (let i = 0; i < items.length; i += perPage) {
    pages.push({ key: String(i), items: items.slice(i, i + perPage) });
  }

  const cardWidth = width > 0 ? (width - GAP * (perPage - 1)) / perPage : 0;

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(pages.length - 1, next));
    setPage(clamped);
    listRef.current?.scrollToOffset({ offset: clamped * width, animated: true });
  };

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  /* `getItemLayout` — FlatList хуудасны хэмжээг мэдэж байвал хэмжилт хийхгүй,
     `scrollToOffset` шууд зөв байрлана. */
  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({ length: width, offset: width * index, index }),
    [width],
  );

  if (items.length === 0) return null;
  const multi = pages.length > 1;
  const top = (arrowCenter ? arrowCenter(cardWidth) : cardWidth / 2) - ARROW / 2;

  const Arrow = ({ dir }: { dir: -1 | 1 }) => {
    const disabled = dir === -1 ? page === 0 : page >= pages.length - 1;
    if (disabled) return null; // хэрэггүй сум зураг халхлахгүй
    return (
      <Pressable
        className="absolute rounded-full items-center justify-center bg-bg/80 border border-line-2 active:bg-surface"
        style={{
          width: ARROW,
          height: ARROW,
          top,
          [dir === -1 ? "left" : "right"]: -6,
          zIndex: 10,
        }}
        onPress={() => goTo(page + dir)}
        accessibilityRole="button"
        accessibilityLabel={dir === -1 ? `${title}: өмнөх` : `${title}: дараах`}
      >
        <Ionicons name={dir === -1 ? "chevron-back" : "chevron-forward"} size={18} color="#f2f5f4" />
      </Pressable>
    );
  };

  return (
    <View className="mt-8">
      <View className="flex-row items-center justify-between">
        <Text className="text-ink text-heading font-semibold flex-1" numberOfLines={1}>
          {title}
        </Text>
        {multi && (
          <Text className="text-faint text-micro font-mono ml-3">
            {page + 1}/{pages.length}
          </Text>
        )}
      </View>
      {subtitle ? <Text className="text-faint text-caption mt-1">{subtitle}</Text> : null}

      <View className="mt-3" onLayout={onLayout}>
        <FlatList
          ref={listRef}
          data={pages}
          keyExtractor={(p) => p.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          getItemLayout={width > 0 ? getItemLayout : undefined}
          initialNumToRender={1}
          windowSize={3}
          removeClippedSubviews
          accessibilityRole="list"
          onMomentumScrollEnd={(e) => {
            if (width > 0) setPage(Math.round(e.nativeEvent.contentOffset.x / width));
          }}
          renderItem={({ item }) => (
            <View style={{ width, flexDirection: "row", gap: GAP }}>
              {item.items.map((entry) => (
                <View key={keyOf(entry)} style={{ width: cardWidth }}>
                  {cardWidth > 0 && renderItem(entry, cardWidth)}
                </View>
              ))}
            </View>
          )}
        />

        {multi && cardWidth > 0 && (
          <>
            <Arrow dir={-1} />
            <Arrow dir={1} />
          </>
        )}
      </View>
    </View>
  );
}
