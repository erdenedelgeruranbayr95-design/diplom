import { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

/* Нэг мөр текст асуух модал.

   ЯАГААД ӨӨРИЙН МОДАЛ ВЭ: React Native-ийн `Alert.prompt` нь ЗӨВХӨН iOS дээр
   байдаг (Android/вэб дээр `undefined`). Энэ аппын зорилтот платформ бол Android
   тул түүнд найдаж болохгүй — жагсаалт үүсгэх/нэр солих нь тэнд огт ажиллахгүй
   байх байсан. */
interface Props {
  visible: boolean;
  title: string;
  placeholder?: string;
  initialValue?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onSubmit: (value: string) => void;
}

export default function PromptModal({
  visible,
  title,
  placeholder,
  initialValue = "",
  confirmLabel = "Хадгалах",
  onCancel,
  onSubmit,
}: Props) {
  const [value, setValue] = useState(initialValue);

  // Модал дахин нээгдэх бүрд эхний утгыг сэргээнэ (өмнөх бичсэн текст үлдэхгүй).
  useEffect(() => {
    if (visible) setValue(initialValue);
  }, [visible, initialValue]);

  const canSubmit = value.trim().length > 0;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      {/* Дэвсгэр дээр дарахад хаагдана — Android-ийн буцах товч ч мөн (onRequestClose). */}
      <Pressable className="flex-1 bg-black/70 justify-center px-6" onPress={onCancel}>
        {/* Модалын дотор дарахад хаагдахгүй. */}
        <Pressable className="bg-surface-2 border border-line-2 rounded-panel p-5" onPress={() => {}}>
          <Text className="text-ink text-heading font-semibold mb-3">{title}</Text>
          <TextInput
            className="bg-surface border border-line-field rounded-sm text-ink text-copy px-4 py-3.5"
            placeholder={placeholder}
            placeholderTextColor="#768583"
            value={value}
            onChangeText={setValue}
            autoFocus
            onSubmitEditing={() => canSubmit && onSubmit(value.trim())}
            accessibilityLabel={title}
          />
          <View className="flex-row gap-3 mt-5">
            <Pressable
              className="flex-1 rounded-full py-3 items-center border border-line-2"
              onPress={onCancel}
              accessibilityRole="button"
              accessibilityLabel="Болих"
            >
              <Text className="text-dim text-body">Болих</Text>
            </Pressable>
            <Pressable
              className={`flex-1 rounded-full py-3 items-center ${canSubmit ? "bg-aqua" : "bg-aqua/40"}`}
              onPress={() => canSubmit && onSubmit(value.trim())}
              disabled={!canSubmit}
              accessibilityRole="button"
              accessibilityLabel={confirmLabel}
            >
              <Text className="text-on-aqua text-body font-semibold">{confirmLabel}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
