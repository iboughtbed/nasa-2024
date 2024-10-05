import * as React from "react";
import { toast } from "sonner";

import { PromptForm } from "~/components/prompt-form";
import { useActions, useUIState } from "ai/rsc";
import type { AI } from "~/lib/chat/actions";
import { UserMessage } from "~/components/space/message";
import { cn, generateId } from "~/lib/utils";

export interface ChatPanelProps {
  id?: string;
  title?: string;
  input: string;
  setInput: (value: string) => void;
}

export function ChatPanel({ input, setInput }: ChatPanelProps) {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  const exampleMessages = [
    {
      heading: "List information about",
      subheading: "the exoplanet Kepler-186f",
      message: "List information about the exoplanet Kepler-186f",
    },
    {
      heading: "What is the weather",
      subheading: "on Kepler-186f",
      message: "What is the weather on Kepler-186f",
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-white/90 duration-300 ease-in-out dark:from-10% peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid gap-2 px-4 sm:grid-cols-2 sm:gap-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={cn(
                  "cursor-pointer rounded-2xl bg-zinc-50 p-4 text-zinc-950 transition-colors hover:bg-zinc-100 sm:p-6",
                  index > 1 && "hidden md:block",
                )}
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: generateId(),
                      display: <UserMessage>{example.message}</UserMessage>,
                    },
                  ]);

                  try {
                    const responseMessage = await submitUserMessage(
                      example.message,
                    );

                    setMessages((currentMessages) => [
                      ...currentMessages,
                      responseMessage,
                    ]);
                  } catch {
                    toast(
                      <div className="text-red-600">
                        You have reached your message limit! Please try again
                        later, or{" "}
                        <a
                          className="underline"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://vercel.com/templates/next.js/gemini-ai-chatbot"
                        >
                          deploy your own version
                        </a>
                        .
                      </div>,
                    );
                  }
                }}
              >
                <div className="font-medium">{example.heading}</div>
                <div className="text-sm text-zinc-800">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        <div className="grid gap-4 sm:pb-4">
          <PromptForm input={input} setInput={setInput} />
        </div>
      </div>
    </div>
  );
}
