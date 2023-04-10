import { IPromptTemplateInstance } from "@/components/InferenceSettings/InferenceSettings";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { PromptTestWindow } from "@/components/PromptTestWindow/PromptTestWindow";
import { Todo } from "@/components/Todo/Todo";
import { api } from "@/lib/http";
import { useRequest } from "@/lib/useRequest";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import styles from "./VariantPage.module.scss";

export const PromptVariantPage = ({
  promptId,
  variantId,
  sessionType,
}: {
  promptId: string;
  variantId: string;
  sessionType: "chat" | "instruction";
}) => {
  const {
    data: promptTemplateVariant,
    status,
    refetch,
  } = useRequest<IPromptTemplateInstance>(
    `/prompt-template/${promptId}/${variantId}`,
    "GET",
    undefined,
    variantId === "new"
  );
  const [prompt, setPrompt] = useState("");
  const [maxTokens, setMaxTokens] = useState<number>();
  const [temperature, setTemperature] = useState<number>();
  const [stopSequence, setStopSequence] = useState<string | null>();

  const variantLoaded = status === "succeeded" || variantId === "new";

  useEffect(() => {
    if (promptTemplateVariant) {
      setPrompt(promptTemplateVariant?.prompt);
      setMaxTokens(promptTemplateVariant.maxTokens);
      setTemperature(promptTemplateVariant.temperature);
      setStopSequence(promptTemplateVariant.stopSequence);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantLoaded]);

  const variantChanged =
    prompt !== promptTemplateVariant?.prompt ||
    temperature !== promptTemplateVariant?.temperature ||
    maxTokens !== promptTemplateVariant?.maxTokens ||
    stopSequence !== promptTemplateVariant?.stopSequence;

  const savePrompt = useCallback(async () => {
    await api
      .url(`/prompt-template/${promptId}/${variantId}`)
      .post({ prompt, temperature, maxTokens, stopSequence })
      .json();
    await refetch();
  }, [
    maxTokens,
    prompt,
    promptId,
    refetch,
    stopSequence,
    temperature,
    variantId,
  ]);

  return (
    <Page>
      {promptTemplateVariant ? (
        <>
          <PageHeader
            title={promptTemplateVariant.template.name}
            actionLabel="Save"
            actionDisabled={!variantChanged || status === "pending"}
            actionFn={savePrompt}
          />
          <details>
            <summary>Cheatsheet</summary>
            <ul>
              <li>
                <strong>
                  {"{"}input{"}"}
                </strong>{" "}
                - replaced by the latest prompt input
              </li>
              <li>
                <strong>
                  {"{"}history{"}"}
                </strong>{" "}
                - replaced by the prompt history
              </li>
              <li>
                <strong>
                  {"{"}tools{"}"}
                </strong>{" "}
                - replaced by model tools and descriptions
              </li>
              <li>
                <strong>
                  {"{"}tool_names{"}"}
                </strong>{" "}
                - replaced by model tool names
              </li>
              <li>
                <strong>
                  {"{"}enrichments{"}"}
                </strong>{" "}
                - replaced by model enrichments <Todo />
              </li>
            </ul>
          </details>
          <br />
          <textarea
            defaultValue={promptTemplateVariant.prompt}
            rows={20}
            onChange={(ev) => {
              setPrompt(ev.target.value);
            }}
          ></textarea>
          <section className={styles.templateSettings}>
            <div className="form-group">
              <label htmlFor="maxTokens">Max Tokens: </label>
              <input
                type="number"
                name="maxTokens"
                id="maxTokens"
                defaultValue={maxTokens}
                min={1}
                onChange={(ev) => setMaxTokens(Number(ev.target.value))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stopSequence">Stop Sequence: </label>
              <input
                type="text"
                name="stopSequence"
                id="stopSequence"
                defaultValue={stopSequence || ""}
                onChange={(ev) => setStopSequence(ev.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="temperature">Temperature: </label>
              <input
                type="number"
                name="temperature"
                id="temperature"
                min="0"
                max="1"
                defaultValue={temperature}
                onChange={(ev) => setTemperature(Number(ev.target.value))}
              />
            </div>
          </section>
          <section className={styles.testing}>
            <div>
              <h3>Tests</h3>
            </div>
            {/* <PromptTestWindow template={prompt} />
            <PromptTestWindow template={prompt} /> */}
            <PromptTestWindow
              template={prompt}
              sessionType={sessionType}
              temperature={temperature!}
              maxTokens={maxTokens!}
              stopSequence={stopSequence!}
            />
          </section>
        </>
      ) : (
        <DotLoader />
      )}
    </Page>
  );
};

export default PromptVariantPage;
