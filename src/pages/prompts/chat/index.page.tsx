import { IPromptTemplate } from "@/components/InferenceSettings/InferenceSettings";
import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useRequest } from "@/lib/useRequest";

export const ChatPromptsPage = () => {
  const { data: _templates } = useRequest<IPromptTemplate[]>(
    "/prompt-template/all"
  );
  const templates = _templates?.filter(
    (template) => template.promptType === "chat"
  );
  const listItems = templates
    ?.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .map((template) => ({
      title: template.name,
      subTitle:
        template.instances.length > 1
          ? `${template.instances.length} Variants`
          : undefined,
      href: `/prompts/chat/${template.id}`,
    }));
  return (
    <>
      <Page>
        <>
          <PageHeader
            title="Chat Prompt Templates"
            actionLabel="New Prompt Template"
            actionHref="/prompts/chat/new"
          />
          <List items={listItems || []} />
        </>
      </Page>
    </>
  );
};

export default ChatPromptsPage;
