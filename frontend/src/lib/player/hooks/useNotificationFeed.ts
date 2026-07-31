"use client";

import { useCallback, useEffect, useState } from "react";
import * as api from "@/lib/api/client";
import { APP_EVENTS } from "@/lib/data/events";
import { useWindowEvent } from "@/hooks/useWindowEvent";
import type { FeedItem } from "@/types/track";

/* Мэдэгдлийн feed ба "уншсан" тэмдэглэгээ.

   ⚠️ Урьд нь энэ бүхэн localStorage (`medreh_feed`) дээр байсан. Тиймээс админы
   "Зарлал" нь ЗӨВХӨН зарлал илгээсэн админы өөрийнх нь browser-т хүрдэг байсан ч
   UI нь "бүх хэрэглэгчид илгээгдлээ" гэж бичдэг байв. Одоо `GET /notifications`
   (өөрийн мэдэгдэл + бүх broadcast) — жинхэнэ хүрнэ.

   `notifyFeed` унтраалттай үед мэдэгдэл ХҮЛЭЭН АВАХГҮЙ — жагсаалт хоосон, хонхны
   тоолуур гарахгүй. Серверт мэдэгдлүүд хэвээр үлдэх тул тохиргоог буцааж асаахад
   бүгд эргэж харагдана (мэдээлэл алдагдахгүй). */

export interface NotificationFeed {
  feed: FeedItem[];
  /** Хамгийн сүүлд уншсан мөч — үүнээс хойшхи мэдэгдлүүд "шинэ" гэж тоологдоно. */
  readTs: number;
  /** Хонхны цэс нээгдэх мөчид дуудна. */
  markRead: () => void;
}

export function useNotificationFeed({
  enabled,
  email,
  notifyEnabled,
}: {
  enabled: boolean;
  email: string;
  notifyEnabled: boolean;
}): NotificationFeed {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [readTs, setReadTs] = useState(0);

  const refresh = useCallback(() => {
    if (!email) return;
    api
      .listNotifications()
      .then(({ items, readAt }) => {
        setFeed(
          items.map((n) => ({
            id: new Date(n.createdAt).getTime(),
            text: n.text,
            icon: n.icon,
            date: new Date(n.createdAt).getTime(),
          })),
        );
        setReadTs(readAt ? new Date(readAt).getTime() : 0);
      })
      .catch(() => {});
  }, [email]);

  useEffect(() => {
    if (!enabled) return;
    if (!notifyEnabled) {
      setFeed([]);
      return;
    }
    refresh();
  }, [enabled, notifyEnabled, refresh]);

  /* Админ зарлал илгээмэгц ижил tab дээр шууд шинэчлэгдэнэ. */
  useWindowEvent(APP_EVENTS.feedChanged, refresh, { enabled: enabled && notifyEnabled });

  const markRead = useCallback(() => {
    if (!email) return;
    api
      .markNotificationsRead()
      .then(({ readAt }) => {
        /* Богино саатал — цэс нээгдмэгц "шинэ" тэмдэг алга болохоос сэргийлж,
           хэрэглэгч юу шинэ байсныг харах завтай болно. */
        setTimeout(() => setReadTs(new Date(readAt).getTime()), 600);
      })
      .catch(() => {});
  }, [email]);

  return { feed, readTs, markRead };
}
