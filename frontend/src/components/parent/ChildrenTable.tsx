"use client";

import UserAvatar from "@/components/ui/UserAvatar";
import { ActionButton } from "@/components/ui/ActionGroup";
import { TableCard } from "@/components/ui/Surface";
import Icon from "@/components/ui/Icon";
import type { LinkedChild } from "@/types/therapy";

/** Холбогдсон хүүхдүүдийн жагсаалт (эцэг эх 2+ хүүхэдтэй үед харагдана). */
export default function ChildrenTable({ links, onSelect }: { links: LinkedChild[]; onSelect: (child: LinkedChild) => void }) {
  return (
    <TableCard>
      <div className="grid grid-cols-[1.2fr_1.5fr_.9fr_.7fr] max-[760px]:grid-cols-[1fr_1fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
        <span className="mono">Хүүхэд</span>
        <span className="mono max-[760px]:hidden">Имэйл</span>
        <span className="mono">Холбогдсон</span>
        <span></span>
      </div>
      {links.map((link) => (
        <div
          className="grid grid-cols-[1.2fr_1.5fr_.9fr_.7fr] max-[760px]:grid-cols-[1fr_1fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
          key={link.id}
        >
          <span className="flex items-center gap-2.5 min-w-0">
            <UserAvatar name={link.child.name} size="sm" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">{link.child.name}</span>
          </span>
          <span className="text-dim whitespace-nowrap overflow-hidden text-ellipsis max-[760px]:hidden">{link.child.email}</span>
          <span className="text-faint font-mono text-caption">{new Date(link.createdAt).toLocaleDateString("mn-MN")}</span>
          <ActionButton variant="primary" size="sm" className="justify-self-end" onClick={() => onSelect(link)}>
            Нээх
            <Icon name="arrowRight" size={13} />
          </ActionButton>
        </div>
      ))}
    </TableCard>
  );
}
