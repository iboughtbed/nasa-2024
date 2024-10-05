"use client";

import type { User } from "@clerk/nextjs/server";
import { useUIState } from "ai/rsc";
import * as React from "react";

import { ChatList } from "~/components/chat-list";
import { ChatPanel } from "~/components/chat-panel";
import { EmptyScreen } from "~/components/empty-screen";
import type { AI, Message } from "~/lib/chat/actions";
import { cn } from "~/lib/utils";

interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  user?: User | null;
}

export function Chat({ className }: ChatProps) {
  const [input, setInput] = React.useState("");
  const [messages] = useUIState<typeof AI>();

  return (
    <div className="group w-full overflow-auto">
      <div className={cn("pb-[200px] pt-4", className)}>
        {messages.length ? <ChatList messages={messages} /> : <EmptyScreen />}
      </div>
      <ChatPanel input={input} setInput={setInput} />
    </div>
  );
}
