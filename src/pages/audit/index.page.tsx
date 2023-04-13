import { EmptyStatePage } from "@/components/EmptyStatePage/EmptyStatePage";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const AuditHomePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/audit/chat");
  }, [router]);

  return (
    <EmptyStatePage
      title="Full Auditing"
      description={<>Available to those who ask nicely...</>}
      actionLabel="Get in touch"
      actionHref="https://chat.whatsapp.com/GiqgXHPZvTBFn9fv2O0gZZ"
    />
  );
};

export default AuditHomePage;
