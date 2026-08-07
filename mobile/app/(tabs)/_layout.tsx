import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";

import { useAuth } from "@/lib/auth/AuthContext";

/* Вэбийн хажуу цэсний (Sidebar) мобайл эквивалент. `(tabs)` бол зам үүсгэдэггүй
   БҮЛЭГ — `/home` нь `/home` хэвээр үлдэнэ, зөвхөн доод таб мөр нэмэгдэнэ.

   Админы таб нь эрхээс хамааран НУУГДАНА. Backend талд `GET /users` нь
   `@Roles(Role.ADMIN)`-оор хамгаалагдсан тул энгийн хэрэглэгч тэр дэлгэц рүү
   орлоо ч 403 л авна — энэ нь зөвхөн UI цэвэрлэгээ, аюулгүй байдлын хэрэгсэл БИШ. */

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

/** Дүрс заагаагүй үед Expo Router өгөгдмөл гурвалжин харуулдаг — таб бүрд
 *  тодорхой дүрс өгснөөр сонсголын бэрхшээлтэй хэрэглэгчид текст уншихгүйгээр
 *  таних боломжтой болно (визуал давхар дохио). */
function tabIcon(active: IoniconName, inactive: IoniconName) {
  return ({ color, focused, size }: { color: ColorValue; focused: boolean; size: number }) => (
    <Ionicons name={focused ? active : inactive} size={size} color={color as string} />
  );
}

export default function TabsLayout() {
  const { isAdmin } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#38e8ce",
        tabBarInactiveTintColor: "#768583",
        tabBarStyle: {
          backgroundColor: "#0d1414",
          borderTopColor: "rgba(242,245,244,0.11)",
        },
        sceneStyle: { backgroundColor: "#070a0a" },
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Нүүр", tabBarIcon: tabIcon("home", "home-outline") }} />
      <Tabs.Screen
        name="library"
        options={{ title: "Миний сан", tabBarIcon: tabIcon("heart", "heart-outline") }}
      />
      <Tabs.Screen
        name="stats"
        options={{ title: "Статистик", tabBarIcon: tabIcon("stats-chart", "stats-chart-outline") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Профайл", tabBarIcon: tabIcon("person", "person-outline") }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: "Админ",
          tabBarIcon: tabIcon("shield", "shield-outline"),
          // `href: null` нь табыг мөрөөс БҮРЭН хасна (зөвхөн нуухаас илүү) —
          // энгийн хэрэглэгчид энэ маршрут огт байхгүй мэт харагдана.
          href: isAdmin ? undefined : null,
        }}
      />
    </Tabs>
  );
}
