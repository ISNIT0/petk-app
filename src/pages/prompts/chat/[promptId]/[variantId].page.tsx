import { PromptVariantPage } from "@/components/PromptVariantPage/VariantPage";
import { useRouter } from "next/router";

export const PromptVariantDetailPage = () => {
  const router = useRouter();
  const { promptId, variantId } = router.query;
  return (
    <PromptVariantPage
      promptId={promptId as string}
      variantId={variantId as string}
      sessionType="chat"
    />
  );
};

export default PromptVariantDetailPage;
