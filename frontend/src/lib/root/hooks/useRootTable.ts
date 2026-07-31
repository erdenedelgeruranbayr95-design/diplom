"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/* Root Panel-ийн хүснэгтийн ГАНЦ төлөвийн хөдөлгүүр — хайлт · эрэмбэ · хуудаслалт ·
   олноор сонгох. Бүх боловсруулалт CLIENT талд (GET /users нэг удаа авчирсан
   өгөгдөл дээр) — шинэ backend endpoint шаардахгүй.

   User · Admin · PRO гурван удирдлагын хуудас энэ нэг hook-ийг хуваалцана. */

export type SortDirection = "asc" | "desc";

export interface RootSort {
  key: string;
  direction: SortDirection;
}

export interface RootTableOptions<T> {
  rows: T[];
  /** Мөр бүрийн тогтвортой түлхүүр (сонголтод ашиглана). */
  getId: (row: T) => string;
  /** Хайлтад хамрагдах текстүүд. */
  searchText: (row: T) => string;
  /** Эрэмбэлэх утга — багана бүрд. */
  sortValue: (row: T, key: string) => string | number;
  initialSort?: RootSort;
  pageSize?: number;
}

export interface RootTable<T> {
  query: string;
  setQuery: (q: string) => void;

  sort: RootSort | null;
  toggleSort: (key: string) => void;

  page: number;
  setPage: (p: number) => void;
  pageSize: number;
  totalPages: number;
  /** Шүүлт + эрэмбийн дараах БҮХ мөр (CSV экспорт үүнийг ашиглана). */
  rows: T[];
  /** Одоогийн хуудсанд харагдах мөрүүд. */
  pageRows: T[];

  selectedIds: string[];
  isSelected: (id: string) => boolean;
  toggleRow: (id: string) => void;
  /** Одоогийн хуудсын бүх мөрийг сонгох/цуцлах. */
  togglePage: () => void;
  pageAllSelected: boolean;
  clearSelection: () => void;
  /** Сонгогдсон мөрүүдийн бодит объектууд. */
  selectedRows: T[];
}

const DEFAULT_PAGE_SIZE = 12;

export function useRootTable<T>({
  rows,
  getId,
  searchText,
  sortValue,
  initialSort,
  pageSize = DEFAULT_PAGE_SIZE,
}: RootTableOptions<T>): RootTable<T> {
  const [query, setQueryRaw] = useState("");
  const [sort, setSort] = useState<RootSort | null>(initialSort ?? null);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  /* Хайлт өөрчлөгдөхөд эхний хуудас руу буцна — эс бол хоосон хуудсанд гацна. */
  const setQuery = useCallback((q: string) => {
    setQueryRaw(q);
    setPage(1);
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) => searchText(row).toLowerCase().includes(term));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, query]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const va = sortValue(a, sort.key);
      const vb = sortValue(b, sort.key);
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * factor;
      return String(va).localeCompare(String(vb), "mn") * factor;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));

  /* Мөрийн тоо буурч одоогийн хуудас байхгүй болбол сүүлийн хуудас руу шилжинэ. */
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageRows = useMemo(() => sorted.slice((page - 1) * pageSize, page * pageSize), [sorted, page, pageSize]);

  const toggleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null; // 3 дахь дарахад эрэмбэ цуцлагдана
    });
    setPage(1);
  }, []);

  const isSelected = useCallback((id: string) => selected.has(id), [selected]);

  const toggleRow = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const pageIds = useMemo(() => pageRows.map(getId), [pageRows, getId]);
  const pageAllSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));

  const togglePage = useCallback(() => {
    setSelected((prev) => {
      const next = new Set(prev);
      const allOn = pageIds.length > 0 && pageIds.every((id) => next.has(id));
      pageIds.forEach((id) => (allOn ? next.delete(id) : next.add(id)));
      return next;
    });
  }, [pageIds]);

  const clearSelection = useCallback(() => setSelected(new Set()), []);

  /* Мөр устсан үед (жишээ нь bulk delete-ийн дараа) сонголт өнчрөхөөс сэргийлнэ. */
  const availableIds = useMemo(() => new Set(rows.map(getId)), [rows, getId]);
  const selectedIds = useMemo(() => [...selected].filter((id) => availableIds.has(id)), [selected, availableIds]);
  const selectedRows = useMemo(() => {
    const set = new Set(selectedIds);
    return rows.filter((row) => set.has(getId(row)));
  }, [rows, selectedIds, getId]);

  return {
    query,
    setQuery,
    sort,
    toggleSort,
    page,
    setPage,
    pageSize,
    totalPages,
    rows: sorted,
    pageRows,
    selectedIds,
    isSelected,
    toggleRow,
    togglePage,
    pageAllSelected,
    clearSelection,
    selectedRows,
  };
}
