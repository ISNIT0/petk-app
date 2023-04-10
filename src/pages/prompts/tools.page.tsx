import { EmptyStatePage } from "@/components/EmptyStatePage/EmptyStatePage";

export const ToolsPage = () => {
  return (
    <EmptyStatePage
      title="Model Tools"
      description={
        <>
          Give your model arms and legs. AuthZ-aware tools that make your models
          100x more useful.
          <br />
          <br />
          Available to those who ask nicely...
        </>
      }
      actionLabel="Get in touch"
      actionHref="/about"
    />
  );
};

export default ToolsPage;
