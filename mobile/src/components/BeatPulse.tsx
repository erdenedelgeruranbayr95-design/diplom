import { forwardRef, useImperativeHandle, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";

/* Цохилтын ВИЗУАЛ суваг — сонсголгүй хэрэглэгчийн хоёр дахь мэдрэхүй.

   ⚠️ ЗАРЧИМ: чичиргээтэй ЯГ НЭГ эх сурвалжаас (BeatScheduler) хөтлөгдөнө. Хэрэв
   тусдаа таймераар зурвал хэдэн арван мс зөрж, харагдах ба мэдрэгдэх цохилт
   сална — тэр нь энэ аппын гол утгыг эвдэнэ.

   Вэб хувилбар нь Web Audio FFT-ээс спектр уншиж 28 багана хөдөлгөдөг. RN-д FFT
   БАЙХГҮЙ (expo-audio спектр өгдөггүй) тул энд ЗӨВХӨН цохилтын мөчийг харуулна.
   Өгөгдөл байхгүй зүйлийг зохиож "амьд" харагдуулах нь худал мэдээлэл болно.

   `Animated` (react-native core) ашиглав, Reanimated биш: pulse нь зөвхөн
   opacity/transform хөдөлгөдөг тул `useNativeDriver` -ээр JS thread-ээс гадуур
   ажиллана, нэмэлт хамаарал шаардахгүй. */

export interface BeatPulseHandle {
  /** Цохилт бүрт дуудна — `useHapticEngine`-ийн `onBeat`-аас. */
  pulse: () => void;
}

interface Props {
  /** Тоглож байгаа эсэх — зогсоход тайван байдалд буцна. */
  playing: boolean;
  /** Цохилтын өгөгдөлтэй эсэх — байхгүй бол тайлбар харуулна. */
  hasBeats: boolean;
  bpm?: number | null;
  /** Хөдөлгөөн багасгах — пульсийг УСТГАХГҮЙ, зөвхөн далайцыг нь бууруулна.
   *  Цохилт бол энэ аппын мэдээллийн суваг тул бүрэн хаавал утга алдагдана;
   *  вестибуляр мэдрэмтгий хэрэглэгчид зөөлөн хувилбар хэрэгтэй. */
  reducedMotion?: boolean;
  /** Төвд харуулах агуулга (ихэвчлэн ковер зураг). Цохилтод БАГА зэрэг томорно —
   *  зураг хэт үсрэвэл нүд ядрааж, урт хугацаанд сонсоход таагүй. */
  children?: React.ReactNode;
}

const BeatPulse = forwardRef<BeatPulseHandle, Props>(function BeatPulse(
  { playing, hasBeats, bpm, reducedMotion = false, children },
  ref,
) {
  // 0 → тайван, 1 → цохилтын оргил. Бүх визуал үүнээс гаралтай.
  const level = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    pulse: () => {
      /* Хурдан өсөж (60мс), удаан унана (260мс) — байгалийн цохилтын мэдрэмж.
         `stopAnimation` нь өмнөх уналтыг тасалж, ойрхон цохилтууд бие биенээ
         дарахгүй (хурдан хэмнэлтэй дуунд шаардлагатай). */
      level.stopAnimation(() => {
        Animated.sequence([
          Animated.timing(level, {
            toValue: 1,
            duration: 60,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(level, {
            toValue: 0,
            duration: 260,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ]).start();
      });
    },
  }));

  /* Хөдөлгөөн багасгах үед хэмжээний өөрчлөлтийг бараг тэглэж, оронд нь ТОДРОЛООР
     цохилтыг илэрхийлнэ — мэдээлэл хадгалагдаж, хөдөлгөөн арилна. */
  const grow = reducedMotion ? 1.08 : 1.5;
  const coreGrow = reducedMotion ? 1.25 : 2.6;

  const scale = level.interpolate({ inputRange: [0, 1], outputRange: [1, grow] });
  /* Тайван үед ч ТОД харагдана (0.45). Хэт бүдэг бол хэрэглэгч визуал суваг
     байгааг анзаарахгүй — сонсголгүй хүнд энэ нь ганц үлдэх мэдрэхүй байж болно. */
  const ringOpacity = level.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] });
  const glowScale = level.interpolate({ inputRange: [0, 1], outputRange: [0.9, reducedMotion ? 1.1 : 2.2] });
  const glowOpacity = level.interpolate({ inputRange: [0, 1], outputRange: [0, reducedMotion ? 0.45 : 0.3] });
  const coreScale = level.interpolate({ inputRange: [0, 1], outputRange: [1, coreGrow] });
  const coverScale = level.interpolate({ inputRange: [0, 1], outputRange: [1, reducedMotion ? 1.04 : 1.1] });

  return (
    <View className="items-center justify-center h-52" accessibilityRole="image" accessibilityLabel="Цохилтын визуал">
      {/* Гадна ореол — цохилтод тархаж арилна. */}
      <Animated.View
        className="absolute w-32 h-32 rounded-full bg-aqua"
        style={{ transform: [{ scale: glowScale }], opacity: glowOpacity }}
      />
      {/* Тогтмол лавлах цагираг — цохилтын цагирагийн хэмжээг үүнтэй харьцуулж
          нүдээр хэмжинэ (өөрөө хөдөлдөггүй). */}
      <View className="absolute w-32 h-32 rounded-full border border-line-2" />
      {/* Гол цагираг. */}
      <Animated.View
        className="absolute w-32 h-32 rounded-full border-2 border-aqua"
        style={{ transform: [{ scale }], opacity: ringOpacity }}
      />
      {/* Төвийн агуулга: ковер байвал тэр, эс бөгөөс жижиг цэг.
          Ковер нь БАГА зэрэг (1.04-1.10) хөдөлнө — цэг шиг 2.6 дахин томорвол
          зураг үсэрч, урт сонсголд нүд ядраана. */}
      <Animated.View
        style={{ transform: [{ scale: children ? coverScale : coreScale }] }}
        className={children ? "" : "w-4 h-4 rounded-full bg-aqua"}
      >
        {children}
      </Animated.View>

      <View className="absolute bottom-0 items-center">
        {!hasBeats ? (
          <Text className="text-faint text-caption">Цохилтын өгөгдөлгүй</Text>
        ) : !playing ? (
          <Text className="text-faint text-caption">Тоглуулахад цохилт харагдана</Text>
        ) : (
          bpm && <Text className="text-faint text-micro font-mono">{Math.round(bpm)} BPM</Text>
        )}
      </View>
    </View>
  );
});

export default BeatPulse;
