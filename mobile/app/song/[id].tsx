import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Cover from "@/components/Cover";
import { ErrorState, Loading } from "@/components/States";
import { fetchSong } from "@/lib/api/client";
import { beatDensity, formatDuration, licenseLabel } from "@/lib/player/beat-density";
import type { Song } from "@/types";

/* Дууны дэлгэрэнгүй.

   ⚠️ ЭНЭ ДЭЛГЭЦИЙГ ЮУГААР ДҮҮРГЭХ ВЭ — өгөгдлөөс хамаарсан шийдвэр.

   Вэбийн `DetailView` нь тайлбар (`description`) болон үг (`lyrics`) дээр
   тулгуурладаг. Локал сан дээр хэмжихэд:

       description  17/51
       lyrics        0/51      ← бүгд хоосон
       analyzedBpm  50/51
       musicalKey   50/51
       beatCount    50/51

   Тиймээс энэ хувилбар нь ШИНЖИЛГЭЭНИЙ өгөгдлийг гол болголоо. Тэр нь бараг бүрэн
   бөгөөд яг энэ системийн сэдэвтэй холбоотой: цохилт нь чичиргээ болдог тул
   хэрэглэгч «энэ дуу хэдэн удаа чичрэх вэ»-г урьдчилж харна.

   Хоосон талбарт хэсэг ОГТ харуулахгүй — хоосон "Үг" гарчиг нь агуулга байхгүйг
   нуухгүй, зүгээр л дэлгэц эвдэнэ. */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 bg-surface-2 border border-line rounded-chip px-3 py-3 items-center">
      <Text className="text-aqua text-title font-semibold font-mono">{value}</Text>
      <Text className="text-faint text-micro mt-1 text-center">{label}</Text>
    </View>
  );
}

export default function SongDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [song, setSong] = useState<Song | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let alive = true;
    setError(null);
    fetchSong(id)
      .then((d) => alive && setSong(d))
      .catch((e: unknown) => alive && setError(e instanceof Error ? e.message : "Дуу ачаалж чадсангүй"));
    return () => {
      alive = false;
    };
  }, [id]);

  const density = useMemo(
    () => beatDensity(song?.beatTimestamps, song?.duration, 40),
    [song?.beatTimestamps, song?.duration],
  );

  const ready = song?.analysisStatus === "READY";

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="px-5 pt-4">
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Буцах">
          <Text className="text-dim text-copy">‹ Буцах</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="px-5 pb-10">
        {error && <ErrorState message={error} />}
        {!song && !error && <Loading />}

        {song && (
          <>
            <View className="items-center mt-4">
              <Cover url={song.coverUrl} title={song.title} size={200} rounded="card" />
              <Text className="text-ink text-3xl font-bold mt-5 text-center">{song.title}</Text>
              {song.artistId ? (
                <Pressable
                  onPress={() => router.push({ pathname: "/artist/[id]", params: { id: song.artistId! } })}
                  accessibilityRole="button"
                  accessibilityLabel={`${song.artist} дуучны хуудас`}
                >
                  <Text className="text-aqua text-copy mt-1">{song.artist ?? "Тодорхойгүй"} ›</Text>
                </Pressable>
              ) : (
                <Text className="text-dim text-copy mt-1">{song.artist ?? "Тодорхойгүй"}</Text>
              )}

              <Text className="text-faint text-caption font-mono mt-2">
                {[song.releaseYear, formatDuration(song.duration), song.genre].filter(Boolean).join("  ·  ")}
              </Text>
            </View>

            <Pressable
              className="bg-aqua rounded-full py-4 items-center mt-6"
              onPress={() => router.push({ pathname: "/player/[id]", params: { id: song.id } })}
              accessibilityRole="button"
              accessibilityLabel={`${song.title} тоглуулах`}
            >
              <Text className="text-on-aqua text-title font-semibold">▶  Тоглуулах</Text>
            </Pressable>

            {/* ---- Хаптик шинжилгээ — энэ дэлгэцийн гол хэсэг ---- */}
            <Text className="text-ink text-heading font-semibold mt-8 mb-3">Хаптик шинжилгээ</Text>

            {ready ? (
              <>
                <View className="flex-row gap-2">
                  <Stat label="Хэмнэл (BPM)" value={song.analyzedBpm ? String(song.analyzedBpm) : "—"} />
                  <Stat label="Хөгжмийн түлхүүр" value={song.musicalKey ?? "—"} />
                  <Stat label="Цохилтын тоо" value={song.beatCount ? String(song.beatCount) : "—"} />
                </View>

                {density.length > 0 && (
                  <View className="bg-surface border border-line rounded-lg px-4 py-4 mt-2">
                    <Text className="text-ink text-body font-semibold">Цохилтын нягтрал</Text>
                    <Text className="text-faint text-caption mt-1 leading-4">
                      Багана өндөр байх хэсэгт утас олон удаа чичирнэ. Энэ бол бодит хэмжилт —
                      дууны эхнээс төгсгөл хүртэл.
                    </Text>
                    <View
                      className="flex-row items-end mt-3"
                      style={{ height: 56, gap: 2 }}
                      accessibilityRole="image"
                      accessibilityLabel={`Цохилтын нягтралын график, ${song.beatCount} цохилт`}
                    >
                      {density.map((v, i) => (
                        <View
                          key={i}
                          className="flex-1 bg-aqua rounded-bar"
                          style={{ height: `${Math.max(6, v * 100)}%`, opacity: 0.35 + v * 0.65 }}
                        />
                      ))}
                    </View>
                    <View className="flex-row justify-between mt-1.5">
                      <Text className="text-faint text-micro font-mono">0:00</Text>
                      <Text className="text-faint text-micro font-mono">{formatDuration(song.duration)}</Text>
                    </View>
                  </View>
                )}
              </>
            ) : (
              <View className="bg-surface border border-line rounded-lg px-4 py-4">
                <Text className="text-warm text-body">Энэ дуу хараахан шинжлэгдээгүй</Text>
                <Text className="text-faint text-caption mt-1 leading-4">
                  Төлөв: {song.analysisStatus}. Шинжилгээ дуустал дуу тоглох боловч чичиргээ гарахгүй.
                </Text>
                {song.analysisError ? (
                  <Text className="text-faint text-caption mt-2 font-mono">{song.analysisError}</Text>
                ) : null}
              </View>
            )}

            {/* ---- Тайлбар · үг — БАЙВАЛ л харагдана ---- */}
            {song.description ? (
              <>
                <Text className="text-ink text-heading font-semibold mt-8 mb-2">Тайлбар</Text>
                <Text className="text-dim text-body leading-5">{song.description}</Text>
              </>
            ) : null}

            {song.lyrics ? (
              <>
                <Text className="text-ink text-heading font-semibold mt-8 mb-2">Үг</Text>
                <Text className="text-dim text-body leading-6">{song.lyrics}</Text>
              </>
            ) : null}

            {/* ---- Лиценз — хууль зүйн шаардлага, бүх дуунд байдаг ---- */}
            <Text className="text-ink text-heading font-semibold mt-8 mb-2">Лиценз</Text>
            <View className="bg-surface border border-line rounded-lg px-4 py-3">
              <Text className="text-ink text-body">{licenseLabel(song.license)}</Text>
              {song.licenseSrc ? (
                <Text className="text-faint text-caption mt-1 leading-4">{song.licenseSrc}</Text>
              ) : null}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
