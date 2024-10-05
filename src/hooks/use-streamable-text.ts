import { type StreamableValue, readStreamableValue } from "ai/rsc";
import * as React from "react";

export const useStreamableText = (
  content: string | StreamableValue<string>,
) => {
  const [rawContent, setRawContent] = React.useState(
    typeof content === "string" ? content : "",
  );

  React.useEffect(() => {
    async function parse() {
      if (typeof content === "object") {
        let value = "";
        for await (const delta of readStreamableValue(content)) {
          if (typeof delta === "string") {
            setRawContent((value = value + delta));
          }
        }
      }
    }

    void parse();
  }, [content]);

  return rawContent;
};
