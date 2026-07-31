"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faClockRotateLeft,
  faGear,
  faHeadphones,
  faPeopleRoof,
  faTrophy,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import QuickAction from "@/components/player/shared/QuickAction";
import { useTrackActions } from "@/components/player/PlayerContext";
import { firstNameOf, greetingForHour } from "@/lib/player/greeting";

/** Нүүрийн толгой — мэндчилгээ + дүрд тохирсон шуурхай товчлолууд. */
export default function HomeGreeting({
  userName,
  isAdmin,
  isTherapist,
  isParent,
}: {
  userName?: string;
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
}) {
  const { setView } = useTrackActions();
  const firstName = firstNameOf(userName);

  return (
    <div className="mb-8">
      <h1 className="font-display font-bold text-[30px] max-nav:text-[24px] tracking-[-.03em] leading-tight text-ink">
        {greetingForHour()}
        {firstName ? `, ${firstName}` : ""}
      </h1>
      <p className="mt-1.5 text-dim text-lead">Өнөөдөр юу сонсох вэ?</p>

      <div className="flex gap-2.5 flex-wrap mt-5">
        <QuickAction icon={<FontAwesomeIcon icon={faHeadphones} />} label="Жагсаалтууд" onClick={() => setView("playlists")} />
        <QuickAction icon={<FontAwesomeIcon icon={faClockRotateLeft} />} label="Сонссон түүх" onClick={() => setView("history")} />
        <QuickAction icon={<FontAwesomeIcon icon={faChartLine} />} label="Миний ахиц" onClick={() => setView("progress")} />
        <QuickAction icon={<FontAwesomeIcon icon={faTrophy} />} label="Амжилтууд" onClick={() => setView("achievements")} />
        {isAdmin && <QuickAction icon={<FontAwesomeIcon icon={faGear} />} label="Хяналтын самбар" onClick={() => setView("admin")} />}
        {isTherapist && <QuickAction icon={<FontAwesomeIcon icon={faUserNurse} />} label="Эмчийн самбар" onClick={() => setView("therapist")} />}
        {isParent && <QuickAction icon={<FontAwesomeIcon icon={faPeopleRoof} />} label="Эцэг эхийн самбар" onClick={() => setView("parent")} />}
      </div>
    </div>
  );
}
