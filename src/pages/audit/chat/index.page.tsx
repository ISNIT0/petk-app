import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useRequest } from "@/lib/useRequest";
import { ISession } from "@/pages/experiment/chat/index.page";

export const ChatsPage = () => {
  const { data: chats } = useRequest<ISession[]>("/session/chat/all");
  const listItems = chats
    ?.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .map((chat) => ({
      title: chat.name,
      subTitle: chat.description || "No preview available",
      href: `/experiment/chat/${chat.id}`,
    }));
  return (
    <>
      <Page>
        <>
          <PageHeader
            title="Chat Sessions"
            actionLabel="New Session"
            actionHref="/experiment/chat/new"
          />
          <List items={listItems || []} />
        </>
      </Page>
    </>
  );
};

export default ChatsPage;
