import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import Cover from "./Cover";
import type { Artist, Song } from "@/types";

/* Дуучдын хэвтээ эгнээ — вэбийн "Алдартай дуучид"-ийн эквивалент.

   Jamendo-гоос импортолсон дуучид `photoUrl`-тай ирдэг; гараар seed хийсэн
   монгол дуучид зураггүй. Зураггүй бол түүний дууны коверыг төлөөлөх зураг
   болгоно. Зураг ч, дуу ч байхгүй бол `Cover` нэрийн эхний үсгийг харуулна. */
export default function ArtistRail({ artists, songs }: { artists: Artist[]; songs: Song[] }) {
  const router = useRouter();
  if (artists.length === 0) return null;

  const coverFor = (artistId: string) => songs.find((s) => s.artistId === artistId && s.coverUrl)?.coverUrl ?? null;

  return (
    <View className="mt-8">
      <Text className="text-ink text-heading font-semibold mb-3">Алдартай дуучид</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-4 pr-5">
        {artists.map((a) => (
          <Pressable
            key={a.id}
            className="w-24 items-center"
            onPress={() => router.push({ pathname: "/artist/[id]", params: { id: a.id } })}
            accessibilityRole="button"
            accessibilityLabel={`${a.name}, ${a._count?.songs ?? 0} дуу`}
          >
            {/* Дугуй зураг — вэб хувилбартай ижил хэлбэр. */}
            <View className="rounded-full overflow-hidden">
              <Cover url={a.photoUrl ?? coverFor(a.id)} title={a.name} size={88} />
            </View>
            <Text className="text-ink text-caption font-semibold mt-2 text-center" numberOfLines={1}>
              {a.name}
            </Text>
            <Text className="text-faint text-micro font-mono">{a._count?.songs ?? 0} дуу</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
