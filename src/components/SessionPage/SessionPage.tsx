import { Inference } from "@/components/Inference/Inference";
import { useRequest } from "@/lib/useRequest";
import { useRouter } from "next/router";
import cx from "classnames";
import styles from "./SessionPage.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { InferenceInput } from "@/components/InferenceInput/InferenceInput";
import { useRequestLazy } from "@/lib/useRequestLazy";
import Link from "next/link";
import ArrowLeftIcon from "public/icons/arrow-left.svg";
import {
  IInferenceSettings,
  InferenceSettings,
} from "@/components/InferenceSettings/InferenceSettings";
import DotLoader from "react-spinners/DotLoader";
import { IInference, ISession } from "@/pages/experiment/chat/index.page";
import { ITool } from "@/pages/prompts/tools.page";

interface IInferenceResponse {
  sessionId: string;
  inference: IInference;
}

export const SessionPage = ({
  sessionType,
  sessionId,
  readOnly,
}: {
  sessionType: "chat" | "instruction";
  sessionId: string;
  readOnly?: boolean;
}) => {
  const router = useRouter();
  const inferencesContainerElRef = useRef<HTMLDivElement | null>();

  const [inferenceSettings, setInferenceSettings] =
    useState<IInferenceSettings>({
      model: undefined,
      promptTemplate: undefined,
      tools: [],
    });

  const { data: session, refetch: refetchSession } = useRequest<ISession>(
    `/session/${sessionType}/${sessionId}`,
    "GET",
    undefined,
    sessionId === "new"
  );
  const { data: inferenceResponse, doRequest: submitPrompt } =
    useRequestLazy<IInferenceResponse>(
      `/session/${sessionType}/${sessionId}`,
      "POST"
    );
  const [isRaw, setIsRaw] = useState(false);
  const { data: transcript, refetch: refetchTranscript } = useRequest<{
    transcript: string;
  }>(
    `/session/${sessionType}/${sessionId}/transcript`,
    "POST",
    inferenceSettings,
    !isRaw
  );

  const onSubmit = useCallback(
    async (prompt: string) => {
      const ret = await submitPrompt({
        ...inferenceSettings,
        prompt,
      });
      if (sessionId === "new" && ret) {
        router.replace(`/experiment/${sessionType}/${ret.sessionId}`);
      }
      await Promise.all([refetchSession(), refetchTranscript()]);
    },
    [
      submitPrompt,
      inferenceSettings,
      sessionId,
      refetchSession,
      refetchTranscript,
      router,
      sessionType,
    ]
  );

  useEffect(() => {
    inferencesContainerElRef.current?.scrollTo({
      top: inferencesContainerElRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [session?.inferences.length]);

  return (
    <>
      <section className={cx(styles.page)}>
        <aside className={cx(styles.topNav)}>
          <div className={cx(styles.leftOptions)}>
            <Link
              href={`/experiment/${sessionType}`}
              className={cx(styles.navigateBack)}
            >
              <ArrowLeftIcon /> View{" "}
              {sessionType[0].toUpperCase() + sessionType.slice(1)} Log
            </Link>
            <InferenceSettings
              inferenceSettings={inferenceSettings}
              setInferenceSettings={setInferenceSettings}
              isRaw={isRaw}
              setIsRaw={setIsRaw}
              sessionType={sessionType}
              readOnly={readOnly}
            />
          </div>
          <div></div>
        </aside>
        {isRaw ? (
          <div className={cx(styles.inferences, styles.transcript)}>
            {transcript ? (
              <textarea
                disabled
                value={
                  typeof transcript.transcript == "string"
                    ? transcript.transcript
                    : JSON.stringify(transcript.transcript, null, "\t")
                }
              />
            ) : (
              <div className={cx(styles.loader)}>
                <DotLoader color="#0052cc" />
              </div>
            )}
          </div>
        ) : (
          <div
            className={cx(styles.inferences)}
            ref={(el) => (inferencesContainerElRef.current = el)}
          >
            {session?.inferences.map((inference: IInference) => {
              return <Inference key={inference.id} inference={inference} />;
            })}
          </div>
        )}
        {!readOnly ? <InferenceInput onSubmit={onSubmit} /> : null}
      </section>
    </>
  );
};

export default SessionPage;
