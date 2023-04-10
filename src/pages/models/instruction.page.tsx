import { IModel } from "@/components/InferenceSettings/InferenceSettings";
import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Todo } from "@/components/Todo/Todo";
import { useRequest } from "@/lib/useRequest";

export const InstructionModelsPage = () => {
  const { data: models } = useRequest<IModel[]>("/model/all");

  const listItems = models
    ?.filter((model) => model.type === "instruction")
    .map((model) => ({
      title: <>{model.name}</>,
      subTitle: (
        <>Model management (data safety, limits, etc.) coming soon...</>
      ),
    }));
  return (
    <>
      <Page>
        <>
          <PageHeader
            title="Instruction Models"
            actionLabel={
              <>
                Create Custom Model <Todo />
              </>
            }
            actionHref="#"
          />
          <List items={listItems || []} />
        </>
      </Page>
    </>
  );
};

export default InstructionModelsPage;
