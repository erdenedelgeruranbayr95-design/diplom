import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/lib/auth/AuthContext";
import { API_URL } from "@/lib/config";

export default function LoginScreen() {
  // Нэвтэрсний дараах чиглүүлэлтийг `_layout.tsx`-ийн AuthGate хийнэ — `user`
  // солигдоход тэр өөрөө /home рүү шилжүүлнэ. Router нь зөвхөн бүртгүүлэх рүү очиход.
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !busy;

  async function onSubmit() {
    if (!canSubmit) return;
    setBusy(true);
    setError(null);
    try {
      await login(email.trim(), password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Нэвтэрч чадсангүй");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View className="flex-1 justify-center px-6">
          <Text className="text-aqua text-4xl font-bold tracking-tight">МЭДРЭХ</Text>
          <Text className="text-dim text-copy mt-2 mb-8">Хөгжмийг арьсаараа</Text>

          <View className="gap-3">
            <TextInput
              className="bg-surface border border-line-field rounded-sm text-ink text-copy px-4 py-3.5"
              placeholder="Имэйл"
              placeholderTextColor="#768583"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!busy}
            />
            <TextInput
              className="bg-surface border border-line-field rounded-sm text-ink text-copy px-4 py-3.5"
              placeholder="Нууц үг"
              placeholderTextColor="#768583"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!busy}
              onSubmitEditing={onSubmit}
            />
          </View>

          {error && <Text className="text-danger text-note mt-3">{error}</Text>}

          <Pressable
            className={`rounded-full items-center justify-center py-4 mt-6 ${canSubmit ? "bg-aqua" : "bg-aqua/40"}`}
            onPress={onSubmit}
            disabled={!canSubmit}
            accessibilityRole="button"
            accessibilityLabel="Нэвтрэх"
          >
            {busy ? (
              <ActivityIndicator color="#04100e" />
            ) : (
              <Text className="text-on-aqua text-title font-semibold">Нэвтрэх</Text>
            )}
          </Pressable>

          <Pressable
            className="mt-5 items-center py-2"
            onPress={() => router.push("/register")}
            accessibilityRole="button"
            accessibilityLabel="Шинэ бүртгэл үүсгэх"
          >
            <Text className="text-dim text-body">
              Бүртгэлгүй юу? <Text className="text-aqua">Бүртгүүлэх</Text>
            </Text>
          </Pressable>

          {/* Хөгжүүлэлтийн үед аль backend рүү холбогдож байгааг шалгахад тусална —
              бодит утаснаас localhost ажиллахгүй тул энэ мөр буруу IP-г шууд илчилнэ. */}
          <Text className="text-faint text-micro mt-8 text-center">{API_URL}</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
