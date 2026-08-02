"use client";

import RootDashboard from "./views/RootDashboard";
import RootAnalytics from "./views/RootAnalytics";
import RootUserList from "./views/RootUserList";
import RootSongs from "./views/RootSongs";
import RootPro from "./views/RootPro";
import RootBroadcast from "./views/RootBroadcast";
import RootAuditLogs from "./views/RootAuditLogs";
import RootSecurity from "./views/RootSecurity";
import RootPayments from "./views/RootPayments";
import RootReports from "./views/RootReports";
import RootMonitoring from "./views/RootMonitoring";
import { RootBackup, RootDatabase, RootDevices, RootSettings } from "./views/RootPendingSections";
import RootStorage from "./views/RootStorage";
import type { RootData } from "@/lib/root/hooks/useRootMetrics";
import type { RootSection } from "@/types/root";

/* Root Panel-ийн дэлгэц сонгогч — `PlayerViewRouter`-тэй ижил хэв маяг.
   Хэрэглэгчийн 4 жагсаалт (Хэрэглэгчид · Админууд · Эмч нар · Эцэг эхчүүд) нь
   НЭГ `RootUserList`-ээр зурагдана, зөвхөн дүрийн шүүлт нь өөр. */
const USER_LISTS = {
  users: {
    title: "Хэрэглэгчид",
    description: "GET /users — ROOT ба ADMIN-аас бусад бүх бүртгэл.",
    roles: undefined,
    emptyTitle: "Хэрэглэгч алга",
  },
  admins: {
    title: "Админууд",
    description: "GET /users — ROOT ба ADMIN дүртэй платформын ажилтнууд.",
    roles: ["ROOT", "ADMIN"] as const,
    emptyTitle: "Админ алга",
  },
  therapists: {
    title: "Эмч нар",
    description: "GET /users — THERAPIST дүртэй бүртгэлүүд.",
    roles: ["THERAPIST"] as const,
    emptyTitle: "Эмч алга",
  },
  staff: {
    title: "Куратор · Модератор",
    description: "GET /users — CURATOR/MODERATOR дүртэй платформын ажилтнууд.",
    roles: ["CURATOR", "MODERATOR"] as const,
    emptyTitle: "Куратор/Модератор алга — дүр солих dropdown-оор хэрэглэгчийг эдгээр эрхэд шилжүүлнэ үү",
  },
  parents: {
    title: "Эцэг эхчүүд",
    description: "GET /users — PARENT дүртэй бүртгэлүүд.",
    roles: ["PARENT"] as const,
    emptyTitle: "Эцэг эх алга",
  },
} as const;

export default function RootViewRouter({ section, data }: { section: RootSection; data: RootData }) {
  if (section === "dashboard") return <RootDashboard data={data} />;
  if (section === "analytics") return <RootAnalytics data={data} />;

  if (section === "users" || section === "admins" || section === "therapists" || section === "parents" || section === "staff") {
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
  if (section === "payments") return <RootPayments />;
  if (section === "reports") return <RootReports />;
  if (section === "security") return <RootSecurity data={data} />;
  if (section === "audit") return <RootAuditLogs />;
  if (section === "monitoring") return <RootMonitoring />;

  /* ---- Backend API хүлээгдэж буй хэсгүүд ---- */
  if (section === "devices") return <RootDevices />;
  if (section === "storage") return <RootStorage />;
  if (section === "database") return <RootDatabase />;
  if (section === "settings") return <RootSettings />;
  if (section === "backup") return <RootBackup />;

  return null;
}
