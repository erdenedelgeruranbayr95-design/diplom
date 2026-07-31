"use client";

/* CSV экспорт — бүхэлдээ browser талд, backend API шаардахгүй.
   Excel Монгол кирилл текстийг зөв уншихын тулд UTF-8 BOM нэмнэ. */

const BOM = "﻿";

function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const text = String(value);
  /* Хашилт, таслал, мөр таслалт агуулсан утгыг хашилтад хийж, доторх хашилтыг давхарлана. */
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export function toCsv(headers: string[], rows: unknown[][]): string {
  return BOM + [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\r\n");
}

/** Файл болгож татаж авна (blob URL нь татаж дуусмагц чөлөөлөгдөнө). */
export function downloadCsv(filename: string, headers: string[], rows: unknown[][]): void {
  const blob = new Blob([toCsv(headers, rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** `medreh-users-2026-07-31.csv` маягийн огноотой нэр. */
export function timestampedName(prefix: string): string {
  return `medreh-${prefix}-${new Date().toISOString().slice(0, 10)}.csv`;
}
