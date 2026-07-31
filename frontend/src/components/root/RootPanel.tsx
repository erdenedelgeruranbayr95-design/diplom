"use client";

import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Empty } from "@/components/ui/States";
import Icon from "@/components/ui/Icon";
import { useAuth } from "@/components/providers/AuthProvider";
import { useEscapeStack } from "@/hooks/useEscapeStack";
import { useBodyClass } from "@/hooks/useBodyClass";
import { useRootMetrics } from "@/lib/root/hooks/useRootMetrics";
import RootSidebar from "./RootSidebar";
import RootViewRouter from "./RootViewRouter";
import type { RootSection } from "@/types/root";

/* Root Panel — систем эзэмшигчийн бүтэн дэлгэцийн самбар.

   Эрхийн хамгаалалт 2 давхар:
     · энд `isRoot` шалгана (UI давхарга — зөвхөн UX)
     · backend-ийн `RolesGuard` дээр ROOT шатлал (ЖИНХЭНЭ шалгалт)
   Frontend дэх нуулт нь хэзээ ч ганц хамгаалалт болохгүй — API бүр өөрөө шалгана.

   Player.tsx-ийн бүрхүүлтэй ижил зарчим: TopBar-гүй, өөрийн sidebar + PageContainer. */
export default function RootPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, isRoot } = useAuth();
  const [section, setSection] = useState<RootSection>("dashboard");

  /* Hook-уудыг эрт буцахаас ӨМНӨ дуудна (Rules of Hooks). */
  const data = useRootMetrics(open && isRoot);
  useBodyClass("native-cursor", open);
  useEscapeStack([{ active: true, onEscape: onClose }], { enabled: open });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9200] flex flex-col p-0 overflow-hidden [animation:aov_.35s_ease] [backdrop-filter:blur(24px)] [background:radial-gradient(1100px_560px_at_80%_-10%,rgba(240,140,165,.05),transparent_58%),linear-gradient(180deg,#0b0e0e,#070909_62%)]">
      <header className="relative z-[6] flex items-center gap-6 max-nav:gap-3 h-[70px] px-6 max-nav:px-4 bg-[rgba(9,12,12,.78)] backdrop-blur-3xl [backdrop-filter:blur(22px)_saturate(1.2)] border-b border-white/[.07]">
        <span className="font-display font-extrabold text-heading max-nav:text-lead tracking-[-.04em] whitespace-nowrap [&>sup]:font-body [&>sup]:text-micro [&>sup]:font-medium [&>sup]:ml-0.5">
          МЭДРЭХ<sup>®</sup>
          <em className="not-italic font-mono text-micro tracking-[.2em] text-rose border border-rose/45 rounded-full py-[3px] px-[9px] ml-2.5 align-[3px]">
            ROOT
          </em>
        </span>

        <span className="mono !text-meta max-nav:hidden ml-auto mr-2">Систем эзэмшигчийн самбар</span>

        <button
          className="w-11 h-11 flex-none rounded-full flex items-center justify-center text-dim transition-colors duration-250 hover:text-ink hover:bg-white/[.07] focus-visible:outline-none focus-visible:shadow-glow-aqua max-nav:ml-auto"
          onClick={onClose}
          aria-label="Хаах"
          title="Хаах (Esc)"
        >
          <Icon name="close" size={17} />
        </button>
      </header>

      <div className="relative z-[2] flex flex-1 min-h-0 w-full max-nav:flex-col">
        {isRoot ? (
          <>
            <RootSidebar section={section} onSelect={setSection} email={user?.email || ""} />
            <div className="flex min-w-0 flex-1">
              <PageContainer>
                <RootViewRouter section={section} data={data} />
              </PageContainer>
            </div>
          </>
        ) : (
          <PageContainer>
            <Empty
              icon="shield"
              title="Энэ самбарт хандах эрхгүй"
              hint="Root Panel-д зөвхөн ROOT дүртэй систем эзэмшигч нэвтэрнэ."
            />
          </PageContainer>
        )}
      </div>
    </div>
  );
}
