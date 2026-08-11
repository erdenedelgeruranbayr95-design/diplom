import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import AddToPlaylistModal from "@/components/AddToPlaylistModal";
import BeatPulse, { type BeatPulseHandle } from "@/components/BeatPulse";
import Cover from "@/components/Cover";
import { addAction, fetchLibrary, fetchSong, fetchSongs, postHistory, removeAction } from "@/lib/api/client";
import { beatDynamicsFromSong, loadBeatDynamics } from "@/lib/audio/haptic-score";
import { buildHapticTrack } from "@/lib/player/haptic-track";
import { absoluteUrl } from "@/lib/config";
import { usePreferences } from "@/lib/prefs/PreferencesContext";
import { useHapticEngine } from "@/lib/player/useHapticEngine";
import { DEFAULT_BRIGHTNESS, VIB_LEVELS } from "@/lib/player/constants";
import { afterTrackEnd, neighborIndex, shuffledOrder } from "@/lib/player/queue";
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
  /* Чичиргээний тохиргоо нь тоглуулагчийн дотоод төлөв БИШ — байнга хадгалагдана.
     Урьд нь дуу солих бүрд "Дунд" рүү тэглэгдэж, хэрэглэгчийн тааруулсан эрчим
     алга болдог байв. */
  const { vibrationOn, vibLevel, reducedMotion, repeat, shuffle, shuffleSeed, setPref } = usePreferences();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addingToPlaylist, setAddingToPlaylist] = useState(false);
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

  /* Холих асаалттай үед дараалал нь ЖАГСААЛТЫН эрэмбэ биш, үрээс гаргасан
     тогтвортой холилт болно. Үр нь тохиргоонд хадгалагддаг тул дэлгэц дахин
     үүсэхэд ижил дараалал сэргэнэ. */
  const order = useMemo(
    () => (shuffle ? shuffledOrder(playlist, shuffleSeed) : playlist),
    [playlist, shuffle, shuffleSeed],
  );

  const index = order.findIndex((s) => s.id === id);
  const prevIndex = neighborIndex(index, order.length, -1, repeat);
  const nextIndex = neighborIndex(index, order.length, 1, repeat);
  const prevSong = prevIndex === null ? null : order[prevIndex];
  const nextSong = nextIndex === null ? null : order[nextIndex];

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

  /* Дуу ӨӨРӨӨ дуусахад юу болох вэ (давтах / дараагийнх руу шилжих).

     `didJustFinish` нь дуу дуусмагц `true` болоод дараагийн статус ирэх хүртэл
     тэр хэвээрээ үлддэг. Иймд нэг л удаа ажиллуулахын тулд хамгийн сүүлд
     боловсруулсан дууны ID-г ref-д тэмдэглэнэ — эс бөгөөс "нэгийг давтах"
     горимд `seekTo(0)` дараалан дуудагдаж дуу тасалдана. */
  const finishedForRef = useRef<string | null>(null);
  useEffect(() => {
    if (!status.didJustFinish || !id) return;
    if (finishedForRef.current === id) return;
    finishedForRef.current = id;

    const target = afterTrackEnd(index, order.length, repeat);
    if (target === null) return;
    if (target === "replay") {
      player.seekTo(0);
      player.play();
      finishedForRef.current = null; // дахин дуусахад ажиллах ёстой
      return;
    }
    goTo(order[target] ?? null);
  }, [status.didJustFinish, id, index, order, repeat, player, goTo]);

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

  /* Визуал пульс. Ref-ээр удирдана — цохилт бүрд `setState` дуудвал секундэд
     хэдэн удаа бүтэн дэлгэц дахин зурагдаж, хэмнэл алдагдана. */
  const pulseRef = useRef<BeatPulseHandle>(null);

  const engine = useHapticEngine({
    enabled: true,
    playing: status.playing,
    vibrationOn,
    vibLevel,
    getCurrentTime,
    onBeat: useCallback(() => pulseRef.current?.pulse(), []),
  });

  // Шинэ дуу ирэхэд цохилтын хугацааг хөдөлгүүрт оноож, түгжигдсэн дэлгэцийн
  // удирдлагыг асаана (дэвсгэрт тоглуулахын урьдчилсан нөхцөл).
  useEffect(() => {
    if (!song) return;
    player.setActiveForLockScreen?.(true, {
      title: song.title,
      artist: song.artist ?? "МЭДРЭХ",
    });
  }, [song]);

  /* Мэдрэхүйн зам — цохилт + онсет.
     Зөвхөн цохилтоор чичрүүлэхэд метроном шиг мэдрэгддэг (секундэд 1.6–2.5 удаа,
     бүгд ижил зайтай). Онсет нь цохилтоос 3–6 дахин олон бөгөөд хөгжмийн бодит
     бүтцийг дагадаг тул аялгуу, гитарын цохилт, дуучны үг мэдрэгдэнэ.

     ⚠️ ГУРВАН ЭХ СУРВАЛЖ, ДАРААЛАЛТАЙ
     1. Цохилт + онсет нэгтгэсэн зам — ХАМГИЙН БҮРЭН. Онсетыг энд зайн
        шаардлагаар шүүнэ (см. `buildHapticTrack`).
     2. Зөвхөн цохилтын эрчим/өнгө — онсетгүй хуучин өгөгдөл.
     3. `scoreUrl` дээрх 2.6 MB Score — зөвхөн локал орчны нөөц зам (үүлэн
        дээрх backend түүнийг үйлчилж чаддаггүй, 404). */
  useEffect(() => {
    let alive = true;
    engine.setBeatDynamics(null); // өмнөх дууныхыг заавал арилгана
    const beats = song?.beatTimestamps;
    if (!beats?.length) return;

    const track = buildHapticTrack(
      { times: beats, intensity: song?.beatIntensity, brightness: song?.beatBrightness },
      { times: song?.onsetTimestamps, intensity: song?.onsetIntensity, brightness: song?.onsetBrightness },
      DEFAULT_BRIGHTNESS,
    );
    if (track) {
      engine.setHapticTrack(track);
      /* Онсет огт үлдээгүй бол (шүүлтэд бүгд унасан, эсвэл хуучин өгөгдөл)
         зам нь зөвхөн цохилтоос бүрдэнэ — өмнөх зан төлөвтэй ижил. */
      if (track.onsetCount > 0) return;
    } else {
      engine.setBeatTimestamps(beats);
    }

    const stored = beatDynamicsFromSong(song?.beatIntensity, song?.beatBrightness, beats.length);
    if (stored || track) return; // өгөгдөл аль хэдийн оноогдсон

    if (!song?.scoreUrl) return;
    loadBeatDynamics(song.scoreUrl, beats).then((dyn) => {
      if (alive) engine.setBeatDynamics(dyn);
    });
    return () => {
      alive = false;
    };
  }, [song?.id]);

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
          {song.artistId ? (
            <Pressable
              onPress={() => router.push({ pathname: "/artist/[id]", params: { id: song.artistId! } })}
              accessibilityRole="link"
              accessibilityLabel={`${song.artist ?? "Дуучин"} — дуучны хуудас`}
            >
              <Text className="text-aqua text-lead mt-1">{song.artist ?? "Тодорхойгүй"} ›</Text>
            </Pressable>
          ) : (
            <Text className="text-dim text-lead mt-1">{song.artist ?? "Тодорхойгүй"}</Text>
          )}

          {/* ⚠️ `flex-wrap` ЗААВАЛ. Дөрвөн товч 390px өргөнтэй дэлгэцэнд нэг мөрөнд
              багтахгүй — «Дэлгэрэнгүй» баруун захаараа тасарч, дарах ч боломжгүй
              болдог байв (браузерын зураглалаар илрүүлсэн). RN-д хэвтээ
              гүйлгэлт өөрөө үүсдэггүй тул хальсан хэсэг зүгээр л алга болно. */}
          <View className="flex-row flex-wrap gap-2 mt-4">
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
            <Pressable
              className="px-4 py-2 rounded-chip border bg-surface border-line-2"
              onPress={() => setAddingToPlaylist(true)}
              accessibilityRole="button"
              accessibilityLabel="Жагсаалтад нэмэх"
            >
              <Text className="text-dim text-body">≡ Жагсаалт</Text>
            </Pressable>
            <Pressable
              className="px-4 py-2 rounded-chip border bg-surface border-line-2"
              onPress={() => router.push({ pathname: "/song/[id]", params: { id: song.id } })}
              accessibilityRole="button"
              accessibilityLabel="Дууны дэлгэрэнгүй"
            >
              <Text className="text-dim text-body">ⓘ Дэлгэрэнгүй</Text>
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

          <BeatPulse
            ref={pulseRef}
            playing={status.playing}
            hasBeats={hasHaptics}
            bpm={song.analyzedBpm ?? song.bpm}
            reducedMotion={reducedMotion}
          >
            {/* Цагираг 128px тул ковер түүнээс бага байх ёстой. */}
            <Cover url={song.coverUrl} title={song.title} size={104} rounded="lg" />
          </BeatPulse>

          {/* --- явц --- */}
          <View className="mt-2">
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

          {/* --- холих · давтах ---
              Тусдаа мөрөнд байрлуулав: гол удирдлагын товчнууд том, дарахад
              хялбар байх ёстой бөгөөд тэдгээрийн хооронд жижиг товч шигдвэл
              буруу дарах эрсдэл нэмэгдэнэ. */}
          <View className="flex-row items-center justify-center gap-3 mt-4">
            <Pressable
              className={`px-4 py-2 rounded-chip border ${shuffle ? "bg-aqua/15 border-aqua" : "bg-surface border-line"}`}
              onPress={() => {
                const on = !shuffle;
                setPref("shuffle", on);
                // Холихыг АСААХ бүрд шинэ дараалал — эс бөгөөс үргэлж ижил
                // "санамсаргүй" эрэмбэ гарч, холих утгаа алдана.
                if (on) setPref("shuffleSeed", Date.now() % 0x7fffffff);
              }}
              accessibilityRole="switch"
              accessibilityState={{ checked: shuffle }}
              accessibilityLabel="Холих"
            >
              <Text className={shuffle ? "text-aqua text-caption" : "text-dim text-caption"}>
                🔀 Холих
              </Text>
            </Pressable>

            <Pressable
              className={`px-4 py-2 rounded-chip border ${repeat === "off" ? "bg-surface border-line" : "bg-aqua/15 border-aqua"}`}
              onPress={() => setPref("repeat", repeat === "off" ? "all" : repeat === "all" ? "one" : "off")}
              accessibilityRole="button"
              accessibilityLabel={
                repeat === "off" ? "Давтахгүй" : repeat === "all" ? "Бүгдийг давтана" : "Энэ дууг давтана"
              }
            >
              <Text className={repeat === "off" ? "text-dim text-caption" : "text-aqua text-caption"}>
                {repeat === "one" ? "🔂 Нэгийг" : repeat === "all" ? "🔁 Бүгдийг" : "🔁 Давтахгүй"}
              </Text>
            </Pressable>
          </View>

          {order.length > 0 && index >= 0 && (
            <Text className="text-faint text-micro font-mono text-center mt-3">
              {index + 1} / {order.length}
              {shuffle ? " · холисон" : ""}
            </Text>
          )}

          {/* --- чичиргээний тохиргоо --- */}
          <View className="mt-10">
            <Pressable
              className={`rounded-chip py-3 items-center border ${vibrationOn ? "bg-aqua/15 border-aqua" : "bg-surface border-line-2"}`}
              onPress={() => setPref("vibrationOn", !vibrationOn)}
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
                  onPress={() => setPref("vibLevel", i)}
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

      <AddToPlaylistModal
        visible={addingToPlaylist}
        songId={id ?? null}
        onClose={() => setAddingToPlaylist(false)}
      />
    </SafeAreaView>
  );
}
