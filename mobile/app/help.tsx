import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import { PhoneDevice } from "@/lib/haptics/PhoneDevice";

/* Тусламж — хэрхэн ашиглах вэ.

   ⚠️ Вэбийн `HelpView.tsx`-ийн агуулгыг ШУУД ХУУЛААГҮЙ. Тэнд:

     «iPhone дээр яагаад чичрэхгүй байна вэ? — iOS Safari нь чичиргээний
      API-г дэмждэггүй»

   гэж бичсэн нь ВЭБ дээр үнэн (`navigator.vibrate` iOS-д байхгүй), гэхдээ энэ
   NATIVE апп дээр ХУДАЛ болно — iPhone-ий Taptic Engine нь `expo-haptics`-ээр
   бүрэн ажилладаг. Хүртээмжийн апп дээр буруу мэдээлэл өгөх нь хэрэглэгчийг
   "миний утас болдоггүй юм байна" гэж эндүүрүүлж, ашиглахаа болиход хүргэнэ.
   Иймд асуулт бүрийг гар утасны бодит зан төлөвт тааруулж ДАХИН бичсэн. */

const ITEMS: { icon: keyof typeof Ionicons.glyphMap; title: string; desc: string }[] = [
  {
    icon: "musical-notes",
    title: "Дуу сонгох",
    desc: "Нүүр дэлгэцийн жагсаалтаас дуу дарна. Дуу, дуучин, төрлөөр хайж болно.",
  },
  {
    icon: "phone-portrait",
    title: "Чичиргээ мэдрэх",
    desc: "Дуу тоглуулахад утас хэмнэлээр чичирнэ. Цохилт бүр нь тухайн дууны бодит хэмнэлээс гардаг — санамсаргүй давтамж биш.",
  },
  {
    icon: "radio-button-on",
    title: "Нүдээр мэдрэх",
    desc: "Тоглуулагч дээрх цагираг цохилт бүрд томорно. Энэ нь чичиргээнээс тусдаа суваг — чичиргээ унтраасан ч ажиллана.",
  },
  {
    icon: "options",
    title: "Өөрт тааруулах",
    desc: "Профайл → Мэдрэхүй хэсгээс чичиргээний хүчээ сонгоно. Калибровкоор давтамжийн гурван бүсийг тус тусад нь тохируулна.",
  },
  {
    icon: "heart",
    title: "Цуглуулга",
    desc: "Дуртай, хадгалсан дуу болон өөрийн жагсаалтууд «Миний сан» табад цугларна.",
  },
  {
    icon: "stats-chart",
    title: "Статистик",
    desc: "Хэдэн дуу сонссон, хэр удаан, хэдэн удаа чичиргээтэй сонссоноо «Статистик» табаас харна.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Чичиргээ огт мэдрэгдэхгүй байна",
    a:
      "Эхлээд Нүүр дэлгэцийн «Сул · Дунд · Хүчтэй» гурван товчийг дарж үзнэ үү. Эдгээр нь дууны өгөгдлөөс хамаардаггүй тул шууд мотор руу очно.\n\n" +
      "Мэдрэгдэхгүй бол утасны тохиргоог шалгана: батарей хэмнэх горим (олон утсан дээр моторыг бүрэн хаадаг), дуугүй/Бүү саад бол горим, «Хүрэлтийн чичиргээ» унтарсан эсэх.\n\n" +
      "Хурдан шалгах арга: утасныхаа гар (keyboard) дээр бичихэд чичирдэг үү? Чичрэхгүй бол асуудал утасны тохиргоонд байна.",
  },
  {
    q: "Зарим дуу чичрэхгүй тоглож байна",
    a:
      "Чичиргээ нь дууны цохилтын өгөгдөл дээр тулгуурладаг. Тэр өгөгдөл нь дуу шинжлэгдэж дуусахад л үүсдэг.\n\n" +
      "Дууны мөрөнд «READY» гэж бичээтэй бол чичиргээтэй, «PENDING» бол хараахан шинжлэгдээгүй. Тоглуулагч дээр ч «✓ N цохилт» эсвэл «⚠ Энэ дуу шинжлэгдээгүй» гэж тодорхой бичдэг.",
  },
  {
    q: "Гурван товч ижил хүчтэй мэдрэгдэж байна",
    a:
      "Энэ бол таны утасны моторын онцлог. Зарим утас чичиргээний ЭРЧМИЙГ удирдаж чаддаггүй, зөвхөн асаах/унтраах хоёрыг л мэддэг.\n\n" +
      "Тэр тохиолдолд эрчмийн оронд ХУГАЦААНЫ ялгаа үлдэнэ (Сул нь богино, Хүчтэй нь урт). Нүүр дэлгэц дээр таны утас алийг нь дэмждэгийг бичиж харуулна.",
  },
  {
    q: "iPhone дээр чичирнэ үү?",
    a:
      "Тийм. Энэ апп iPhone-ий Taptic Engine-ийг ашигладаг тул чичиргээ ажиллана.\n\n" +
      "Гэхдээ iPhone-ий БРАУЗЕРААР (Safari) вэб сайт руу орвол чичрэхгүй — iOS нь вэбийн чичиргээний API-г дэмждэггүй. Тиймээс iPhone дээр аппаар нь ашиглах нь зөв.",
  },
  {
    q: "Тохиргоо минь алга болох уу?",
    a:
      "Калибровкийн тохиргоо (давтамжийн бүс, ерөнхий хүч) нь СЕРВЕРТ хадгалагдана — өөр төхөөрөмжөөс нэвтэрсэн ч, вэб дээр ч дагана.\n\n" +
      "Чичиргээ асаах/унтраах зэрэг хурдан тохиргоо нь энэ утсан дээр л хадгалагдана.",
  },
  {
    q: "Калибровкоо буруу хийчихсэн бол?",
    a: "Ямар ч үед дахин хийж болно. Профайл → «Калибровк хийх» рүү орж, бүс бүрийг дахин мэдэрч үзээд тохиргоогоо өөрчилнө. Өөрчлөлт шууд хадгалагдана.",
  },
];

