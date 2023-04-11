import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useRequest } from "@/lib/useRequest";
import { IToolIntegration } from "../../tools.page";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { api } from "@/lib/http";

export const PromptsMarketplacePage = () => {
  const router = useRouter();
  const { toolType } = router.query;

  const { data: tool } = useRequest<IToolIntegration>(
    `/tool/provider/${toolType}`
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const tool = await api
        .url(`/tool/new`)
        .post({ toolType: toolType, config: data })
        .json();
      console.log(tool);
    },
    [toolType]
  );

  return (
    <>
      <Page>
        <>
          <PageHeader title={`${tool?.name || toolType} Setup`} />
          <form onSubmit={onSubmit}>
            {tool?.configFields.map((field) => {
              return (
                <div key={field.name} className="form-group">
                  <label htmlFor={field.name}>{field.name}</label>
                  {field.type === "boolean" ? (
                    <input
                      type="checkbox"
                      id={field.name}
                      name={field.name}
                      checked={field.defaultValue as any}
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      defaultValue={field.defaultValue as any}
                    />
                  )}
                </div>
              );
            })}
            <button>Save</button>
          </form>
        </>
      </Page>
    </>
  );
};

export default PromptsMarketplacePage;
