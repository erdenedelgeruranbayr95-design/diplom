"use client";

import type { ReactNode } from "react";
import { Empty } from "@/components/ui/States";
import Icon from "@/components/ui/Icon";
import type { RootTable as RootTableState } from "@/lib/root/hooks/useRootTable";

/* Root Panel-ийн ерөнхий хүснэгт — эрэмбэ · хуудаслалт · олноор сонгох.
   Player-ийн `TableCard` хэв маягийг дагана (glass gradient, hairline хүрээ, sticky толгой),
   гэхдээ багана тодорхойлолт нь өгөгдлөөс хамааралгүй ерөнхий. */

export interface RootColumn<T> {
  key: string;
  label: string;
  /** CSS grid-ийн багана өргөн (жишээ нь "1.2fr", "90px"). */
  width: string;
  sortable?: boolean;
  align?: "left" | "right" | "center";
  /** Нарийн дэлгэцэд нуух эсэх. */
  hideOn?: "viz" | "nav";
  render: (row: T) => ReactNode;
}

const HIDE_CLS = { viz: "max-viz:hidden", nav: "max-nav:hidden" } as const;
const ALIGN_CLS = { left: "", right: "text-right justify-self-end", center: "text-center justify-self-center" } as const;

function gridTemplate<T>(columns: RootColumn<T>[], selectable: boolean, hasActions: boolean) {
  const parts = columns.map((c) => c.width);
  if (selectable) parts.unshift("36px");
  if (hasActions) parts.push("auto");
  return parts.join(" ");
}

