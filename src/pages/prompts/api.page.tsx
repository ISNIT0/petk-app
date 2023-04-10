import { EmptyStatePage } from "@/components/EmptyStatePage/EmptyStatePage";

export const PromptsAPIPage = () => {
  return (
    <EmptyStatePage
      title="Manage Prompts via API"
      description={<>Available to those who ask nicely...</>}
      actionLabel="Get in touch"
      actionHref="/about"
    />
  );
};

export default PromptsAPIPage;
