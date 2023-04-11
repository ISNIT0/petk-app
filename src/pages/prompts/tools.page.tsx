import { IPromptTemplate } from "@/components/InferenceSettings/InferenceSettings";
import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useRequest } from "@/lib/useRequest";

export interface IToolIntegration {
  id: string;
  iconUrl: string;
  name: string;
  description: string;
  modelName: string;
  modelDescription: string;
  type: string;

  configFields: {
    name: string;
    type: "text" | "number" | "boolean" | "date";
    defaultValue: string | number | boolean;
  }[];
}

export interface ITool {
  id: string;
  integration: IToolIntegration;
}

export const ToolsPage = () => {
  const { data: tools } = useRequest<ITool[]>("/tool/all");

  const listItems = tools?.map((tool) => ({
    title: (
      <>
        <img src={tool.integration.iconUrl} style={{ width: "24px" }} />
        {tool.integration.name}
      </>
    ),
    subTitle: tool.integration.description,
    href: `/prompts/tools/${tool.id}`,
  }));

  return (
    <>
      <Page>
        <>
          <PageHeader
            title="Tools"
            actionLabel="Install New Tool"
            actionHref="/prompts/marketplace"
          />
          <List items={listItems || []} />
        </>
      </Page>
    </>
  );
};

export default ToolsPage;
