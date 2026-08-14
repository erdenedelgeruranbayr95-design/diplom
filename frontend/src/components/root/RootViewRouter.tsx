"use client";

import RootDashboard from "./views/RootDashboard";
import RootAnalytics from "./views/RootAnalytics";
import RootUserList from "./views/RootUserList";
import RootSongs from "./views/RootSongs";
import RootPro from "./views/RootPro";
import RootBroadcast from "./views/RootBroadcast";
import RootAuditLogs from "./views/RootAuditLogs";
import RootSecurity from "./views/RootSecurity";
import RootMonitoring from "./views/RootMonitoring";
import RootStorage from "./views/RootStorage";
import type { RootData } from "@/lib/root/hooks/useRootMetrics";
import type { RootSection } from "@/types/root";

/* Root Panel-ийн дэлгэц сонгогч — `PlayerViewRouter`-тэй ижил хэв маяг.
   Хэрэглэгчийн 4 жагсаалт (Хэрэглэгчид · Админууд · Уран бүтээлчид ·
   Куратор·Модератор) нь НЭГ `RootUserList`-ээр зурагдана, зөвхөн дүрийн
   шүүлт нь өөр. Бүгд GET /users дээр суурилна. */
const USER_LISTS = {
  users: {
    title: "Хэрэглэгчид",
    description: "Платформын ажилтнаас бусад бүх бүртгэл.",
    roles: undefined,
    emptyTitle: "Хэрэглэгч алга",
  },
  admins: {
    title: "Админууд",
    description: "Системийн эзэмшигч ба админ эрхтэй ажилтнууд.",
    roles: ["ROOT", "ADMIN"] as const,
    emptyTitle: "Админ алга",
  },
  artists: {
    title: "Уран бүтээлчид",
    description: "Дуу, цомгоо өөрсдөө байршуулдаг бүртгэлүүд.",
    roles: ["ARTIST"] as const,
    emptyTitle: "Уран бүтээлч алга",
  },
  staff: {
    title: "Куратор · Модератор",
    description: "Каталог болон гомдол хариуцсан ажилтнууд.",
    roles: ["CURATOR", "MODERATOR"] as const,
    emptyTitle: "Куратор/Модератор алга — дүр солих цэснээс хэрэглэгчид энэ эрхийг олгоно уу",
  },
} as const;

export default function RootViewRouter({ section, data }: { section: RootSection; data: RootData }) {
  if (section === "dashboard") return <RootDashboard data={data} />;
  if (section === "analytics") return <RootAnalytics data={data} />;

  if (section === "users" || section === "admins" || section === "artists" || section === "staff") {
    const config = USER_LISTS[section];
    return (
      <RootUserList
        data={data}
        eyebrow="ROOT"
        title={config.title}
        description={config.description}
        roles={config.roles ? [...config.roles] : undefined}
        emptyTitle={config.emptyTitle}
        showCreateStaff={section === "admins"}
      />
    );
  }

  if (section === "songs") return <RootSongs data={data} />;
  if (section === "pro") return <RootPro data={data} />;
  if (section === "broadcast") return <RootBroadcast />;
  if (section === "security") return <RootSecurity data={data} />;
  if (section === "audit") return <RootAuditLogs />;
  if (section === "monitoring") return <RootMonitoring />;
  if (section === "storage") return <RootStorage />;

  return null;
}
