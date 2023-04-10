import { api } from "@/lib/http";
import { useRequest } from "@/lib/useRequest";
import { IInference } from "@/pages/experiment/chat/index.page";
import { FormEvent, useCallback, useRef, useState } from "react";
import { Inference } from "../Inference/Inference";
import {
  IInferenceSettings,
  IModel,
  InferenceSettings,
  ITestInferenceSettings,
} from "../InferenceSettings/InferenceSettings";
import styles from "./PromptTestWindow.module.scss";

export const PromptTestWindow = ({
  template,
  sessionType,
  temperature,
  maxTokens,
  stopSequence,
}: {
  template: string;
  sessionType: "chat" | "instruction";
  temperature: number;
  maxTokens: number;
  stopSequence?: string;
}) => {
  const [inferences, setInferences] = useState<IInference[]>([]);
  const [status, setStatus] = useState<"pending" | "succeeded" | "errored">(
    "succeeded"
  );
  const { data: models } = useRequest<IModel[]>(`/model/all`);
  const inferencesContainerElRef = useRef<HTMLDivElement | null>();

  const defaultModel = models?.find((model) => model.isDefault) || models?.[0];

  const [inferenceSettings, setInferenceSettings] =
    useState<IInferenceSettings>({
      model: undefined,
      promptTemplate: undefined,
    });

  const onSubmit = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault();
      ev.stopPropagation();
      const formData = new FormData(ev.target as HTMLFormElement);
      const messagePrompt = formData.get("prompt")?.toString() || "";
      setStatus("pending");
      const inference: IInference = await api
        .url(`/prompt-template/test`)
        .post({
          ...inferenceSettings,
          template,
          prompt: messagePrompt,
          temperature,
          maxTokens,
          stopSequence,
        } as ITestInferenceSettings)
        .json();
      setInferences((inferences) => [...inferences, inference]);
      setStatus("succeeded");
      (ev.target as HTMLFormElement).querySelector("textarea")!.value = "";
    },
    [inferenceSettings, maxTokens, stopSequence, temperature, template]
  );

  return (
    <div className={styles.container}>
      <div className={styles.inferenceSettings}>
        <InferenceSettings
          inferenceSettings={inferenceSettings}
          setInferenceSettings={setInferenceSettings}
          sessionType={sessionType}
          hideTemplateSelect={true}
        />
        <button>Replay</button>
      </div>
      <div className={styles.inferenceContainer}>
        <div
          ref={(el) => (inferencesContainerElRef.current = el)}
          className={styles.inferences}
        >
          {inferences.map((inference, i) => {
            return <Inference inference={inference} key={i} />;
          })}
        </div>
        <form className={styles.inferenceInput} onSubmit={onSubmit}>
          <textarea disabled={status === "pending"} name="prompt" id="prompt" />
          <button disabled={status === "pending"}>Send</button>
        </form>
      </div>
    </div>
  );
};
