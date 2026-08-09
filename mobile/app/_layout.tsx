import "../global.css";

import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider, useAuth } from "@/lib/auth/AuthContext";
import { PreferencesProvider } from "@/lib/prefs/PreferencesContext";

/* Нэвтрэлтийн хамгаалалт — нэвтрээгүй хэрэглэгчийг нэвтрэх дэлгэц рүү, нэвтэрсэн
   хэрэглэгчийг нүүр рүү автоматаар шилжүүлнэ.

   `ready` дуустал ЮУ Ч ХИЙХГҮЙ: апп ачаалахад сесс сэргээх `refresh()` хүсэлт
   явж байх зуур `user` нь түр `null` байдаг тул тэр агшинд чиглүүлэл хийвэл
   аль хэдийн нэвтэрсэн хэрэглэгчийг ч нэвтрэх дэлгэц рүү шидэж эхэлнэ. */
function AuthGate() {
  const { user, ready } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    /* Нэвтрэхгүйгээр орж болох дэлгэцүүд. `/register`-ийг оруулаагүй бол
       бүртгүүлэх гэж дарсан хэрэглэгчийг шууд нэвтрэх дэлгэц рүү буцаана. */
    const isPublic = pathname === "/" || pathname === "/register";
    if (!user && !isPublic) router.replace("/");
    else if (user && isPublic) router.replace("/home");
  }, [user, ready, pathname, router]);

  if (!ready) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <ActivityIndicator color="#38e8ce" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#070a0a" },
        animation: "fade",
      }}
    />
  );
}

/* Хэрэглэгчид цайвар/бараан сонголт өгдөггүй — МЭДРЭХ нь ЗӨВХӨН бараан загвартай
   (вэбийн `globals.css`-ийн `color-scheme: dark`-тай ижил). */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <PreferencesProvider>
        <AuthProvider>
          <AuthGate />
        </AuthProvider>
      </PreferencesProvider>
    </SafeAreaProvider>
  );
}
