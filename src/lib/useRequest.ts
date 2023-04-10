import { useCallback, useEffect, useState } from "react";
import { api } from "./http";

type HTTPStatus = "pending" | "errored" | "succeeded";

export function useRequest<T>(
  url: string,
  method: "GET" | "POST" = "GET",
  body?: Record<string, any>,
  skip?: boolean
) {
  const [status, setStatus] = useState<HTTPStatus>("pending");
  const [response, setResponse] = useState<null | T>(null);
  const [error, setError] = useState<null | Error>(null);
  const [refetchAt, setRefetchAt] = useState(0);

  const postBody = method === "POST" ? body : false;

  useEffect(() => {
    if (!skip) {
      (async () => {
        setStatus("pending");
        try {
          const baseReq = api.url(url);
          let req: Promise<T>;
          if (method === "GET") {
            req = baseReq.get().json();
          } else {
            req = baseReq.post(postBody).json();
          }
          const ret = await req;
          setResponse(ret);
          setStatus("succeeded");
        } catch (err) {
          console.error(`HTTP Request failed`, err);
          setStatus("errored");
          setError(err as Error);
        }
      })();
    }
  }, [url, method, postBody, refetchAt, skip]);

  const refetch = useCallback(() => {
    setRefetchAt(Date.now());
    // TODO: should return a promise that resolves after refetch
  }, []);

  return { status, data: response, error, refetch };
}
