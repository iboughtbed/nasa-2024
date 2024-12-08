// import { Chat } from "~/components/chat";
// import { AI } from "~/lib/chat/actions";
// import { generateId } from "~/lib/utils";
// import { getCachedUser } from "~/server/auth";

export default async function IndexPage({
  // searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // const id = generateId();
  // const user = await getCachedUser();

  // const planetName = searchParams.planetName as string;

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <h1 className="text-5xl font-semibold">
        Chat has been stopped temperoraly
      </h1>
    </div>
    // <AI initialAIState={{ chatId: id, messages: [] }}>
    //   <Chat id={id} />
    // </AI>
  );
}
