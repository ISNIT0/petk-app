import { EmptyStatePage } from "@/components/EmptyStatePage/EmptyStatePage";

export const ExperimentAPIsPage = () => {
  return (
    <EmptyStatePage
      title="LLM Inference via API"
      description={<>Available to those who ask nicely...</>}
      actionLabel="Get in touch"
      actionHref="/about"
    />
  );
};

export default ExperimentAPIsPage;
