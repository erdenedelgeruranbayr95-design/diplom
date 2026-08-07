import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Empty, ErrorState, Loading } from "@/components/States";
import { fetchUsers, updateUserStatus } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import type { AdminUserRow } from "@/types";

const ROLE_COLOR: Record<string, string> = {
  ROOT: "text-rose",
  ADMIN: "text-warm",
  CURATOR: "text-purple",
  MODERATOR: "text-purple",
  THERAPIST: "text-aqua",
  PARENT: "text-aqua",
  USER: "text-dim",
};

export default function AdminScreen() {
  const { isRoot, user: me } = useAuth();
  const [users, setUsers] = useState<AdminUserRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setUsers(await fetchUsers());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Хэрэглэгчид ачаалж чадсангүй");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  /* Блоклох/сэргээх нь ЗӨВХӨН ROOT-д (backend: @Roles(Role.ROOT)). ADMIN энэ товчийг
     огт харахгүй — дарж 403 авах нь эндүүрэл төрүүлнэ. */
  const toggleStatus = useCallback(
    (row: AdminUserRow) => {
      const next = row.status === "ACTIVE" ? "BANNED" : "ACTIVE";
      const verb = next === "BANNED" ? "блоклох" : "сэргээх";
      Alert.alert(
        `${row.name}-ийг ${verb} уу?`,
        row.email,
        [
          { text: "Болих", style: "cancel" },
          {
            text: next === "BANNED" ? "Блоклох" : "Сэргээх",
            style: next === "BANNED" ? "destructive" : "default",
            onPress: async () => {
              setBusyId(row.id);
              try {
                await updateUserStatus(row.id, next);
                setUsers((prev) => prev?.map((u) => (u.id === row.id ? { ...u, status: next } : u)) ?? null);
              } catch (e) {
                Alert.alert("Алдаа", e instanceof Error ? e.message : "Өөрчилж чадсангүй");
              } finally {
                setBusyId(null);
              }
            },
          },
        ],
        { cancelable: true },
      );
    },
    [],
  );

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="px-5 pt-4 pb-3">
        <Text className="text-ink text-3xl font-bold">Админ</Text>
        <Text className="text-dim text-note mt-1">
          {users ? `${users.length} хэрэглэгч` : "Ачаалж байна…"}
          {!isRoot && " · зөвхөн харах эрх"}
        </Text>
      </View>

      <FlatList
        data={users ?? []}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-5 pb-8"
        ItemSeparatorComponent={() => <View className="h-2" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38e8ce" />}
        ListEmptyComponent={
          error ? (
            <ErrorState message={error} onRetry={load} />
          ) : !users ? (
            <Loading />
          ) : (
            <Empty title="Хэрэглэгч алга." />
          )
        }
        renderItem={({ item }) => (
          <View className="bg-surface border border-line rounded-lg px-4 py-3">
            <View className="flex-row items-center">
              <View className="flex-1">
                <Text className="text-ink text-body font-semibold" numberOfLines={1}>
                  {item.name}
                  {item.id === me?.id && <Text className="text-faint text-caption"> (та)</Text>}
                </Text>
                <Text className="text-dim text-caption mt-0.5" numberOfLines={1}>
                  {item.email}
                </Text>
              </View>
              <Text className={`text-micro font-mono ml-3 ${ROLE_COLOR[item.role] ?? "text-dim"}`}>{item.role}</Text>
            </View>

            <View className="flex-row items-center justify-between mt-2.5">
              <View className="flex-row items-center gap-2">
                <Text className={item.status === "ACTIVE" ? "text-aqua text-micro font-mono" : "text-danger text-micro font-mono"}>
                  {item.status}
                </Text>
                {item.subActive && <Text className="text-warm text-micro font-mono">{item.subPlan ?? "SUB"}</Text>}
              </View>

              {/* Өөрийгөө блоклохоос сэргийлнэ — админ өөрийгөө түгжвэл сэргээх арга алга. */}
              {isRoot && item.id !== me?.id && (
                <Pressable
                  className="px-3 py-1.5 rounded-chip border border-line-2"
                  onPress={() => toggleStatus(item)}
                  disabled={busyId === item.id}
                  accessibilityRole="button"
                  accessibilityLabel={item.status === "ACTIVE" ? `${item.name}-ийг блоклох` : `${item.name}-ийг сэргээх`}
                >
                  {busyId === item.id ? (
                    <ActivityIndicator size="small" color="#768583" />
                  ) : (
                    <Text className={item.status === "ACTIVE" ? "text-danger text-caption" : "text-aqua text-caption"}>
                      {item.status === "ACTIVE" ? "Блоклох" : "Сэргээх"}
                    </Text>
                  )}
                </Pressable>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
