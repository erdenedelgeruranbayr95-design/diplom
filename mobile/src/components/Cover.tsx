import { useState } from "react";
import { Image, Text, View } from "react-native";

import { absoluteUrl } from "@/lib/config";

/* Дууны ковер зураг.

   `coverUrl` нь харьцангуй зам байдаг (`/gallery/gal-03.jpg`) тул `absoluteUrl()`
   -ээр бүтэн болгоно — эс бөгөөс утсан дээр зураг ачаалагдахгүй.

   Зураг байхгүй эсвэл ачаалахгүй бол дууны нэрийн ЭХНИЙ ҮСГИЙГ харуулна:
   хоосон дөрвөлжин байснаас хэрэглэгч дуунуудыг нүдээр ялгахад дөхөм. */
interface Props {
  url?: string | null;
  title: string;
  /** Талын урт (px). Дөрвөлжин. */
  size: number;
  rounded?: "md" | "lg" | "card";
}

const RADIUS = { md: "rounded-md", lg: "rounded-lg", card: "rounded-card" } as const;

export default function Cover({ url, title, size, rounded = "md" }: Props) {
  const [failed, setFailed] = useState(false);
  const src = absoluteUrl(url);
  const radius = RADIUS[rounded];

  if (!src || failed) {
    return (
      <View
        className={`${radius} bg-surface-2 border border-line items-center justify-center`}
        style={{ width: size, height: size }}
        accessibilityRole="image"
        accessibilityLabel={`${title} — зураггүй`}
      >
        <Text className="text-faint font-semibold" style={{ fontSize: size * 0.4 }}>
          {title.trim().charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: src }}
      style={{ width: size, height: size }}
      className={`${radius} bg-surface-2`}
      onError={() => setFailed(true)}
      accessibilityRole="image"
      accessibilityLabel={`${title}-ийн ковер`}
    />
  );
}
