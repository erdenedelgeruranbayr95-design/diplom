"use client";

import { useCallback, useEffect, useRef, useState, type DependencyList } from "react";

/* Backend-ээс өгөгдөл татах ердийн урсгалын ганц хувилбар.

   Урьд нь ArtistView · ProgressView · HistoryView · AnalysisView · TherapistView ·
   ParentView · AdminPanel · HomeView бүгд дараах ИЖИЛ 12 мөрийг хуулж бичсэн байв:

     const [data, setData]   = useState(...)
     const [loading, setLoading] = useState(true)
     const [err, setErr]     = useState("")
     function load() { setLoading(true); setErr(""); api()...finally(setLoading(false)) }
     useEffect(() => { load() }, [dep])

   Энэ hook нь яг ижил дараалал (loading=true → error цэвэрлэх → татах → loading=false)-ыг
   давтана, дээрээс нь unmount/дараалал зөрчихөөс хамгаалах `alive` хамгаалалтыг
   БҮХ дуудагчид автоматаар өгнө (өмнө нь зөвхөн заримд нь байсан). */

export interface AsyncResource<T> {
  /** Хамгийн сүүлд амжилттай татсан утга (эсвэл `initialData`). */
  data: T;
  /** Локал өөрчлөлт (жишээ нь мөр устгах) хийхэд ашиглана. */
  setData: React.Dispatch<React.SetStateAction<T>>;
  loading: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  /** Дахин татна — `<ErrorState onRetry>` болон CRUD дараах шинэчлэлд. */
  reload: () => void;
}

export interface AsyncResourceOptions<T> {
  /** Татаж дуустал (болон алдаа гарсан үед) харагдах утга. */
  initialData: T;
  /** `false` бол огт татахгүй, `loading` шууд `false` болно. */
  enabled?: boolean;
  /** Алдаа мессежгүй ирвэл харуулах бичвэр. */
  errorMessage?: string;
}

export function useAsyncResource<T>(
  loader: () => Promise<T>,
  deps: DependencyList,
  { initialData, enabled = true, errorMessage = "Мэдээлэл ачаалахад алдаа гарлаа" }: AsyncResourceOptions<T>,
): AsyncResource<T> {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState("");
  const [reloadNonce, setReloadNonce] = useState(0);

  /* loader нь дуудагч бүрийн render-д шинээр үүсдэг тул dependency болгож болохгүй —
     ref-ээр авч явна. Дахин татах мөчийг ЗӨВХӨН `deps` + `reload()` тодорхойлно. */
  const loaderRef = useRef(loader);
  loaderRef.current = loader;
  const errorMessageRef = useRef(errorMessage);
  errorMessageRef.current = errorMessage;

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    setError("");
    loaderRef
      .current()
      .then((result) => {
        if (alive) setData(result);
      })
      .catch((e: unknown) => {
        if (alive) setError((e as Error)?.message || errorMessageRef.current);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled, reloadNonce]);

  const reload = useCallback(() => setReloadNonce((n) => n + 1), []);

  return { data, setData, loading, error, setError, reload };
}
