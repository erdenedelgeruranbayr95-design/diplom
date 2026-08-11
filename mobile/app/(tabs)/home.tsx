import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useFocusEffect } from "expo-router";

import ArtistRail from "@/components/ArtistRail";
import Logo from "@/components/Logo";
import SongRail from "@/components/SongRail";
import RecommendationRail from "@/components/RecommendationRail";
import { Empty, ErrorState, Loading } from "@/components/States";
import SongRow from "@/components/SongRow";
import { fetchArtists, fetchHistory, fetchLibrary, fetchSongs, fetchStats } from "@/lib/api/client";
import { cached, relativeTime } from "@/lib/api/offline";
import { PhoneDevice } from "@/lib/haptics/PhoneDevice";
import { TAB_SAFE_PB } from "@/lib/layout";
import { genreLabel, groupByGenre } from "@/lib/player/catalog-groups";
import { scoreRecommendations } from "@/lib/player/recommendations";
import type { Artist, LibraryState, ListeningStats, Song } from "@/types";

/* Чичиргээний эрчмийн сорил — Android-ийн VibrationEffect.createWaveform нь
   амплитуд 0-255 дэмждэг тул эдгээр товч тус бүр ТОДОРХОЙ ЯЛГААТАЙ мэдрэгдэх ёстой.
   Вэб хувилбар дээр (navigator.vibrate) гурвуулаа ЯГ ИЖИЛ хүчтэй чичирдэг —
   энэ бол native апп хийсний гол ялгаа. */
const LEVELS = [
  { label: "Сул", strength: 0.2 },
  { label: "Дунд", strength: 0.55 },
  { label: "Хүчтэй", strength: 1 },
];

