import { Modal, Pressable, Text, View } from "react-native";

/* Баталгаажуулах цонх.

   ЯАГААД `Alert.alert` БИШ ВЭ: react-native-web нь ОЛОН ТОВЧТОЙ `Alert.alert`-ыг
   хэрэгжүүлдэггүй — вэб дээр цонх огт гарахгүй, товч дарсан ч ЮУ Ч БОЛОХГҮЙ,
   алдаа ч заахгүй. Бодитоор шалгаж илрүүлсэн: жагсаалт устгах товч вэб дээр
   чимээгүй бүтэлгүйтэж, өгөгдөл үлдэж байв.

   Android дээр `Alert.alert` ажилладаг тул алдаа нь зөвхөн вэб хувилбарт
   илэрдэг — тиймээс анзаарагдахгүй өнгөрөх эрсдэлтэй. Энэ бүрэлдэхүүн нь
   платформоос үл хамаарч ижил ажиллана. */
interface Props {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  /** Устгах зэрэг эргэшгүй үйлдэлд улаанаар тодруулна. */
  destructive?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = "Тийм",
  destructive = false,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable className="flex-1 bg-black/70 justify-center px-6" onPress={onCancel}>
        <Pressable className="bg-surface-2 border border-line-2 rounded-panel p-5" onPress={() => {}}>
          <Text className="text-ink text-heading font-semibold">{title}</Text>
          {message && (
            <Text className="text-dim text-note mt-2" numberOfLines={3}>
              {message}
            </Text>
          )}
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
              className={`flex-1 rounded-full py-3 items-center ${destructive ? "bg-danger" : "bg-aqua"}`}
              onPress={onConfirm}
              accessibilityRole="button"
              accessibilityLabel={confirmLabel}
            >
              <Text className={`text-body font-semibold ${destructive ? "text-danger-ink" : "text-on-aqua"}`}>
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
