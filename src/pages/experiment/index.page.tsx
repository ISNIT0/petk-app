import { Page } from "@/components/Page/Page";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const ExperimentPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/experiment/chat");
  }, [router]);
  return (
    <Page>
      <h1>Experiment</h1>
    </Page>
  );
};

export default ExperimentPage;
