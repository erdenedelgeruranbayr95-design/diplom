"use client";

/* Curator Panel — контент лиценз/нийтлэл/ингестийн самбар (CURATOR/MODERATOR, ADMIN/ROOT-д ч
   нэвтэрнэ). RootPanel.tsx-ийн яг ижил бүрхүүл: TopBar-гүй, өөрийн header + tab + PageContainer.
   Эрхийн хамгаалалт 2 давхар: энд `isCurator` (UI давхарга), backend-ийн RolesGuard (ЖИНХЭНЭ). */
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Empty } from "@/components/ui/States";
import Icon from "@/components/ui/Icon";
import { useAuth } from "@/components/providers/AuthProvider";
import { useEscapeStack } from "@/hooks/useEscapeStack";
import { useBodyClass } from "@/hooks/useBodyClass";
import CuratorCatalog from "./CuratorCatalog";
import CuratorImportSearch from "./CuratorImportSearch";

type CuratorTab = "catalog" | "import";

export default function CuratorPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, isCurator } = useAuth();
  const [tab, setTab] = useState<CuratorTab>("catalog");

  useBodyClass("native-cursor", open);
  useEscapeStack([{ active: true, onEscape: onClose }], { enabled: open });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9200] flex flex-col p-0 overflow-hidden [animation:aov_.35s_ease] [backdrop-filter:blur(24px)] [background:radial-gradient(1100px_560px_at_80%_-10%,rgba(180,156,255,.05),transparent_58%),linear-gradient(180deg,#0b0e0e,#070909_62%)]">
      <header className="relative z-[6] flex items-center gap-6 max-nav:gap-3 h-[70px] px-6 max-nav:px-4 bg-[rgba(9,12,12,.78)] backdrop-blur-3xl [backdrop-filter:blur(22px)_saturate(1.2)] border-b border-white/[.07]">
        <span className="font-display font-extrabold text-heading max-nav:text-lead tracking-[-.04em] whitespace-nowrap [&>sup]:font-body [&>sup]:text-micro [&>sup]:font-medium [&>sup]:ml-0.5">
          МЭДРЭХ<sup>®</sup>
          <em className="not-italic font-mono text-micro tracking-[.2em] text-purple border border-purple/45 rounded-full py-[3px] px-[9px] ml-2.5 align-[3px]">
            КУРАТОР
          </em>
        </span>

        {isCurator && (
          <nav className="flex items-center gap-1.5 max-nav:hidden" aria-label="Куратор таб">
            <button
              className={
                "text-body py-2 px-4 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                (tab === "catalog" ? "bg-purple/[.14] text-purple border border-purple/40" : "text-dim border border-transparent hover:text-ink hover:bg-white/[.05]")
              }
              onClick={() => setTab("catalog")}
              aria-pressed={tab === "catalog"}
            >
              Каталог
            </button>
            <button
              className={
                "text-body py-2 px-4 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                (tab === "import" ? "bg-purple/[.14] text-purple border border-purple/40" : "text-dim border border-transparent hover:text-ink hover:bg-white/[.05]")
              }
              onClick={() => setTab("import")}
              aria-pressed={tab === "import"}
            >
              Импортын хайлт
            </button>
          </nav>
        )}

        <span className="mono !text-meta max-nav:hidden ml-auto mr-2">Контент · лиценз · ингест</span>

        <button
          className="w-11 h-11 flex-none rounded-full flex items-center justify-center text-dim transition-colors duration-250 hover:text-ink hover:bg-white/[.07] focus-visible:outline-none focus-visible:shadow-glow-aqua max-nav:ml-auto"
          onClick={onClose}
          aria-label="Хаах"
          title="Хаах (Esc)"
        >
          <Icon name="close" size={17} />
        </button>
      </header>

      {isCurator && (
        <nav className="hidden max-nav:flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[.07] overflow-x-auto" aria-label="Куратор таб">
          <button
            className={
              "text-body py-2 px-4 rounded-full whitespace-nowrap transition-colors duration-200 " +
              (tab === "catalog" ? "bg-purple/[.14] text-purple border border-purple/40" : "text-dim border border-transparent")
            }
            onClick={() => setTab("catalog")}
          >
            Каталог
          </button>
          <button
            className={
              "text-body py-2 px-4 rounded-full whitespace-nowrap transition-colors duration-200 " +
              (tab === "import" ? "bg-purple/[.14] text-purple border border-purple/40" : "text-dim border border-transparent")
            }
            onClick={() => setTab("import")}
          >
            Импортын хайлт
          </button>
        </nav>
      )}

      <div className="relative z-[2] flex flex-1 min-h-0 w-full">
        {isCurator ? (
          <PageContainer>
            {tab === "catalog" && <CuratorCatalog />}
            {tab === "import" && <CuratorImportSearch />}
            <p className="mt-8 pt-4 border-t border-white/[.07] mono !text-micro">Нэвтэрсэн: {user?.email}</p>
          </PageContainer>
        ) : (
          <PageContainer>
            <Empty icon="shield" title="Энэ самбарт хандах эрхгүй" hint="Curator Panel-д зөвхөн CURATOR/MODERATOR (болон ADMIN/ROOT) дүр нэвтэрнэ." />
          </PageContainer>
        )}
      </div>
    </div>
  );
}
