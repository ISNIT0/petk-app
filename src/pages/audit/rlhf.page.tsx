import { EmptyStatePage } from "@/components/EmptyStatePage/EmptyStatePage";
import { useRequest } from "@/lib/useRequest";
import { IInferenceRating } from "../experiment/chat/index.page";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { List } from "@/components/List/List";

export const RLHFPage = () => {
  const { data: ratings } = useRequest<IInferenceRating[]>("/inference-rating");
  const listItems = ratings
    ?.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .map((rating) => ({
      title: `${rating.rating < 0 ? "Negative" : "Positive"} (${
        rating.rating
      }) - ${JSON.stringify(rating.context || {})}`,
      subTitle: rating.inference.response,
      href: `/experiment/instruction/${rating.inference.session?.id}`,
    }));
  return (
    <>
      <Page>
        <>
          <PageHeader title="Inference Ratings" />
          <List items={listItems || []} />
        </>
      </Page>
    </>
  );
};

export default RLHFPage;
