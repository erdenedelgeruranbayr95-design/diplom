"use client";

import RootDashboard from "./views/RootDashboard";
import RootAnalytics from "./views/RootAnalytics";
import RootUserList from "./views/RootUserList";
import RootSongs from "./views/RootSongs";
import RootPro from "./views/RootPro";
import RootBroadcast from "./views/RootBroadcast";
import {
  RootAuditLogs,
  RootBackup,
  RootDatabase,
  RootDevices,
  RootPayments,
  RootReports,
  RootSecurity,
  RootSettings,
  RootStorage,
} from "./views/RootPendingSections";
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

  if (section === "users" || section === "admins" || section === "therapists" || section === "parents") {
    const config = USER_LISTS[section];
    return (
      <RootUserList
        data={data}
        eyebrow="ROOT"
        title={config.title}
        description={config.description}
        roles={config.roles ? [...config.roles] : undefined}
        emptyTitle={config.emptyTitle}
      />
    );
  }

  if (section === "songs") return <RootSongs data={data} />;
  if (section === "pro") return <RootPro data={data} />;
  if (section === "broadcast") return <RootBroadcast />;

  /* ---- Backend API хүлээгдэж буй хэсгүүд ---- */
  if (section === "payments") return <RootPayments />;
  if (section === "devices") return <RootDevices />;
  if (section === "reports") return <RootReports />;
  if (section === "security") return <RootSecurity />;
  if (section === "audit") return <RootAuditLogs />;
  if (section === "storage") return <RootStorage />;
  if (section === "database") return <RootDatabase />;
  if (section === "settings") return <RootSettings />;
  if (section === "backup") return <RootBackup />;

  return null;
}
