"use client";

import { useState } from "react";
import { ActionButton } from "@/components/ui/ActionGroup";
import { Panel, TableCard } from "@/components/ui/Surface";
import { SectionTitle } from "@/components/ui/PageHeader";
import { Empty, Loading } from "@/components/ui/States";
import { useToast } from "@/components/providers/ToastProvider";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { broadcastNotification, listNotifications } from "@/lib/api/client";
import { APP_EVENTS, emitAppEvent } from "@/lib/data/events";
import RootSection from "../RootSection";
import type { NotificationFeed } from "@/types/auth";

const EMPTY_FEED: NotificationFeed = { items: [], readAt: null };

/* Зарлал — POST /notifications/broadcast (`userId = null` тул БҮХ хэрэглэгчид хүрнэ).
   Илгээсэн зарлалуудыг GET /notifications-оор буцааж харуулна. */
export default function RootBroadcast() {
  const toast = useToast();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const { data: feed, loading, error, reload } = useAsyncResource<NotificationFeed>(() => listNotifications(), [], {
    initialData: EMPTY_FEED,
    errorMessage: "Мэдэгдэл ачаалахад алдаа гарлаа",
  });

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length < 3) {
      toast.error("Зарлалын текст дор хаяж 3 тэмдэгт байх ёстой");
      return;
    }
    setSending(true);
    try {
      await broadcastNotification(text.trim());
      setText("");
      toast.success("Зарлал бүх хэрэглэгчид илгээгдлээ ✓");
      emitAppEvent(APP_EVENTS.feedChanged);
      reload();
    } catch (err) {
      toast.error((err as Error).message || "Илгээхэд алдаа гарлаа");
    } finally {
      setSending(false);
    }
  }

  const broadcasts = feed.items.filter((n) => n.userId === null);

  return (
    <RootSection
      title="Зарлал"
      eyebrow="ROOT"
      description="Илгээсэн зарлал бүх хэрэглэгчийн мэдэгдлийн хонхонд шууд очно."
      error={error}
      onRetry={reload}
    >
      <Panel as="section">
        <form className="flex gap-2.5 max-nav:flex-col" onSubmit={send}>
          <input
            className="flex-1 px-4 py-3 rounded-full bg-white/[.05] border border-white/[.08] text-ink text-copy transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.08] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Бүх хэрэглэгчид хүргэх зарлал…"
            maxLength={500}
            aria-label="Зарлалын текст"
          />
          <ActionButton type="submit" variant="primary" size="lg" className="flex-none" disabled={sending}>
            {sending ? "Илгээж байна…" : "Илгээх"}
          </ActionButton>
        </form>
        <p className="mono !text-micro mt-3">{text.length} / 500 тэмдэгт</p>
      </Panel>

      <div className="mt-9">
        <SectionTitle title="Илгээсэн зарлалууд" description={`${broadcasts.length} зарлал`} />
      </div>

      {loading && <Loading label="Мэдэгдэл ачааллаж байна…" />}
      {!loading && broadcasts.length === 0 && <Empty icon="megaphone" title="Зарлал алга" hint="Дээрх талбараас эхний зарлалаа илгээнэ үү" />}
      {!loading && broadcasts.length > 0 && (
        <TableCard>
          <div className="grid grid-cols-[auto_1fr_.9fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Тэмдэг</span>
            <span className="mono">Текст</span>
            <span className="mono">Огноо</span>
          </div>
          {broadcasts.map((n) => (
            <div
              key={n.id}
              className="grid grid-cols-[auto_1fr_.9fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
            >
              <span aria-hidden="true">{n.icon}</span>
              <span className="min-w-0 truncate">{n.text}</span>
              <span className="font-mono text-caption text-faint">{new Date(n.createdAt).toLocaleString("mn-MN")}</span>
            </div>
          ))}
        </TableCard>
      )}
    </RootSection>
  );
}
