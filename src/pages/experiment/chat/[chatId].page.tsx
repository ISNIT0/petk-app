import { useRouter } from "next/router";
import SessionPage from "@/components/SessionPage/SessionPage";

export const ChatPage = () => {
  const router = useRouter();
  const { chatId } = router.query;

  return <SessionPage sessionType="chat" sessionId={chatId as string} />;
};

export default ChatPage;
