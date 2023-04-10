import { List } from "@/components/List/List";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Todo } from "@/components/Todo/Todo";
import { api } from "@/lib/http";
import { useRequest } from "@/lib/useRequest";
import { useState } from "react";

export interface IIntegration {
  provider: string;
  config: Record<string, any>;
}

export const OpenAIMarketplacePage = () => {
  const [status, setStatus] = useState<"pending" | "succeeded">("succeeded");
  const [error, setError] = useState<string | undefined>();
  const { data: integrations, refetch } =
    useRequest<IIntegration[]>("/integration/all");
  const isOpenAIEnabled = !!integrations?.find(
    (integration) => integration.provider === "OpenAI"
  );

  return (
    <>
      <Page>
        <>
          <PageHeader title="OpenAI Integration" />

          {isOpenAIEnabled ? (
            <>
              <p>The OpenAI Integration is configured with an OpenAI API Key</p>
              <br />
              <div className="inline-buttons">
                <button disabled>
                  Disconnect <Todo />
                </button>
                <button
                  onClick={() =>
                    api.url(`/integration/OpenAI/refresh`).post({}).json()
                  }
                >
                  Reinitialize
                </button>
              </div>
              <br />
              <br />
              <br />
              <PageHeader
                title={
                  <>
                    Sensitive Data Stripping <Todo />
                  </>
                }
              />
              <p>
                Configure rules for stripping sensitive information from prompts
              </p>
            </>
          ) : (
            <>
              <p>To use OpenAI Models, add your API Key below</p>
              <br />
              <form
                onSubmit={async (ev) => {
                  ev.preventDefault();
                  const formData = new FormData(ev.target as HTMLFormElement);
                  const apiKey = formData.get("apiKey")?.toString();
                  try {
                    setStatus("pending");
                    await api
                      .url(`/integration/OpenAI`)
                      .post({ config: { apiKey }, safetyConfig: {} })
                      .json();
                    refetch();
                  } catch (e: any) {
                    console.error(e);
                    setError(e.message || "Error connecting to OpenAI");
                  }
                  setStatus("succeeded");
                }}
              >
                <div className="form-group">
                  <label htmlFor="apiKey">API Key: </label>
                  <input
                    type="text"
                    name="apiKey"
                    id="apiKey"
                    disabled={status === "pending"}
                  />
                </div>
                <button disabled={status === "pending"}>Connect</button>

                {/* TODO: Error Styling */}
                {error ? <pre>{error}</pre> : null}
              </form>
            </>
          )}
        </>
      </Page>
    </>
  );
};

export default OpenAIMarketplacePage;