export default function RootTable<T>({
  table,
  columns,
  getId,
  selectable = false,
  renderActions,
  emptyIcon = "users",
  emptyTitle,
  emptyHint,
  rowLabel = (id: string) => `Мөр ${id}`,
}: {
  table: RootTableState<T>;
  columns: RootColumn<T>[];
  getId: (row: T) => string;
  selectable?: boolean;
  renderActions?: (row: T) => ReactNode;
  emptyIcon?: string;
  emptyTitle: string;
  emptyHint?: string;
  /** Сонгох checkbox-ийн дэлгэц уншигчид зориулсан нэр. */
  rowLabel?: (id: string, row: T) => string;
}) {
  const hasActions = !!renderActions;
  const template = gridTemplate(columns, selectable, hasActions);

  if (table.rows.length === 0) {
    return <Empty icon={emptyIcon} title={emptyTitle} hint={emptyHint} />;
  }

  return (
    <>
      <div className="overflow-hidden rounded-card border border-white/[.08] bg-[rgba(11,16,16,.55)] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,.045)]">
        {/* ---- толгой ---- */}
        <div
          className="grid gap-3 items-center py-3 px-4 border-b border-white/[.08] bg-white/[.025]"
          style={{ gridTemplateColumns: template }}
          role="row"
        >
          {selectable && (
            <span className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[var(--aqua)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/60 rounded"
                checked={table.pageAllSelected}
                onChange={table.togglePage}
                aria-label="Энэ хуудсын бүх мөрийг сонгох"
              />
            </span>
          )}
          {columns.map((col) => {
            const active = table.sort?.key === col.key;
            const cls = "mono " + (col.hideOn ? HIDE_CLS[col.hideOn] + " " : "") + (ALIGN_CLS[col.align || "left"] || "");
            if (!col.sortable) {
              return (
                <span key={col.key} className={cls}>
                  {col.label}
                </span>
              );
            }
            return (
              <span
                key={col.key}
                role="columnheader"
                aria-sort={active ? (table.sort?.direction === "asc" ? "ascending" : "descending") : "none"}
              >
                <button
                  type="button"
                  className={
                    cls +
                    " inline-flex items-center gap-1.5 transition-colors duration-150 rounded focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                    (active ? "!text-aqua" : "hover:!text-ink")
                  }
                  onClick={() => table.toggleSort(col.key)}
                  aria-label={`${col.label} багнаар эрэмбэлэх`}
                >
                  {col.label}
                  <span
                    className={"flex transition-transform duration-200 " + (active ? "opacity-100" : "opacity-30")}
                    style={active && table.sort?.direction === "desc" ? { transform: "rotate(180deg)" } : undefined}
                    aria-hidden="true"
                  >
                    <Icon name="arrowDown" size={11} strokeWidth={2.4} />
                  </span>
                </button>
              </span>
            );
          })}
          {hasActions && <span className="mono text-right">Үйлдэл</span>}
        </div>

        {/* ---- мөрүүд ---- */}
        {table.pageRows.map((row, i) => {
          const id = getId(row);
          const checked = table.isSelected(id);
          return (
            <div
              key={id}
              className={
                "grid gap-3 items-center py-3 px-4 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.035] [animation:row-in_.28s_cubic-bezier(.2,.8,.2,1)_backwards] motion-reduce:[animation:none] " +
                (checked ? "bg-aqua/[.06]" : "")
              }
              style={{ gridTemplateColumns: template, animationDelay: i < 8 ? `${i * 0.025}s` : undefined }}
              role="row"
            >
              {selectable && (
                <span className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[var(--aqua)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/60 rounded"
                    checked={checked}
                    onChange={() => table.toggleRow(id)}
                    aria-label={rowLabel(id, row)}
                  />
                </span>
              )}
              {columns.map((col) => (
                <span
                  key={col.key}
                  className={
                    "min-w-0 " + (col.hideOn ? HIDE_CLS[col.hideOn] + " " : "") + (ALIGN_CLS[col.align || "left"] || "")
                  }
                >
                  {col.render(row)}
                </span>
              ))}
              {hasActions && <span className="flex items-center gap-1.5 justify-end">{renderActions(row)}</span>}
            </div>
          );
        })}
      </div>

      <RootPagination table={table} />
    </>
  );
}

function RootPagination<T>({ table }: { table: RootTableState<T> }) {
  if (table.totalPages <= 1) {
    return <p className="mono !text-micro mt-3">{table.rows.length.toLocaleString()} мөр</p>;
  }

  const from = (table.page - 1) * table.pageSize + 1;
  const to = Math.min(table.page * table.pageSize, table.rows.length);
  const btn =
    "w-9 h-9 flex-none rounded-lg flex items-center justify-center border border-white/[.1] text-dim transition-colors duration-150 hover:text-ink hover:bg-white/[.06] disabled:opacity-35 disabled:pointer-events-none focus-visible:outline-none focus-visible:shadow-glow-aqua";

  return (
    <nav className="flex items-center justify-between gap-4 flex-wrap mt-4" aria-label="Хуудаслалт">
      <span className="mono !text-micro">
        {from.toLocaleString()}–{to.toLocaleString()} / {table.rows.length.toLocaleString()}
      </span>
      <div className="flex items-center gap-1.5">
        <button className={btn} onClick={() => table.setPage(1)} disabled={table.page === 1} aria-label="Эхний хуудас">
          «
        </button>
        <button className={btn} onClick={() => table.setPage(table.page - 1)} disabled={table.page === 1} aria-label="Өмнөх хуудас">
          <Icon name="arrowLeft" size={14} />
        </button>
        <span className="mono !text-meta px-3 tabular-nums" aria-current="page">
          {table.page} / {table.totalPages}
        </span>
        <button
          className={btn}
          onClick={() => table.setPage(table.page + 1)}
          disabled={table.page === table.totalPages}
          aria-label="Дараагийн хуудас"
        >
          <Icon name="arrowRight" size={14} />
        </button>
        <button
          className={btn}
          onClick={() => table.setPage(table.totalPages)}
          disabled={table.page === table.totalPages}
          aria-label="Сүүлийн хуудас"
        >
          »
        </button>
      </div>
    </nav>
  );
}
