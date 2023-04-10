import { EmptyStatePage } from "@/components/EmptyStatePage/EmptyStatePage";

export const FineTuningPage = () => {
  return (
    <EmptyStatePage
      title="Manage Models via API"
      description={<>Available to those who ask nicely...</>}
      actionLabel="Get in touch"
      actionHref="/about"
    />
  );
};

export default FineTuningPage;
