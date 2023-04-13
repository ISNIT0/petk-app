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
      actionHref="https://chat.whatsapp.com/GiqgXHPZvTBFn9fv2O0gZZ"
    />
  );
};

export default FineTuningPage;
