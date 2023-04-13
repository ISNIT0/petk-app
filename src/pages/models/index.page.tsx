import { Page } from "@/components/Page/Page";
import { useRouter } from "next/router";

export const ExperimentPage = () => {
  const router = useRouter();
  router.replace("/models/chat");
  return (
    <Page>
      <h1>Models</h1>
    </Page>
  );
};

export default ExperimentPage;
