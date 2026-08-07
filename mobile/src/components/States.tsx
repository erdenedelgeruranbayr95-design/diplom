import { ActivityIndicator, Pressable, Text, View } from "react-native";

/* Ачаалах · алдаа · хоосон гурван төлөвийг БҮХ дэлгэц ижилхэн харуулна.

   Өмнө нь дэлгэц бүр өөрийн гараар бичсэн `<Text className="text-danger">` -тэй байсан
   тул: зарим нь дахин оролдох товчгүй, зарим нь өөр үг хэрэглэдэг, ачаалах дүрсний
   байрлал зөрдөг байв. Вэбийн `components/ui/States.tsx`-ийн үүрэгтэй ижил. */

export function Loading({ label = "Ачаалж байна" }: { label?: string }) {
  return (
    <View className="py-10 items-center" accessibilityRole="progressbar" accessibilityLabel={label}>
      <ActivityIndicator color="#38e8ce" />
    </View>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <View className="py-8 items-center px-4">
      <Text className="text-danger text-note text-center">{message}</Text>
      {onRetry && (
        <Pressable
          className="mt-4 px-5 py-3 rounded-full border border-line-2 active:bg-surface-2"
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel="Дахин оролдох"
        >
          <Text className="text-ink text-body">Дахин оролдох</Text>
        </Pressable>
      )}
    </View>
  );
}

export function Empty({ title, hint }: { title: string; hint?: string }) {
  return (
    <View className="py-10 items-center px-4">
      <Text className="text-dim text-body text-center">{title}</Text>
      {hint && <Text className="text-faint text-caption text-center mt-1.5 leading-5">{hint}</Text>}
    </View>
  );
}