function FaqRow({ item }: { item: (typeof FAQ)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <View className="bg-surface border border-line rounded-chip mb-2 overflow-hidden">
      <Pressable
        className="flex-row items-center justify-between px-4 py-3.5 active:bg-surface-2"
        onPress={() => setOpen((v) => !v)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={item.q}
      >
        <Text className="text-ink text-body font-semibold flex-1 mr-3">{item.q}</Text>
        <Ionicons name={open ? "remove" : "add"} size={18} color="#38e8ce" />
      </Pressable>
      {open && (
        <Text className="text-dim text-body leading-5 px-4 pb-4 border-t border-line pt-3">{item.a}</Text>
      )}
    </View>
  );
}

export default function HelpScreen() {
  const router = useRouter();

  // Native дуудлага тул нэг л удаа асууна.
  const device = useMemo(() => new PhoneDevice(), []);

  /* Гарчиг ба тайлбар нь ХООРОНДОО ДАВХАРДАХГҮЙ байх ёстой.
     `device.reason` нь Нүүр/Профайл дээр ДАНГААРАА гарах учир бүтэн өгүүлбэр
     байдаг ("утасны мотор амплитуд дэмжихгүй — зөвхөн хугацаагаар ялгарна").
     Түүнийг энд гарчигтай хамт тавихад ижил үг хоёр удаа гарч байсныг браузерын
     зураглалаар илрүүлэв. Иймд энд гарчгийг НӨХӨХ тайлбарыг тусад нь бичнэ. */
  const { label: backendLabel, note } = {
    amplitude: {
      label: "Эрчмийн 256 түвшин",
      note: "Таны төхөөрөмж чичиргээний хүчийг нарийн удирдаж чадна — хамгийн бүрэн боломж.",
    },
    waveform: {
      label: "Зөвхөн хугацаагаар ялгарна",
      note: "Мотор нь эрчмээ өөрчилж чаддаггүй тул Сул/Дунд/Хүчтэй нь урт богиноороо ялгарна.",
    },
    preset: {
      label: "3 бэлэн түвшин",
      note: "Системийн бэлэн чичиргээ ашиглаж байна (Expo Go). Хүч нь гурван шатлалтай.",
    },
    none: {
      label: "Чичиргээ байхгүй",
      note: "Энэ орчинд чичиргээний ямар ч суваг олдсонгүй. Дэлгэцийн пульс ажилласаар байна.",
    },
  }[device.backend];

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="px-5 pt-4">
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Буцах">
          <Text className="text-dim text-copy">‹ Буцах</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Text className="text-ink text-3xl font-bold mt-3">Тусламж</Text>
        <Text className="text-dim text-note mt-1 leading-5">
          МЭДРЭХ нь хөгжмийг чичиргээ болон гэрлээр мэдрүүлдэг. Доор үндсэн боломжуудыг
          тайлбарлав.
        </Text>

        {/* Төхөөрөмжийн бодит төлөв — асуудал шийдэхэд хамгийн эхэнд хэрэгтэй
            мэдээлэл тул хамгийн дээр тавив. */}
        <View className="bg-surface-2 border border-line rounded-lg px-4 py-3 mt-6">
          <Text className="text-faint text-caption">ТАНЫ УТАСНЫ ЧИЧИРГЭЭ</Text>
          <Text
            className={device.backend === "none" ? "text-warm text-title font-semibold mt-1" : "text-aqua text-title font-semibold mt-1"}
          >
            {backendLabel}
          </Text>
          <Text className="text-faint text-caption mt-1 leading-4">{note}</Text>
        </View>

        <Text className="text-ink text-heading font-semibold mt-8 mb-3">Үндсэн боломжууд</Text>
        {ITEMS.map((x) => (
          <View key={x.title} className="bg-surface border border-line rounded-lg px-4 py-3.5 mb-2 flex-row">
            <View className="w-9 h-9 rounded-chip bg-aqua/10 items-center justify-center mr-3">
              <Ionicons name={x.icon} size={18} color="#38e8ce" />
            </View>
            <View className="flex-1">
              <Text className="text-ink text-body font-semibold">{x.title}</Text>
              <Text className="text-dim text-note mt-1 leading-5">{x.desc}</Text>
            </View>
          </View>
        ))}

        <Text className="text-ink text-heading font-semibold mt-8 mb-3">Түгээмэл асуулт</Text>
        {FAQ.map((x) => (
          <FaqRow key={x.q} item={x} />
        ))}

        <Pressable
          className="bg-surface border border-aqua/40 rounded-lg px-4 py-3.5 mt-6 flex-row items-center"
          onPress={() => router.push("/calibrate")}
          accessibilityRole="button"
          accessibilityLabel="Мэдрэхүйн калибровк хийх"
        >
          <View className="flex-1">
            <Text className="text-aqua text-body font-semibold">Мэдрэхүйн калибровк</Text>
            <Text className="text-faint text-caption mt-0.5 leading-4">
              Давтамжийн гурван бүсийг мэдэрч, өөрт тохируулна
            </Text>
          </View>
          <Text className="text-aqua text-body ml-3">›</Text>
        </Pressable>

        {/* Монгол дохионы хэлний видео — вэб дээрх `MslVideoSection`-ийн дүйцэл.
            Бодит видео бэлэн болоогүй тул ХУУРАМЧ тоглуулагч харуулахгүй, ил тод
            "хараахан алга" төлөв харуулна. */}
        <View className="border border-dashed border-line rounded-lg px-4 py-4 mt-3">
          <Text className="text-ink text-body font-semibold">Дохионы хэлний видео удахгүй</Text>
          <Text className="text-faint text-caption mt-1 leading-4">
            Энэ хэсэгт аппыг хэрхэн ашиглахыг Монгол дохионы хэлээр тайлбарласан видео
            байрлана.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
