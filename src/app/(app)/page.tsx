import { Chat } from "~/components/chat";
import { AI } from "~/lib/chat/actions";
import { generateId } from "~/lib/utils";
// import { getCachedUser } from "~/server/auth";

export default async function IndexPage() {
  const id = generateId();
  // const user = await getCachedUser();

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} />
    </AI>
  );
}
