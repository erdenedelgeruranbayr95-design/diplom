"use client";

import { useMemo } from "react";
import * as api from "@/lib/api/client";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import type { AdminUserRow } from "@/types/auth";
import type { Artist, Song } from "@/types/song";
import type { TherapistAssignmentRow } from "@/types/therapy";

/* Root Panel-ийн бүх тоо ЗӨВХӨН одоо байгаа endpoint-оос гарна:
     GET /users · GET /songs · GET /artists · GET /assignments/therapists
   Шинэ backend API зохиомжлоогүй. Эх сурвалжгүй метрикийг (Online, Revenue,
   Connected Devices, QR Sessions) `null` буцааж, UI нь "—" + шалтгааныг харуулна —
   хуурамч тоо ХЭЗЭЭ Ч гаргахгүй. */

export interface RootMetric {
  /** `null` = энэ тоог өгөх backend API одоогоор байхгүй. */
  value: number | null;
  /** `value === null` үед харагдах шалтгаан. */
  unavailableReason?: string;
}

export interface RootMetrics {
  totalUsers: RootMetric;
  onlineUsers: RootMetric;
  premiumUsers: RootMetric;
  revenue: RootMetric;
  songs: RootMetric;
  therapists: RootMetric;
  parents: RootMetric;
  connectedDevices: RootMetric;
  qrSessions: RootMetric;
}

export interface RootData {
  users: AdminUserRow[];
  songs: Song[];
  artists: Artist[];
  assignments: TherapistAssignmentRow[];
  metrics: RootMetrics;
  loading: boolean;
  error: string;
  reload: () => void;
}

interface RootSnapshot {
  users: AdminUserRow[];
  songs: Song[];
  artists: Artist[];
  assignments: TherapistAssignmentRow[];
  revenue: number | null;
}
const EMPTY: RootSnapshot = { users: [], songs: [], artists: [], assignments: [], revenue: null };

const live = (value: number): RootMetric => ({ value });
const missing = (reason: string): RootMetric => ({ value: null, unavailableReason: reason });

export function useRootMetrics(enabled: boolean): RootData {
  const { data, loading, error, reload } = useAsyncResource<RootSnapshot>(
    async () => {
      /* `allSettled` — нэг endpoint унасан ч самбар бүхэлдээ хоосон болохгүй. */
      const [users, songs, artists, assignments, revenue] = await Promise.allSettled([
        api.listUsers(),
        api.listSongs(),
        api.listArtists(),
        api.listTherapistAssignments(),
        api.getRevenue(),
      ]);
      return {
        users: users.status === "fulfilled" ? users.value : [],
        songs: songs.status === "fulfilled" ? songs.value : [],
        artists: artists.status === "fulfilled" ? artists.value : [],
        assignments: assignments.status === "fulfilled" ? assignments.value : [],
        revenue: revenue.status === "fulfilled" ? revenue.value.total : null,
      };
    },
    [],
    { initialData: EMPTY, enabled, errorMessage: "Root өгөгдөл ачаалахад алдаа гарлаа" },
  );

  const metrics = useMemo<RootMetrics>(() => {
    const { users, songs } = data;
    /* ROOT/ADMIN нь "хэрэглэгч" биш — платформын ажилтан тул тоолохгүй
       (AdminPanel-ийн `regular` тооцоолол ижил зарчимтай). */
    const staffRoles = new Set(["ROOT", "ADMIN"]);
    const regular = users.filter((u) => !staffRoles.has(u.role));

    return {
      totalUsers: live(regular.length),
      onlineUsers: missing("Идэвхтэй сесс тоолох endpoint байхгүй (WebSocket presence шаардлагатай)"),
      premiumUsers: live(users.filter((u) => u.subActive).length),
      revenue: data.revenue !== null ? live(data.revenue) : missing("GET /revenue дуудлага амжилтгүй боллоо"),
      songs: live(songs.length),
      therapists: live(users.filter((u) => u.role === "THERAPIST").length),
      parents: live(users.filter((u) => u.role === "PARENT").length),
      connectedDevices: missing("QRSession-ийг бүхэлд нь жагсаах endpoint байхгүй"),
      qrSessions: missing("GET /qr/sessions (жагсаалт) байхгүй — зөвхөн token-оор дан унших"),
    };
  }, [data]);

  return { ...data, metrics, loading, error, reload };
}
