import { EmptyStatePage } from "@/components/EmptyStatePage/EmptyStatePage";

export const TestsPage = () => {
  return (
    <EmptyStatePage
      title="Prompt Tests"
      description={
        <>
          Manage test suites for prompt safety and accuracy, with a bunch of safety
          tests provided to get you started.
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

export default TestsPage;
