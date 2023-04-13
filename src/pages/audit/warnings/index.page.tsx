import { IModel } from "@/components/InferenceSettings/InferenceSettings";
import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useRequest } from "@/lib/useRequest";
import { IInference } from "@/pages/experiment/chat/index.page";

export type InferenceWarningAction = "block" | "replace" | "warn" | "allow";
export type InferenceWarningType = "hallucination" | "unsafe" | "pii";

export interface IInferenceWarning {
  id: string;
  createdAt: string;
  model: IModel;
  inference: IInference;
  warningOn: "prompt" | "response";
  type: InferenceWarningType;
  actionTaken: InferenceWarningAction;
  detail: string;
  badString: string;
}

export const WarningsPage = () => {
  const { data: instructions } = useRequest<IInferenceWarning[]>(
    "/inference-sentinel/warning/all"
  );
  const listItems = instructions
    ?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .map((warning) => ({
      title: `${warning.type} ${warning.actionTaken} ${warning.model.name}`,
      subTitle: warning.detail || "No preview available",
      href: `/audit/warnings/${warning.id}`,
    }));
  return (
    <>
      <Page>
        <>
          <PageHeader title="Inference Warnings" />
          <List items={listItems || []} />
        </>
      </Page>
    </>
  );
};

export default WarningsPage;
