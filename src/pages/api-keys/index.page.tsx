import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useRequest } from "@/lib/useRequest";
import { IProfile } from "../experiment/chat/index.page";
import { useRequestLazy } from "@/lib/useRequestLazy";
import Link from "next/link";
import { config } from "@/config";

export interface IApiKey {
  key: string;
  createdAt: string;
  profile: IProfile;
}

export const APIKeysPage = () => {
  const { doRequest: createApiKey } = useRequestLazy<IApiKey>(
    `/api-key/new`,
    "POST"
  );
  const { data: keys, refetch } = useRequest<IApiKey[]>(`/api-key/all`);

  const listItems = keys?.map((key: IApiKey) => ({
    title: key.key,
    subTitle: `Created ${key.createdAt}`,
  }));

  return (
    <Page>
      <>
        <PageHeader
          title="API Keys"
          actionLabel={"Create Key"}
          actionFn={async () => {
            const ret = await createApiKey({});
            await refetch();
            if (ret) {
              prompt(
                `Copy API Key, it will not be shown again:`,
                `api-${ret.key}`
              );
            }
          }}
        />

        <p>
          All APIs require Bearer auth. Usage as follows:
          <br />
          <code>authorization: Bearer api-XXX</code>
          <br />
          <br />
          View{" "}
          <Link href={`${config.apiUrl}/api`} target="_blank">
            API Docs Here
          </Link>
        </p>
        <br />
        <br />
        <List items={listItems || []} />
      </>
    </Page>
  );
};

export default APIKeysPage;
