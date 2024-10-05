import { ExternalLink } from "~/components/external-link";

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 p-4 text-sm sm:p-8 sm:text-base">
        <h1 className="inline-block max-w-fit text-2xl font-semibold tracking-tight sm:text-3xl">
          Exosky AI Chatbot
        </h1>
        <p className="leading-normal text-zinc-900">
          This is an open source AI chatbot app built with{" "}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>, the{" "}
          <ExternalLink href="https://sdk.vercel.ai">
            Vercel AI SDK
          </ExternalLink>
          , and <ExternalLink href="https://openai.com">OpenAI</ExternalLink>.
        </p>
        <p className="leading-normal text-zinc-900"></p>
      </div>
    </div>
  );
}
