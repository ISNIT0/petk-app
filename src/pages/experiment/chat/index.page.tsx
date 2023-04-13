import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Tag } from "@/components/Tag/Tag";
import { useRequest } from "@/lib/useRequest";

export interface IProfile {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface IInference {
  id: string;
  createdAt: string;
  model: any;
  promptTemplateInstance: any;
  previousInference: IInference;
  prompt: string;
  response: string;
  type: "automated" | "user";
  profile?: IProfile;
  toolProfile?: { name: string; provider: string; avatarUrl: string };
  session?: ISession;
}

export interface ISession {
  id: string;
  name: string;
  description?: string;
  inferences: IInference[];
  createdAt: string;
  updatedAt: string;
  type: "chat" | "instruction";
  source: "api" | "playground";
}

export const ChatsPage = () => {
  const { data: chats } = useRequest<ISession[]>("/session/chat/all");
  const listItems = chats
    ?.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .map((chat) => ({
      title: (
        <>
          {chat.name}{" "}
          {chat.source === "api" ? (
            <Tag variant="purple" content="API" />
          ) : (
            <Tag variant="green" content="Playground" />
          )}
        </>
      ),
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
