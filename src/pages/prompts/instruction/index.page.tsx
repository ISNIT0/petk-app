import { IPromptTemplate } from "@/components/InferenceSettings/InferenceSettings";
import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useRequest } from "@/lib/useRequest";

export const InstructionPromptsPage = () => {
  const { data: _templates } = useRequest<IPromptTemplate[]>(
    "/prompt-template/all"
  );
  const templates = _templates?.filter(
    (template) => template.promptType === "instruction"
  );
  const listItems = templates
    ?.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .map((template) => ({
      title: template.name,
      subTitle:
        template.instances.length > 1
          ? `${template.instances.length} Variants`
          : undefined,
      href: `/prompts/instruction/${template.id}`,
    }));
  return (
    <>
      <Page>
        <>
          <PageHeader
            title="Instruction Prompt Templates"
            actionLabel="New Prompt Template"
            actionHref="/prompts/instruction/new"
          />
          <List items={listItems || []} />
        </>
      </Page>
    </>
  );
};

export default InstructionPromptsPage;
