import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useRequest } from "@/lib/useRequest";
import { IToolIntegration } from "../tools.page";

export const PromptsMarketplacePage = () => {
  const { data: tools } = useRequest<IToolIntegration[]>("/tool/provider/all");

  const listItems = tools?.map((tool) => ({
    title: (
      <>
        <img
          src={tool.iconUrl}
          style={{ width: "24px", verticalAlign: "middle", marginRight: "8px" }}
        />
        {tool.name}
      </>
    ),
    subTitle: tool.description,
    href: `/prompts/marketplace/tool/${tool.type}`,
  }));

  return (
    <>
      <Page>
        <>
          <PageHeader
            title="Tool Marketplace"
            actionLabel="Submit Tool"
            actionHref="/prompts/marketplace"
          />
          <List items={listItems || []} />
        </>
      </Page>
    </>
  );
};

export default PromptsMarketplacePage;
