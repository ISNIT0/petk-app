import { Page } from "@/components/Page/Page";
import { useRouter } from "next/router";

export const ExperimentPage = () => {
  const router = useRouter();
  router.replace("/prompts/chat");
  return (
    <Page>
      <h1>Prompts</h1>
    </Page>
  );
};

export default ExperimentPage;