export default function HomeScreen() {
  const [tracks, setTracks] = useState<Song[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  /** Хайлтын талбар нээлттэй эсэх — дүрс товчоор сэлгэнэ. */
  const [searchOpen, setSearchOpen] = useState(false);
  const [stats, setStats] = useState<ListeningStats | null>(null);
  const [library, setLibrary] = useState<LibraryState | null>(null);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  /** Кэшээс үзүүлж байгаа бол — хадгалагдсан хугацаа (ms), эс бөгөөс `null`. */
  const [offline, setOffline] = useState<number | null>(null);

  // Төхөөрөмжийн чичиргээ нь дэлгэц дахин зурагдах бүрд шинээр үүсэх шаардлагагүй.
  const device = useMemo(() => new PhoneDevice(), []);

  const load = useCallback(async () => {
    try {
      setError(null);
      /* Дуунуудыг ЗААВАЛ авна; санал болголтод хэрэгтэй гурав нь заавал биш —
         аль нэг нь унасан ч жагсаалт харагдах ёстой (санал болголт л алга болно).

         Дуу болон дуучид нь КЭШЛЭГДЭНЭ: сүлжээ тасрахад хоосон дэлгэц биш,
         хамгийн сүүлд харсан сан харагдана. Хувийн өгөгдөл (статистик, дуртай,
         түүх) кэшлэгдэхгүй — тэдгээр нь байнга өөрчлөгддөг бөгөөд хуучин утга нь
         хэрэглэгчийг эндүүрүүлнэ. */
      const [songsRes, stats, lib, hist, artistsRes] = await Promise.all([
        cached("songs", fetchSongs),
        fetchStats().catch(() => null),
        fetchLibrary().catch(() => null),
        fetchHistory(1, 10).catch(() => null),
        cached("artists", fetchArtists).catch(() => null),
      ]);
      setTracks(songsRes.data);
      setStats(stats);
      setLibrary(lib);
      setRecentIds(hist ? hist.items.map((h) => h.songId) : []);
      setArtists(artistsRes?.data ?? []);
      setOffline(songsRes.fromCache ? songsRes.cachedAt : null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Дуунуудыг ачаалж чадсангүй");
    }
  }, []);

  useEffect(() => {
    load();
    return () => device.stop();
  }, [load, device]);

  /* Дуу сонссоны дараа буцаж ирэхэд санал болголт шинэчлэгдэх ёстой — статистик
     өөрчлөгдсөн байна. */
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const recommendations = useMemo(() => {
    if (!tracks) return [];
    const byId = new Map(tracks.map((s) => [s.id, s]));
    return scoreRecommendations(tracks, {
      stats,
      likedIds: library?.likedIds ?? [],
      savedIds: library?.savedIds ?? [],
      recentTracks: recentIds.map((id) => byId.get(id)).filter((s): s is Song => !!s),
      limit: 8,
    });
  }, [tracks, stats, library, recentIds]);

  const visible = useMemo(() => {
    if (!tracks) return [];
    const q = query.trim().toLowerCase();
    if (!q) return tracks;
    /* Бүх талбар `null` байж болно — Jamendo-гоос импортолсон дуунуудын төрөл
       хоосон ирдэг. `null.toLowerCase()` нь аппыг унагаана. */
    return tracks.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        (s.artist ?? "").toLowerCase().includes(q) ||
        (s.genre ?? "").toLowerCase().includes(q) ||
        /* Гарчигт харагдах нэрээр ч олдох ёстой: эгнээ дээр «Рок» гэж бичсэн
           байхад хэрэглэгч тэрийг хайхад «Rock» гэсэн эх утга таарахгүй байв. */
        (s.genre ? genreLabel(s.genre).toLowerCase().includes(q) : false),
    );
  }, [tracks, query]);

  /* Хайлт идэвхтэй эсэх. Хайж байх үед бүлгүүдийг НУУНА — хэрэглэгч тодорхой
     дуу хайж байгаа тул илэрцээ шууд, эгнээ гүйлгэлгүйгээр харах ёстой. */
  const searching = query.trim().length > 0;

  /* Хайлтгүй үед 51 дууг нэг босоо жагсаалтаар харуулбал дэлгэц хэт урт болно —
     төрлөөр нь хэвтээ эгнээ болгоно. */
  const groups = useMemo(() => (tracks && !searching ? groupByGenre(tracks) : []), [tracks, searching]);

  /* Толгой хэсгийг `ListHeaderComponent`-ээр өгнө.

     ⚠️ Өмнө нь энэ бүхэн `ScrollView` дотор байж, дууны жагсаалт нь
     `<FlatList scrollEnabled={false}>` байсан — RN-д энэ бол эсрэг хэв маяг:
     виртуалчлал бүрэн унтарч бүх мөр зэрэг зурагддаг, RN "VirtualizedLists should
     never be nested inside plain ScrollViews" гэж анхааруулдаг. Одоо ганц FlatList. */
  const header = (
    <View>
      {/* Мэндчилгээний оронд лого. Хэрэглэгчийн нэр Профайл дэлгэцэд байгаа тул
          энд давтах шаардлагагүй, харин таних тэмдэг вэбтэй нэгдмэл болно. */}
      {/* Лого зүүнд, хайлтын дүрс баруунд. Хайлтын талбар байнга нээлттэй байх
          нь дэлгэцийн үнэтэй хэсгийг эзэлдэг тул зөвхөн дарахад гарна. */}
      <View className="pt-4 flex-row items-center justify-between">
        <Logo />
        <Pressable
          className={`w-11 h-11 rounded-full items-center justify-center border ${
            searchOpen ? "bg-aqua/15 border-aqua" : "bg-surface-2 border-line-2 active:bg-surface"
          }`}
          onPress={() => {
            const next = !searchOpen;
            setSearchOpen(next);
            if (!next) setQuery(""); // хаахад илэрц үлдээхгүй
          }}
          accessibilityRole="button"
          accessibilityState={{ expanded: searchOpen }}
          accessibilityLabel={searchOpen ? "Хайлтыг хаах" : "Дуу хайх"}
        >
          <Ionicons name={searchOpen ? "close" : "search"} size={20} color={searchOpen ? "#38e8ce" : "#f2f5f4"} />
        </Pressable>
      </View>

      {searchOpen && (
        <TextInput
          className="bg-surface border border-line-field rounded-sm text-ink text-copy px-4 py-3 mt-4"
          placeholder="Дуу, дуучин, төрлөөр хайх"
          placeholderTextColor="#768583"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoFocus
          accessibilityLabel="Дуу хайх"
          clearButtonMode="while-editing"
        />
      )}

      {/* Офлайн — хуучин өгөгдлийг шинэ мэт харуулах нь болохгүй тул ИЛ хэлнэ.
          Дуу тоглуулахад сүлжээ хэрэгтэй хэвээр (аудио кэшлэгддэггүй) — тиймээс
          зөвхөн "жагсаалт хуучин" гэхгүй, юу болохыг нь бас хэлнэ. */}
      {offline !== null && (
        <View className="bg-warm/10 border border-warm/40 rounded-lg px-4 py-3 mt-4">
          <Text className="text-warm text-body font-semibold">Сүлжээгүй байна</Text>
          <Text className="text-faint text-caption mt-1 leading-4">
            {`Хадгалсан жагсаалт харагдаж байна (${relativeTime(offline)}). Дуу тоглуулахад сүлжээ шаардлагатай.`}
          </Text>
        </View>
      )}

      {/* --- Хайж байх үед зөвхөн илэрц. Бүлгүүд, эрчмийн товч, дуучид бүгд
              нуугдана — хэрэглэгчийн анхаарлыг сарниулахгүй. --- */}
      {searching ? (
        <View className="mt-6 mb-3">
          <Text className="text-ink text-heading font-semibold">Илэрц ({visible.length})</Text>
        </View>
      ) : (
      <View>
      <View className="mt-7">
        <Text className="text-ink text-heading font-semibold mb-1">Чичиргээний эрчим</Text>
        <Text className="text-faint text-caption mb-3 leading-4">
          {device.backend === "amplitude"
            ? "Таны утас эрчмийн 256 түвшин дэмжинэ — гурвыг нь дарж ялгааг мэдрээрэй."
            : device.backend === "waveform"
              ? `Чичиргээ ажиллана, гэхдээ ${device.reason}`
              : device.backend === "preset"
                ? `3 бэлэн түвшин — ${device.reason}`
                : `⚠️ Чичиргээ ажиллахгүй — ${device.reason}`}
        </Text>
        <View className="flex-row gap-3">
          {LEVELS.map((lvl) => (
            <Pressable
              key={lvl.label}
              className="flex-1 bg-surface-2 border border-line-2 rounded-chip py-4 items-center active:bg-surface"
              onPress={() => device.pulse(lvl.strength, 220)}
              accessibilityRole="button"
              accessibilityLabel={`${lvl.label} чичиргээ туршиж үзэх`}
            >
              <Text className="text-aqua text-title font-semibold">{lvl.label}</Text>
              <Text className="text-faint text-micro font-mono mt-1">{Math.round(lvl.strength * 255)}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ArtistRail artists={artists} songs={tracks ?? []} />

      {/* Санал болголт нь сонссон түүх байхад л гарна — түүхгүй үед юу ч
          харуулахгүй (хуурамч "санал" зохиохгүй). */}
      <RecommendationRail items={recommendations} />

      {/* Каталог — төрлөөр хэвтээ эгнээ болгосон. Босоо жагсаалт байсан үед
          51 дуу дэлгэцийг хэт урт болгодог байв. */}
      {groups.map((g) => (
        <SongRail key={g.title} title={g.title} songs={g.songs} />
      ))}
      </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-bg">
      {/* Босоо мөрүүд нь ЗӨВХӨН хайлтын илэрц. Хайлтгүй үед каталог нь толгой
          хэсэг дэх хэвтээ эгнээгээр харагдана. */}
      <FlatList
        data={searching ? visible : []}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        contentContainerClassName={`px-5 ${TAB_SAFE_PB}`}
        ItemSeparatorComponent={() => <View className="h-2" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38e8ce" />}
        ListEmptyComponent={
          error ? (
            <ErrorState message={error} onRetry={load} />
          ) : !tracks ? (
            <Loading />
          ) : searching ? (
            <Empty title="Илэрц олдсонгүй." hint={`"${query}" -тэй тохирох дуу алга.`} />
          ) : null
        }
        renderItem={({ item }) => <SongRow song={item} />}
      />
    </SafeAreaView>
  );
}
