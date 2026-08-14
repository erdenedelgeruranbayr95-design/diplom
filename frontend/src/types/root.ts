/* Root Panel-ийн домэйн төрлүүд. UI-гүй давхарга — `components/root/*` эндээс уншина. */

export type RootSection =
  | "dashboard"
  | "analytics"
  | "users"
  | "admins"
  | "artists"
  | "staff"
  | "songs"
  | "pro"
  | "broadcast"
  | "security"
  | "audit"
  | "monitoring"
  | "storage";

export interface RootNavItem {
  id: RootSection;
  label: string;
  icon: string;
  /** Хэсэг бүлэглэх толгой (sidebar-ын харагдац). */
  group: "Тойм" | "Хэрэглэгч" | "Контент" | "Систем";
}

/* Sidebar-ын хэсгүүд. Бүгд бодит өгөгдөл дээр бүрэн ажиллана — агуулгагүй эсвэл
   давхардсан хэсгүүдийг (Төхөөрөмж · Өгөгдлийн сан · Тохиргоо · Нөөцлөлт ·
   Гомдол · Төлбөр) самбараас бүрмөсөн хассан. Захиалгын төлбөрийг «PRO эрх»
   хэсэг болон админ самбарын PRO удирдлагаас харна. */
export const ROOT_NAV: RootNavItem[] = [
  { id: "dashboard", label: "Хяналтын самбар", icon: "grid", group: "Тойм" },
  { id: "analytics", label: "Аналитик", icon: "chart", group: "Тойм" },

  { id: "users", label: "Хэрэглэгчид", icon: "users", group: "Хэрэглэгч" },
  { id: "admins", label: "Админууд", icon: "shield", group: "Хэрэглэгч" },
  { id: "artists", label: "Уран бүтээлчид", icon: "mic", group: "Хэрэглэгч" },
  { id: "staff", label: "Куратор · Модератор", icon: "vest", group: "Хэрэглэгч" },

  { id: "songs", label: "Дууны сан", icon: "music", group: "Контент" },
  { id: "pro", label: "PRO эрх", icon: "crown", group: "Контент" },

  { id: "broadcast", label: "Зарлал", icon: "megaphone", group: "Систем" },
  { id: "security", label: "Аюулгүй байдал", icon: "eye", group: "Систем" },
  { id: "audit", label: "Аудит лог", icon: "clipboard", group: "Систем" },
  { id: "monitoring", label: "Мониторинг", icon: "activity", group: "Систем" },
  { id: "storage", label: "Файл сан", icon: "upload", group: "Систем" },
];

export const ROOT_NAV_GROUPS = ["Тойм", "Хэрэглэгч", "Контент", "Систем"] as const;
