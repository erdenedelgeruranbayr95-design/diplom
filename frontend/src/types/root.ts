/* Root Panel-ийн домэйн төрлүүд. UI-гүй давхарга — `components/root/*` эндээс уншина. */

export type RootSection =
  | "dashboard"
  | "analytics"
  | "users"
  | "admins"
  | "therapists"
  | "parents"
  | "staff"
  | "songs"
  | "payments"
  | "pro"
  | "devices"
  | "reports"
  | "broadcast"
  | "security"
  | "audit"
  | "monitoring"
  | "storage"
  | "database"
  | "settings"
  | "backup";

export interface RootNavItem {
  id: RootSection;
  label: string;
  icon: string;
  /** Хэсэг бүлэглэх толгой (sidebar-ын харагдац). */
  group: "Тойм" | "Хэрэглэгч" | "Контент" | "Систем";
  /** Одоо байгаа backend API-аар бүрэн ажиллах эсэх. */
  live: boolean;
}

/* Sidebar-ын 18 хэсэг. `live: false` нь "backend API одоогоор БАЙХГҮЙ" гэсэн үг —
   тэдгээр дэлгэц хуурамч тоо харуулахгүй, юу шаардлагатайг ил тодорхой бичнэ
   (шинэ API зохиомжлохгүй гэсэн шаардлагыг баримталсан). */
export const ROOT_NAV: RootNavItem[] = [
  { id: "dashboard", label: "Хяналтын самбар", icon: "grid", group: "Тойм", live: true },
  { id: "analytics", label: "Аналитик", icon: "chart", group: "Тойм", live: true },

  { id: "users", label: "Хэрэглэгчид", icon: "users", group: "Хэрэглэгч", live: true },
  { id: "admins", label: "Админууд", icon: "shield", group: "Хэрэглэгч", live: true },
  { id: "therapists", label: "Эмч нар", icon: "stethoscope", group: "Хэрэглэгч", live: true },
  { id: "parents", label: "Эцэг эхчүүд", icon: "family", group: "Хэрэглэгч", live: true },
  { id: "staff", label: "Куратор · Модератор", icon: "shield", group: "Хэрэглэгч", live: true },

  { id: "songs", label: "Дууны сан", icon: "music", group: "Контент", live: true },
  { id: "payments", label: "Төлбөр", icon: "money", group: "Контент", live: true },
  { id: "pro", label: "PRO эрх", icon: "crown", group: "Контент", live: true },
  { id: "devices", label: "Төхөөрөмж", icon: "device", group: "Контент", live: false },

  { id: "reports", label: "Гомдол", icon: "alert", group: "Систем", live: true },
  { id: "broadcast", label: "Зарлал", icon: "megaphone", group: "Систем", live: true },
  { id: "security", label: "Аюулгүй байдал", icon: "eye", group: "Систем", live: true },
  { id: "audit", label: "Аудит лог", icon: "clipboard", group: "Систем", live: true },
  { id: "monitoring", label: "Мониторинг", icon: "activity", group: "Систем", live: true },
  { id: "storage", label: "Файл сан", icon: "upload", group: "Систем", live: false },
  { id: "database", label: "Өгөгдлийн сан", icon: "disc", group: "Систем", live: false },
  { id: "settings", label: "Тохиргоо", icon: "settings", group: "Систем", live: false },
  { id: "backup", label: "Нөөцлөлт", icon: "clock", group: "Систем", live: false },
];

export const ROOT_NAV_GROUPS = ["Тойм", "Хэрэглэгч", "Контент", "Систем"] as const;
