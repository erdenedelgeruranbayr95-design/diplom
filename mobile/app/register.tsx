import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/lib/auth/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  /* Сервер талд ч шалгагдана (RegisterDto) — энэ нь зөвхөн хэрэглэгчийг хүсэлт
     илгээхээс өмнө анхааруулах, сүлжээний нэмэлт эргэлтээс сэргийлэх зорилготой. */
  const mismatch = password2.length > 0 && password !== password2;
  const canSubmit = name.trim().length > 0 && email.trim().length > 0 && password.length >= 6 && !mismatch && !busy;

  async function onSubmit() {
    if (!canSubmit) return;
    setBusy(true);
    setError(null);
    try {
      // Амжилттай бол AuthGate өөрөө /home руу шилжүүлнэ.
      await register(name.trim(), email.trim(), password, password2);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Бүртгүүлж чадсангүй");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-8" keyboardShouldPersistTaps="handled">
          <Text className="text-ink text-3xl font-bold">Бүртгүүлэх</Text>
          <Text className="text-dim text-copy mt-1 mb-7">МЭДРЭХ-д шинэ бүртгэл үүсгэнэ</Text>

          <TextInput
            className="bg-surface border border-line-field rounded-sm text-ink text-copy px-4 py-3.5 mb-3"
            placeholder="Нэр"
            placeholderTextColor="#768583"
            value={name}
            onChangeText={setName}
            editable={!busy}
            accessibilityLabel="Нэр"
          />
          <TextInput
            className="bg-surface border border-line-field rounded-sm text-ink text-copy px-4 py-3.5 mb-3"
            placeholder="Имэйл"
            placeholderTextColor="#768583"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            editable={!busy}
            accessibilityLabel="Имэйл"
          />
          <TextInput
            className="bg-surface border border-line-field rounded-sm text-ink text-copy px-4 py-3.5 mb-3"
            placeholder="Нууц үг (6-аас дээш тэмдэгт)"
            placeholderTextColor="#768583"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!busy}
            accessibilityLabel="Нууц үг"
          />
          <TextInput
            className={`bg-surface border rounded-sm text-ink text-copy px-4 py-3.5 ${mismatch ? "border-danger" : "border-line-field"}`}
            placeholder="Нууц үг давтах"
            placeholderTextColor="#768583"
            secureTextEntry
            value={password2}
            onChangeText={setPassword2}
            editable={!busy}
            onSubmitEditing={onSubmit}
            accessibilityLabel="Нууц үг давтах"
          />

          {mismatch && <Text className="text-danger text-note mt-2">Нууц үг таарахгүй байна.</Text>}
          {error && <Text className="text-danger text-note mt-2">{error}</Text>}

          <Pressable
            className={`rounded-full items-center justify-center py-4 mt-6 ${canSubmit ? "bg-aqua" : "bg-aqua/40"}`}
            onPress={onSubmit}
            disabled={!canSubmit}
            accessibilityRole="button"
            accessibilityLabel="Бүртгүүлэх"
            accessibilityState={{ disabled: !canSubmit }}
          >
            {busy ? (
              <ActivityIndicator color="#04100e" />
            ) : (
              <Text className="text-on-aqua text-title font-semibold">Бүртгүүлэх</Text>
            )}
          </Pressable>

          <Pressable
            className="mt-5 items-center py-2"
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Нэвтрэх рүү буцах"
          >
            <Text className="text-dim text-body">Бүртгэлтэй юу? Нэвтрэх</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
