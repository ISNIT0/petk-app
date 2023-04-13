import { Page } from "@/components/Page/Page";
import { useRouter } from "next/router";

export const ExperimentPage = () => {
  const router = useRouter();
  router.replace("/experiment/chat");
  return (
    <Page>
      <h1>Experiment</h1>
    </Page>
  );
};

export default ExperimentPage;
