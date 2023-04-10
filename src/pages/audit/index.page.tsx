import { EmptyStatePage } from "@/components/EmptyStatePage/EmptyStatePage";

export const AuditHomePage = () => {
  return (
    <EmptyStatePage
      title="Full Auditing"
      description={<>Available to those who ask nicely...</>}
      actionLabel="Get in touch"
      actionHref="/about"
    />
  );
};

export default AuditHomePage;
