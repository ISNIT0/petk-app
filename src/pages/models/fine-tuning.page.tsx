import { EmptyStatePage } from "@/components/EmptyStatePage/EmptyStatePage";

export const FineTuningPage = () => {
  return (
    <EmptyStatePage
      title="Fine Tuning"
      description={
        <>
          Fine-tune off-the-shelf models to your specific use case. Customer
          data segregation, AuthZ, and compliance built in. Coming soon...
        </>
      }
      actionLabel="Get in touch"
      actionHref="/about"
    />
  );
};

export default FineTuningPage;
