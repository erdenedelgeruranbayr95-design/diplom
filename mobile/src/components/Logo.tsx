import { Text, View } from "react-native";

/* МЭДРЭХ-ийн лого — вэбийн `.disc` + үг тэмдгийн RN хувилбар.

   Эх загвар (`frontend/src/app/medreh.css`):
     44×44 дугуй · conic-gradient дэвсгэр · төвдөө 9px цэнхэр цэг гэрэлтэй

   RN-д `conic-gradient` байхгүй тул дэвсгэрийг тогтмол бараан өнгө + хүрээгээр
   орлуулав. Гол таних тэмдэг болох ТӨВИЙН ГЭРЭЛТЭХ ЦЭГ хэвээр — түүнийг
   `shadow*` (iOS) ба `elevation` (Android) хоёуланг өгч гаргана. */
export default function Logo({ size = 44 }: { size?: number }) {
  const dot = Math.round(size * 0.2);

  return (
    <View className="flex-row items-center">
      <View
        className="rounded-full bg-surface-2 border border-line-2 items-center justify-center"
        style={{ width: size, height: size }}
        accessible={false}
      >
        <View
          className="rounded-full bg-aqua"
          style={{
            width: dot,
            height: dot,
            shadowColor: "#38e8ce",
            shadowOpacity: 0.9,
            shadowRadius: size * 0.25,
            shadowOffset: { width: 0, height: 0 },
            elevation: 8,
          }}
        />
      </View>

      {/* Үг тэмдэг. Вэб дээр `tracking-[-.04em]` тул үсгүүд шахуу байрлана. */}
      <Text
        className="text-ink font-bold ml-3"
        style={{ fontSize: size * 0.6, letterSpacing: -size * 0.04 }}
        accessibilityRole="header"
      >
        МЭДРЭХ
        <Text className="text-dim" style={{ fontSize: size * 0.26 }}>
          ®
        </Text>
      </Text>
    </View>
  );
}
