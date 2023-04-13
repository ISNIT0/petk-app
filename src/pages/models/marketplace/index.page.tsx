import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Todo } from "@/components/Todo/Todo";

export const MarketplacePage = () => {
  const listItems = [
    {
      title: "OpenAI",
      subTitle: "Connect all OpenAI Models using your API Key",
      href: "/models/marketplace/openai",
    },
    {
      title: (
        <>
          Anthropic <Todo />
        </>
      ),
      subTitle: "Connect Claude using your API Key",
      href: "#",
    },
    {
      title: (
        <>
          Sagemaker <Todo />
        </>
      ),
      subTitle: "Connect directly to a Sagemaker Endpoint",
      href: "#",
    },
  ];
  return (
    <>
      <Page>
        <>
          <PageHeader
            title="Available Integrations"
            actionLabel="Request Integration"
            actionHref="https://chat.whatsapp.com/GiqgXHPZvTBFn9fv2O0gZZ"
          />
          <List items={listItems || []} />
        </>
      </Page>
    </>
  );
};

export default MarketplacePage;
