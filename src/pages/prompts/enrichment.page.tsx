import { EmptyStatePage } from "@/components/EmptyStatePage/EmptyStatePage";

export const EnrichmentPage = () => {
  return (
    <EmptyStatePage
      title="Dynamic Prompt Enrichment"
      description={
        <>
          Dynamic prompt enrichment so your models understand your
          customers, in a data and AuthZ compliant way.
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

export default EnrichmentPage;
