import { useCallback, useEffect, useState } from "react";
import axiosInstant from "../utility/axiosInstant";

export default function useFetchData<t>(url: string, delay = 0) {
  const [data, setData] = useState<t | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ code: 0, message: "" });
  const [reload, setReload] = useState(0);
  const [counter, setCounter] = useState(0);

  const reloadFn = useCallback(() => {
    setReload((prev) => ++prev);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const cleanUp = setTimeout(() => {
      axiosInstant
        .get(url.replaceAll("undefined", ""), { signal: controller.signal })
        .then(({ data }: { data: t }) => {
          if (typeof data === "string") {
            throw new Error("Invalid response from server");
          }
          setData(data);
          setLoading(false);
          setCounter((prev) => ++prev);
          setError({ code: 0, message: "" });
        })
        .catch((err: Error & { code?: number }) => {
          if (err.message === "canceled") return;
          setLoading(false);
          setError(() => ({ code: err.code || 500, message: err.message }));
        });
    }, delay);
    return () => {
      controller.abort();
      clearTimeout(cleanUp);
    };
  }, [delay, url, reload]);

  return { data, loading, error, setData, reloadFn, counter };
}
