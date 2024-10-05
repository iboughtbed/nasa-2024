// import type { Message } from "ai";

export interface Chat extends Record<string, unknown> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: {
    role: "user" | "assistant" | "system" | "function" | "data" | "tool";
    content: string;
    id?: string;
    name?: string;
    display?: { name: string; props: Record<string, unknown> };
  }[];
  sharePath?: string;
}
