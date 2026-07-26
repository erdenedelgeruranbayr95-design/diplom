/* Дахин ашиглагдах төлвүүд: Loading / Skeleton / Empty / Error.
   Ямар ч хуудсанд <Loading/>, <Skeleton .../>, <Empty .../>, <ErrorState .../> гэж ашиглана. */
import type { ReactNode } from "react";

export function Loading({ label = "Ачааллаж байна…" }: { label?: string }) {
  return (
    <div className="state state-loading" role="status" aria-live="polite">
      <span className="state-spinner" aria-hidden="true"></span>
      <p>{label}</p>
    </div>
  );
}

/* Агуулгын хэлбэртэй shimmer placeholder — spinner-ийн оронд list/card ачаалж буйг илэрхийлнэ.
   `rows` нь variant="row"-д хэдэн мөр давтахыг зааж өгнө. */
export function Skeleton({
  variant = "row",
  rows = 4,
}: {
  variant?: "row" | "card" | "text";
  rows?: number;
}) {
  if (variant === "text") {
    return <span className="skel skel-text" aria-hidden="true"></span>;
  }
  if (variant === "card") {
    return (
      <div className="skel-cards" role="status" aria-label="Ачааллаж байна…">
        {Array.from({ length: rows }).map((_, i) => (
          <div className="skel skel-card" key={i} style={{ animationDelay: i * 0.06 + "s" }}></div>
        ))}
      </div>
    );
  }
  return (
    <div className="skel-rows" role="status" aria-label="Ачааллаж байна…">
      {Array.from({ length: rows }).map((_, i) => (
        <div className="skel skel-row" key={i} style={{ animationDelay: i * 0.06 + "s" }}></div>
      ))}
    </div>
  );
}

export function Empty({
  icon = "🎵",
  title = "Хоосон байна",
  hint,
  action,
}: {
  icon?: string;
  title?: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="state state-empty">
      <span className="state-ic" aria-hidden="true">
        {icon}
      </span>
      <b>{title}</b>
      {hint && <p>{hint}</p>}
      {action}
    </div>
  );
}

export function ErrorState({
  title = "Алдаа гарлаа",
  hint,
  onRetry,
}: {
  title?: string;
  hint?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="state state-error" role="alert">
      <span className="state-ic" aria-hidden="true">
        ⚠️
      </span>
      <b>{title}</b>
      {hint && <p>{hint}</p>}
      {onRetry && (
        <button className="bt bt-a" onClick={onRetry}>
          Дахин оролдох
        </button>
      )}
    </div>
  );
}
