import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

/* Нууц үгийн талбар — харах/нуух товчтой.

   ЯАГААД ХЭРЭГТЭЙ ВЭ: гар утасны жижиг гар дээр нууц үг бичихэд алдах нь
   элбэг бөгөөд ●●● цэгнээс юу буруу болсныг таах боломжгүй. Ялангуяа МЭДРЭХ-ийн
   зорилтот хэрэглэгч болох сонсголын бэрхшээлтэй хүмүүст дуу хоолойгоор
   тусламж авах сонголт байхгүй тул бичсэнээ НҮДЭЭР шалгах чадвар нь чухал.

   ГУРВАН ГАЗАР ХЭРЭГЛЭГДЭНЭ (нэвтрэх · бүртгүүлэх дэх нууц үг ба давталт) тул
   тусдаа компонент болгосон — харагдах байдал болон хандалтын шошго нь гурвуулан
   дээр ижил байна. */
interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  /** Дэлгэц уншигчид зориулсан талбарын нэр («Нууц үг», «Нууц үг давтах»). */
  accessibilityLabel: string;
  editable?: boolean;
  /** Алдаатай (жишээ нь нууц үг таарахгүй) үед хүрээг улаан болгоно. */
  invalid?: boolean;
  onSubmitEditing?: () => void;
  /** Гадна талын нэмэлт класс — зайд (`mb-3`) зориулав. */
  containerClassName?: string;
}

export default function PasswordInput({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
  editable = true,
  invalid = false,
  onSubmitEditing,
  containerClassName = "",
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <View className={`relative ${containerClassName}`}>
      <TextInput
        /* `pr-14` нь баруун талын нүдний товчинд зай гаргана — үүнгүй бол урт
           нууц үг товчны доогуур орж, уншигдахаа болино. */
        className={`bg-surface border rounded-sm text-ink text-copy pl-4 pr-14 py-3.5 ${
          invalid ? "border-danger" : "border-line-field"
        }`}
        placeholder={placeholder}
        placeholderTextColor="#768583"
        secureTextEntry={!visible}
        /* `secureTextEntry`-г асаах/унтраахад Android-ийн гарын автомат засвар
           бичсэн текстийг СОЛИХ эрсдэлтэй (нууц үг нь толь бичигт байхгүй үг
           тул "засагдана"). Автомат засвар/санамжийг бүрэн унтраасан нь үүнээс
           сэргийлнэ. iOS дээр `textContentType="none"` нь хүчтэй нууц үг санал
           болгох давхаргыг гаргахгүй болгоно. */
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoComplete="off"
        textContentType="none"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        onSubmitEditing={onSubmitEditing}
        accessibilityLabel={accessibilityLabel}
      />
      <Pressable
        /* Талбарын бүтэн өндрийг эзэлнэ — хуруугаар оносон даралт л ажиллах
           ёстой, жижиг дүрс рүү яг таарч дарах шаардлагагүй. */
        className="absolute right-0 top-0 bottom-0 w-14 items-center justify-center"
        onPress={() => setVisible((v) => !v)}
        hitSlop={8}
        disabled={!editable}
        accessibilityRole="button"
        accessibilityLabel={visible ? `${accessibilityLabel} нуух` : `${accessibilityLabel} харуулах`}
        accessibilityState={{ selected: visible, disabled: !editable }}
      >
        <Ionicons
          name={visible ? "eye-off-outline" : "eye-outline"}
          size={20}
          /* Харагдаж байгаа үед аква өнгө — нууц үг ил байгааг сануулах
             визуал дохио (сонсголын бэрхшээлтэй хэрэглэгчид дуугаар
             анхааруулга өгөх боломжгүй). */
          color={visible ? "#38e8ce" : "#768583"}
        />
      </Pressable>
    </View>
  );
}
