"use client";

/* Admin панелаас PRO эрх Grant/Remove хийх ДЕМО давхарга — backend дээр
   subActive/subPlan-ийг бичих PATCH/PUT endpoint огт байхгүй (зөвхөн GET /users уншиж,
   POST/DELETE л бий — users.controller.ts баталгаажуулсан). Шинэ endpoint зохиомжлохгүй
   гэсэн шаардлагыг хатуу баримталсан тул энэ модуль localStorage-д per-user "override"
   хадгалж, жинхэнэ GET /users-ийн үр дүнг client талд л дарж бичдэг (applySubOverrides).
   Backend/JWT/DB огт хөндөгдөөгүй — зөвхөн admin-ий энэ browser session дотор харагдана. */
export interface SubOverride {
  subActive: boolean;
  subPlan: string | null;
  updatedAt: number;
}

const KEY = "medreh_admin_sub_overrides";

function loadAll(): Record<string, SubOverride> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") || {};
  } catch {
    return {};
  }
}

function saveAll(map: Record<string, SubOverride>) {
  localStorage.setItem(KEY, JSON.stringify(map));
  dispatchEvent(new CustomEvent("medreh:sub-overrides-changed"));
}

export function setSubOverride(userId: string, subActive: boolean, subPlan: string | null) {
  const map = loadAll();
  map[userId] = { subActive, subPlan, updatedAt: Date.now() };
  saveAll(map);
}

export function applySubOverrides<T extends { id: string; subActive: boolean; subPlan: string | null }>(users: T[]): T[] {
  const map = loadAll();
  return users.map((u) => {
    const o = map[u.id];
    if (!o) return u;
    return { ...u, subActive: o.subActive, subPlan: o.subPlan };
  });
}
