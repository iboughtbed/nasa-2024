import type { UIState } from "~/lib/chat/actions";

export interface ChatList {
  messages: UIState;
}

export function ChatList({ messages }: ChatList) {
  return messages.length ? (
    <div className="relative mx-auto grid max-w-2xl auto-rows-max gap-8 px-4">
      {messages.map((message) => (
        <div key={message.id} className="grid gap-4">
          {message.spinner}
          {message.display}
          {message.attachments}
        </div>
      ))}
    </div>
  ) : null;
}
