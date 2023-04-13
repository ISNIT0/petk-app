import { useRouter } from "next/router";
import { Page } from "@/components/Page/Page";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useRequest } from "@/lib/useRequest";
import { DotLoader } from "react-spinners";
import { IInferenceWarning } from "./index.page";
import { Inference } from "@/components/Inference/Inference";
import Link from "next/link";

export const WarningPage = () => {
  const router = useRouter();
  const { warningId } = router.query;

  const { data: warning } = useRequest<IInferenceWarning>(
    `/inference-sentinel/warning/${warningId}`
  );

  return (
    <Page>
      {warning ? (
        <>
          <PageHeader
            title={`${warning.type} ${warning.actionTaken} ${warning.model.name}`}
          />

          {warning.inference.session ? (
            <Link
              href={`/audit/${warning.inference.session.type}/${warning.inference.session.id}`}
            >
              View full session
            </Link>
          ) : null}
          <Inference inference={warning.inference} />
        </>
      ) : (
        <DotLoader />
      )}
    </Page>
  );
};

export default WarningPage;
