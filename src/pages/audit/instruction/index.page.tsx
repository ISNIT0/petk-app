import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useRequest } from "@/lib/useRequest";
import { ISession } from "@/pages/experiment/chat/index.page";

export const InstructionsPage = () => {
  const { data: instructions } = useRequest<ISession[]>("/session/instruction/all");
  const listItems = instructions
    ?.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .map((instruction) => ({
      title: instruction.name,
      subTitle: instruction.description || "No preview available",
      href: `/experiment/instruction/${instruction.id}`,
    }));
  return (
    <>
      <Page>
        <>
          <PageHeader
            title="Instruction Sessions"
            actionLabel="New Session"
            actionHref="/experiment/instruction/new"
          />
          <List items={listItems || []} />
        </>
      </Page>
    </>
  );
};

export default InstructionsPage;
