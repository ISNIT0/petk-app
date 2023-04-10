import { IPromptTemplate } from "@/components/InferenceSettings/InferenceSettings";
import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Todo } from "@/components/Todo/Todo";
import { api } from "@/lib/http";
import { useRequest } from "@/lib/useRequest";
import { useRouter } from "next/router";
import { DotLoader } from "react-spinners";

export const PromptIndexPage = ({
  sessionType,
}: {
  sessionType: "chat" | "instruction";
}) => {
  const router = useRouter();
  const { promptId } = router.query;
  const { data: promptTemplate } = useRequest<IPromptTemplate>(
    `/prompt-template/${promptId}`,
    "GET",
    undefined,
    promptId === "new"
  );

  const variantItems = promptTemplate?.instances.map((instance) => {
    return {
      title: instance.description,
      subTitle: instance.prompt,
      href: `/prompts/${sessionType}/${promptId}/${instance.id}`,
    };
  });

  return (
    <Page>
      {promptId === "new" ? (
        <>
          <PageHeader title={"New Prompt Template"} />

          <form
            onSubmit={async (ev) => {
              ev.preventDefault();
              const formData = new FormData(ev.target as HTMLFormElement);
              const name = formData.get("name")?.toString() || "";
              const description = formData.get("description")?.toString() || "";
              const ret: IPromptTemplate = await api
                .url("/prompt-template/new")
                .post({ name, sessionType, description })
                .json();
              if (ret.id) {
                router.push(
                  `/prompts/${sessionType}/${ret.id}/${ret.instances[0].id}`
                );
              }
            }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description" />
            </div>
            <br />
            <button>Save</button>
          </form>
        </>
      ) : promptTemplate ? (
        <>
          <PageHeader
            title={promptTemplate.name}
            subTitle={"Variants"}
            actionLabel={
              <>
                Create Variant <Todo />
              </>
            }
            actionHref="#"
          />
          <List items={variantItems || []} />
        </>
      ) : (
        <DotLoader />
      )}
    </Page>
  );
};

export default PromptIndexPage;
