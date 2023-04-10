import styles from "./InferenceSettings.module.scss";
import cx from "classnames";
import { useRequest } from "@/lib/useRequest";
import { useEffect } from "react";

export interface IInferenceSettings {
  model?: string;
  promptTemplate?: string;
}

export type ITestInferenceSettings = IInferenceSettings & {
  maxTokens: number;
  stopSequence?: string;
  temperature: number;
};

export interface IModel {
  name: string;
  id: string;
  isDefault: boolean;
  type: "chat" | "instruction";
}

export interface IPromptTemplateInstance {
  name: string;
  description: string;
  id: string;
  prompt: string;
  template: IPromptTemplate;
  maxTokens: number;
  temperature: number;
  stopSequence?: string;
}
export interface IPromptTemplate {
  name: string;
  id: string;
  instances: IPromptTemplateInstance[];
  isDefault: boolean;
  promptType: "chat" | "instruction";
  createdAt: string;
  updatedAt: string;
}

export const InferenceSettings = ({
  inferenceSettings,
  setInferenceSettings,
  isRaw,
  setIsRaw,
  sessionType,
  hideTemplateSelect,
}: {
  inferenceSettings: IInferenceSettings;
  setInferenceSettings: (settings: IInferenceSettings) => void;
  isRaw?: boolean;
  setIsRaw?: (isRaw: boolean) => void;
  sessionType: "chat" | "instruction";
  hideTemplateSelect?: boolean;
}) => {
  const { data: _models } = useRequest<IModel[]>(`/model/all`);
  const { data: _templates } =
    useRequest<IPromptTemplate[]>(`/prompt-template/all`);
  const models = _models?.filter((model) => model.type === sessionType);
  const templates = _templates?.filter(
    (template) => template.promptType === sessionType
  );
  const hasLoaded = !!(models && templates);

  const defaultModel = models?.find((model) => model.isDefault) || models?.[0];
  const defaultTemplate =
    templates?.find((template) => template.isDefault) || templates?.[0];

  useEffect(() => {
    setInferenceSettings({
      model: inferenceSettings.model || defaultModel?.id,
      promptTemplate: inferenceSettings.promptTemplate || defaultTemplate?.id,
    });
  }, [
    defaultModel?.id,
    defaultTemplate?.id,
    hasLoaded,
    inferenceSettings.model,
    inferenceSettings.promptTemplate,
    setInferenceSettings,
  ]);

  return (
    <div className={cx(styles.settingsContainer)}>
      <select
        defaultValue={defaultModel?.id}
        value={inferenceSettings.model}
        onChange={(ev) => {
          setInferenceSettings({
            ...inferenceSettings,
            model: ev.target.value!,
          });
        }}
      >
        {models?.map((model) => {
          return (
            <option value={model.id} key={model.id}>
              {model.name}
            </option>
          );
        })}
        {!models && (
          <option disabled selected>
            Loading...
          </option>
        )}
      </select>
      {!hideTemplateSelect ? (
        <select
          defaultValue={defaultTemplate?.id}
          value={inferenceSettings.promptTemplate}
          onChange={(ev) => {
            setInferenceSettings({
              ...inferenceSettings,
              promptTemplate: ev.target.value!,
            });
          }}
        >
          {templates?.flatMap((template) => {
            return (
              <option value={template.id} key={template.id}>
                {template.name}
              </option>
            );
          })}
          {templates && !templates.length ? (
            <option disabled selected>
              No Templates Available
            </option>
          ) : null}
          {!templates && (
            <option disabled selected>
              Loading...
            </option>
          )}
        </select>
      ) : null}
      {setIsRaw ? (
        <div className="form-group">
          <input
            type="checkbox"
            name="raw"
            id="raw"
            checked={isRaw}
            onChange={(ev) => {
              setIsRaw(!!ev.target.checked);
            }}
          />
          <label htmlFor="raw">Raw</label>
        </div>
      ) : null}
    </div>
  );
};
