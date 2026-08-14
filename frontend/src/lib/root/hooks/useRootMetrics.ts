"use client";

import { useMemo } from "react";
import * as api from "@/lib/api/client";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import type { AdminUserRow } from "@/types/auth";
import type { Artist, Song } from "@/types/song";

/* Root Panel-ийн бүх тоо ЗӨВХӨН одоо байгаа endpoint-оос гарна:
     GET /users · GET /songs · GET /artists · GET /revenue
   Тухайн дуудлага унасан үед RootSection нь алдааны төлөвөө харуулна — өөрөөр
   хэлбэл дэлгэц дээр гарсан тоо бүр бодит өгөгдөл дээр тулгуурлана. */

export interface RootMetrics {
  totalUsers: number;
  premiumUsers: number;
  /** Нийт орлого (₮). Дуудлага унасан бол 0. */
  revenue: number;
  songs: number;
  artists: number;
  /** Уран бүтээлчийн эрхтэй бүртгэлийн тоо. */
  artistAccounts: number;
  /** Куратор + модератор — каталог хариуцсан ажилтан. */
  catalogStaff: number;
}

export interface RootData {
  users: AdminUserRow[];
  songs: Song[];
  artists: Artist[];
  metrics: RootMetrics;
  loading: boolean;
  error: string;
  reload: () => void;
}

interface RootSnapshot {
  users: AdminUserRow[];
  songs: Song[];
  artists: Artist[];
  revenue: number;
}
const EMPTY: RootSnapshot = { users: [], songs: [], artists: [], revenue: 0 };

export function useRootMetrics(enabled: boolean): RootData {
  const { data, loading, error, reload } = useAsyncResource<RootSnapshot>(
    async () => {
      /* `allSettled` — нэг endpoint унасан ч самбар бүхэлдээ хоосон болохгүй. */
      const [users, songs, artists, revenue] = await Promise.allSettled([
        api.listUsers(),
        api.listSongs(),
        api.listArtists(),
        api.getRevenue(),
      ]);
      return {
        users: users.status === "fulfilled" ? users.value : [],
        songs: songs.status === "fulfilled" ? songs.value : [],
        artists: artists.status === "fulfilled" ? artists.value : [],
        revenue: revenue.status === "fulfilled" ? revenue.value.total : 0,
      };
    },
    [],
    { initialData: EMPTY, enabled, errorMessage: "Root өгөгдөл ачаалахад алдаа гарлаа" },
  );

  const metrics = useMemo<RootMetrics>(() => {
    const { users, songs, artists } = data;
    /* ROOT/ADMIN нь "хэрэглэгч" биш — платформын ажилтан тул тоолохгүй
       (AdminPanel-ийн `regular` тооцоолол ижил зарчимтай). */
    const staffRoles = new Set(["ROOT", "ADMIN"]);
    const regular = users.filter((u) => !staffRoles.has(u.role));

    return {
      totalUsers: regular.length,
      premiumUsers: users.filter((u) => u.subActive).length,
      revenue: data.revenue,
      songs: songs.length,
      artists: artists.length,
      artistAccounts: users.filter((u) => u.role === "ARTIST").length,
      catalogStaff: users.filter((u) => u.role === "CURATOR" || u.role === "MODERATOR").length,
    };
  }, [data]);

  return { ...data, metrics, loading, error, reload };
}
