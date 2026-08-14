"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faClockRotateLeft, faGear, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import QuickAction from "@/components/player/shared/QuickAction";
import { useTrackActions } from "@/components/player/PlayerContext";

/** Нүүрийн толгой — дүрд тохирсон шуурхай товчлолууд.
 *
 *  Урьд нь энд «Өглөөний мэнд, [нэр]» гэсэн мэндчилгээ, «Өнөөдөр юу сонсох вэ?»
 *  гэсэн дэд гарчиг байсныг хассан (гар утасны хувилбартай нэгдсэн). */
export default function HomeGreeting({ isAdmin }: { isAdmin: boolean }) {
  const { setView } = useTrackActions();

  return (
    <div className="mb-8">
      <div className="flex gap-2.5 flex-wrap">
        <QuickAction icon={<FontAwesomeIcon icon={faHeadphones} />} label="Жагсаалтууд" onClick={() => setView("playlists")} />
        <QuickAction icon={<FontAwesomeIcon icon={faClockRotateLeft} />} label="Сонссон түүх" onClick={() => setView("history")} />
        <QuickAction icon={<FontAwesomeIcon icon={faChartLine} />} label="Статистик" onClick={() => setView("stats")} />
        {isAdmin && <QuickAction icon={<FontAwesomeIcon icon={faGear} />} label="Хяналтын самбар" onClick={() => setView("admin")} />}
      </div>
    </div>
  );
}
