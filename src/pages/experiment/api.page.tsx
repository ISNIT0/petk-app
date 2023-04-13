import { EmptyStatePage } from "@/components/EmptyStatePage/EmptyStatePage";
import APIKeysPage from "../api-keys/index.page";

export const ExperimentAPIsPage = () => {
  return (
    <EmptyStatePage
      title="LLM Inference via API"
      description={<>Available to those who ask nicely...</>}
      actionLabel="Get in touch"
      actionHref="https://chat.whatsapp.com/GiqgXHPZvTBFn9fv2O0gZZ"
    />
  );
};

export default APIKeysPage;
