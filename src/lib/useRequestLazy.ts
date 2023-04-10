import { useCallback, useEffect, useState } from "react";
import { api } from "./http";

type HTTPStatus = "pending" | "errored" | "succeded";

export function useRequestLazy<T>(url: string, method: "GET" | "POST" = "GET") {
  const [status, setStatus] = useState<HTTPStatus>("pending");
  const [response, setResponse] = useState<null | T>(null);
  const [error, setError] = useState<null | Error>(null);

  const doRequest = useCallback(
    async (body: unknown) => {
      setStatus("pending");
      try {
        const baseReq = api.url(url);
        let req: Promise<T>;
        if (method === "GET") {
          req = baseReq.get().json();
        } else {
          req = baseReq.post(body).json();
        }
        const ret = await req;
        setResponse(ret);
        setStatus("succeded");
        return ret;
      } catch (err) {
        console.error(`HTTP Request failed`, err);
        setStatus("errored");
        setError(err as Error);
      }
    },
    [url, method]
  );

  return { status, data: response, error, doRequest };
}
