import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import { addAction, fetchLibrary, fetchSong, fetchSongs, postHistory, removeAction } from "@/lib/api/client";
import { absoluteUrl } from "@/lib/config";
import { useHapticEngine } from "@/lib/player/useHapticEngine";
import { VIB_LEVELS } from "@/lib/player/constants";
import type { Song } from "@/types";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [song, setSong] = useState<Song | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [vibrationOn, setVibrationOn] = useState(true);
  const [vibLevel, setVibLevel] = useState(1);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  /* Дараагийн/өмнөх дуунд шилжихийн тулд бүтэн жагсаалт хэрэгтэй — `GET /songs/:id`
     зөвхөн нэг дуу өгдөг тул хөршүүдийг мэдэх арга байхгүй. */
  const [playlist, setPlaylist] = useState<Song[]>([]);

  useEffect(() => {
    let alive = true;
    fetchSongs()
      .then((all) => {
        if (alive) setPlaylist(all);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const index = playlist.findIndex((s) => s.id === id);
  const prevSong = index > 0 ? playlist[index - 1] : null;
  const nextSong = index >= 0 && index < playlist.length - 1 ? playlist[index + 1] : null;

  const goTo = useCallback(
    (target: Song | null) => {
      if (!target) return;
      // `replace` — түүхэнд дуу бүр хуримтлагдвал "Буцах" олон удаа дарах хэрэгтэй болно.
      router.replace({ pathname: "/player/[id]", params: { id: target.id } });
    },
    [router],
  );

  useEffect(() => {
    if (!id) return;
    let alive = true;
    fetchLibrary()
      .then((lib) => {
        if (!alive) return;
        setLiked(lib.likedIds.includes(id));
        setSaved(lib.savedIds.includes(id));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [id]);

  /* Хариу ирэхээс өмнө UI-г шууд шинэчилнэ (optimistic) — сүлжээ удаан үед товч
     "гацсан" мэт санагдахаас сэргийлнэ. Алдаа гарвал буцаана. */
  const toggleAction = useCallback(
    async (action: "LIKE" | "SAVE") => {
      if (!id) return;
      const isOn = action === "LIKE" ? liked : saved;
      const setter = action === "LIKE" ? setLiked : setSaved;
      setter(!isOn);
      try {
        if (isOn) await removeAction(id, action);
        else await addAction(id, action);
      } catch {
        setter(isOn);
      }
    },
    [id, liked, saved],
  );

  /* `fileUrl` нь харьцангуй байж болно (`/tracks/x.mp3`) — утсанд бүтэн URL хэрэгтэй.
     `hlsUrl` байвал түүнийг илүүд үзнэ (стриминг, сүлжээнд зөөлөн). */
  const audioSource = absoluteUrl(song?.hlsUrl ?? song?.fileUrl);
  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);

  /* Дэвсгэрт тоглуулах — SDK 57-д Android дээр `setActiveForLockScreen` дуудахгүй бол
     аудио ойролцоогоор 3 минутын дараа зогсдог (Expo-гийн баримтын шаардлага). */
  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: "doNotMix",
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!id) return;
    let alive = true;
    fetchSong(id)
      .then((data) => {
        if (alive) setSong(data);
      })
      .catch((e: unknown) => {
        if (alive) setError(e instanceof Error ? e.message : "Дуу ачаалж чадсангүй");
      });
    return () => {
      alive = false;
    };
  }, [id]);

  /* Тоглуулагчийн байрлалыг хөдөлгүүрт ФУНКЦЭЭР дамжуулна — `status.currentTime`-ыг
     шууд өгвөл render бүрд шинэ утга болж, хөдөлгүүрийн interval дахин эхлэх байсан. */
  const getCurrentTime = useCallback(() => player.currentTime ?? 0, [player]);

  const engine = useHapticEngine({
    enabled: true,
    playing: status.playing,
    vibrationOn,
    vibLevel,
    getCurrentTime,
  });

  // Шинэ дуу ирэхэд цохилтын хугацааг хөдөлгүүрт оноож, түгжигдсэн дэлгэцийн
  // удирдлагыг асаана (дэвсгэрт тоглуулахын урьдчилсан нөхцөл).
  useEffect(() => {
    if (!song) return;
    engine.setBeatTimestamps(song.beatTimestamps);
    player.setActiveForLockScreen?.(true, {
      title: song.title,
      artist: song.artist ?? "МЭДРЭХ",
    });
  }, [song]);

  /* --- сонсголын түүх бичих ---

     `GET /me/stats` нь бүхэлдээ `ListenHistory`-оос тооцогддог тул энэ бичлэггүйгээр
     Статистик дэлгэц үүрд хоосон байна.

     Хэр удаан сонссоныг мэдэхийн тулд ref-д хамгийн их хүрсэн байрлалыг хадгална
     (`currentTime` нь seek/дуусахад ухардаг тул эцсийн утга нь найдваргүй).
     Дэлгэцээс гарах эсвэл дуу солигдох үед НЭГ л удаа илгээнэ. */
  const maxPlayedRef = useRef(0);
  const reportedRef = useRef(false);
  /* Чичиргээ ҮНЭХЭЭР ажилласан эсэх. Зөвхөн товч асаалттай байхад хангалтгүй —
     дуу нь цохилтын өгөгдөлгүй (`PENDING`) бол чичиргээ огт гарахгүй. Тиймээс
     хоёулаа биелсэн агшин байсан эсэхийг тэмдэглэнэ. */
  const vibratedRef = useRef(false);

  useEffect(() => {
    if (status.currentTime > maxPlayedRef.current) maxPlayedRef.current = status.currentTime;
  }, [status.currentTime]);

  useEffect(() => {
    // Дуу солигдоход тоолуурыг тэглэнэ.
    maxPlayedRef.current = 0;
    reportedRef.current = false;
    vibratedRef.current = false;
  }, [id]);

  useEffect(() => {
    const songId = id;
    const bpm = song?.analyzedBpm ?? song?.bpm ?? null;
    return () => {
      const seconds = maxPlayedRef.current;
      // 5 секундээс богино сонсголыг бүртгэхгүй — санамсаргүй дарсныг статистикт оруулахгүй.
      if (!songId || reportedRef.current || seconds < 5) return;
      reportedRef.current = true;
      postHistory(songId, seconds * 1000, { bpm, vibrations: vibratedRef.current }).catch(() => {});
    };
  }, [id, song]);

  const hasHaptics = song?.analysisStatus === "READY" && (song.beatTimestamps?.length ?? 0) > 0;

  // Тоглож байх үед гурвуулаа биелсэн бол чичиргээ гарсан гэж тооцно.
  useEffect(() => {
    if (status.playing && vibrationOn && hasHaptics) vibratedRef.current = true;
  }, [status.playing, vibrationOn, hasHaptics]);

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-bg items-center justify-center px-6">
        <Text className="text-danger text-copy text-center">{error}</Text>
        <Pressable className="mt-6 px-5 py-3 rounded-full bg-surface-2" onPress={() => router.back()}>
          <Text className="text-ink text-body">Буцах</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (!song) {
    return (
      <SafeAreaView className="flex-1 bg-bg items-center justify-center">
        <ActivityIndicator color="#38e8ce" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="flex-1 px-6 pt-4">
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Буцах">
          <Text className="text-dim text-copy">‹ Буцах</Text>
        </Pressable>

        <View className="flex-1 justify-center">
          <Text className="text-ink text-3xl font-bold" numberOfLines={2}>
            {song.title}
          </Text>
          <Text className="text-dim text-lead mt-1">{song.artist ?? "Тодорхойгүй"}</Text>

          <View className="flex-row gap-2 mt-4">
            <Pressable
              className={`px-4 py-2 rounded-chip border ${liked ? "bg-rose/15 border-rose" : "bg-surface border-line-2"}`}
              onPress={() => toggleAction("LIKE")}
              accessibilityRole="button"
              accessibilityState={{ selected: liked }}
              accessibilityLabel={liked ? "Дуртайгаас хасах" : "Дуртайд нэмэх"}
            >
              <Text className={liked ? "text-rose text-body" : "text-dim text-body"}>
                {liked ? "♥ Дуртай" : "♡ Дуртай"}
              </Text>
            </Pressable>
            <Pressable
              className={`px-4 py-2 rounded-chip border ${saved ? "bg-warm/15 border-warm" : "bg-surface border-line-2"}`}
              onPress={() => toggleAction("SAVE")}
              accessibilityRole="button"
              accessibilityState={{ selected: saved }}
              accessibilityLabel={saved ? "Хадгалсанаас хасах" : "Хадгалах"}
            >
              <Text className={saved ? "text-warm text-body" : "text-dim text-body"}>
                {saved ? "◼ Хадгалсан" : "◻ Хадгалах"}
              </Text>
            </Pressable>
          </View>

          {/* Төлөвийг ИЛ хэлнэ. Чимээгүй унах нь энэ апп-д хамгийн эндүүрэл төрүүлэх
              байдал: аудио файл байхгүй, эсвэл дуу шинжлэгдээгүй бол хэрэглэгч
              програм эвдэрсэн гэж бодно. */}
          <View className="mt-4 gap-1">
            {!audioSource && <Text className="text-danger text-note">⚠ Энэ дуунд аудио файл байхгүй</Text>}
            {audioSource && status.error && (
              <Text className="text-danger text-note">⚠ Аудио ачаалж чадсангүй — файл байхгүй байж магадгүй</Text>
            )}
            {hasHaptics ? (
              <Text className="text-aqua text-note">✓ {song.beatTimestamps?.length} цохилт — чичиргээ ажиллана</Text>
            ) : (
              <Text className="text-warm text-note">
                ⚠ Энэ дуу шинжлэгдээгүй ({song.analysisStatus}) — чичиргээгүй тоглоно
              </Text>
            )}
          </View>

          {/* --- явц --- */}
          <View className="mt-8">
            <View className="h-1 bg-line rounded-bar overflow-hidden">
              <View
                className="h-full bg-aqua"
                style={{
                  width: `${status.duration > 0 ? Math.min(100, (status.currentTime / status.duration) * 100) : 0}%`,
                }}
              />
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-faint text-caption font-mono">{formatTime(status.currentTime)}</Text>
              <Text className="text-faint text-caption font-mono">{formatTime(status.duration)}</Text>
            </View>
          </View>

          {/* --- удирдлага --- */}
          <View className="flex-row items-center justify-center gap-4 mt-8">
            <Pressable
              className={`px-3 py-3 rounded-full ${prevSong ? "bg-surface-2" : "opacity-30"}`}
              onPress={() => goTo(prevSong)}
              disabled={!prevSong}
              accessibilityRole="button"
              accessibilityLabel="Өмнөх дуу"
              accessibilityState={{ disabled: !prevSong }}
            >
              <Text className="text-ink text-body">⏮</Text>
            </Pressable>

            <Pressable
              className="px-4 py-3 rounded-full bg-surface-2"
              onPress={() => {
                player.seekTo(Math.max(0, player.currentTime - 10));
                engine.resetCursor();
              }}
              accessibilityRole="button"
              accessibilityLabel="10 секунд ухраах"
            >
              <Text className="text-ink text-body">-10с</Text>
            </Pressable>

            <Pressable
              className="w-20 h-20 rounded-full bg-aqua items-center justify-center"
              onPress={() => (status.playing ? player.pause() : player.play())}
              accessibilityRole="button"
              accessibilityLabel={status.playing ? "Түр зогсоох" : "Тоглуулах"}
            >
              <Text className="text-on-aqua text-3xl">{status.playing ? "❚❚" : "▶"}</Text>
            </Pressable>

            <Pressable
              className="px-4 py-3 rounded-full bg-surface-2"
              onPress={() => {
                player.seekTo(Math.min(status.duration, player.currentTime + 10));
                engine.resetCursor();
              }}
              accessibilityRole="button"
              accessibilityLabel="10 секунд урагшлуулах"
            >
              <Text className="text-ink text-body">+10с</Text>
            </Pressable>

            <Pressable
              className={`px-3 py-3 rounded-full ${nextSong ? "bg-surface-2" : "opacity-30"}`}
              onPress={() => goTo(nextSong)}
              disabled={!nextSong}
              accessibilityRole="button"
              accessibilityLabel="Дараагийн дуу"
              accessibilityState={{ disabled: !nextSong }}
            >
              <Text className="text-ink text-body">⏭</Text>
            </Pressable>
          </View>

          {playlist.length > 0 && index >= 0 && (
            <Text className="text-faint text-micro font-mono text-center mt-3">
              {index + 1} / {playlist.length}
            </Text>
          )}

          {/* --- чичиргээний тохиргоо --- */}
          <View className="mt-10">
            <Pressable
              className={`rounded-chip py-3 items-center border ${vibrationOn ? "bg-aqua/15 border-aqua" : "bg-surface border-line-2"}`}
              onPress={() => setVibrationOn((v) => !v)}
              accessibilityRole="switch"
              accessibilityState={{ checked: vibrationOn }}
              accessibilityLabel="Чичиргээ"
            >
              <Text className={vibrationOn ? "text-aqua text-body font-semibold" : "text-dim text-body"}>
                Чичиргээ {vibrationOn ? "асаалттай" : "унтраалттай"}
              </Text>
            </Pressable>

            <View className="flex-row gap-2 mt-3">
              {VIB_LEVELS.map((lvl, i) => (
                <Pressable
                  key={lvl.label}
                  className={`flex-1 rounded-chip py-3 items-center border ${
                    vibLevel === i ? "bg-aqua/15 border-aqua" : "bg-surface border-line"
                  }`}
                  onPress={() => setVibLevel(i)}
                  accessibilityRole="button"
                  accessibilityLabel={`Чичиргээний хүч: ${lvl.label}`}
                >
                  <Text className={vibLevel === i ? "text-aqua text-body" : "text-dim text-body"}>{lvl.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
