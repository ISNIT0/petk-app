import { useRouter } from "next/router";
import SessionPage from "@/components/SessionPage/SessionPage";

export const ChatPage = () => {
  const router = useRouter();
  const { instructionId } = router.query;

  return <SessionPage sessionType="instruction" sessionId={instructionId as string} />;
};

export default ChatPage;
