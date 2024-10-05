"use client";

import { useActions, useUIState } from "ai/rsc";
import { Icons } from "~/components/icons";

import type { AI } from "~/lib/chat/actions";

interface InformationProps {
  summary: {
    name: string;
    type: string;
    orbitalPeriod: number;
    radius: number;
    mass: number;
    surfaceGravity: number;
    atmosphericComposition: string;
    distance: number;
  };
}

export const suggestions = [
  "Check the weather on the exoplanet",
  "Plan a mission to the exoplanet",
];

export function Information({ summary }: InformationProps) {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="">
            <div className="text-lg font-medium">{summary.name}</div>
            <div className="text-sm">Earth - {summary.name}</div>
          </div>
          <div className="ml-auto text-center">
            <div className="text-xs uppercase text-zinc-600">Distance (ly)</div>
            <div className="font-mono text-2xl">{summary.distance}</div>
          </div>
        </div>
        <div className="grid gap-1 rounded-xl bg-zinc-50 p-4">
          <div className="text-lg font-medium">Orbital Characteristics</div>
          <div className="flex justify-between text-sm">
            <div>Period: {summary.orbitalPeriod} Earth days</div>
            <div className="">Radius: {summary.radius} AU</div>
            <div className="">Mass: {summary.mass} Earth masses</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="grid shrink-0 grow gap-1 rounded-xl bg-zinc-50 px-4 py-3">
            <div className="text-xs uppercase text-zinc-600">
              Surface Gravity
            </div>
            <div className="font-mono text-base leading-none">
              {summary.surfaceGravity} m/s²
            </div>
          </div>
          <div className="grid gap-1 rounded-xl bg-zinc-50 px-4 py-3">
            <div className="text-xs uppercase text-zinc-600">Type</div>
            <div className="text-base leading-none">
              {summary.type.toUpperCase()}
            </div>
          </div>
          <div className="grid shrink-0 grow gap-1 rounded-xl bg-zinc-50 px-4 py-3">
            <div className="text-xs uppercase text-zinc-600">Year Length</div>
            <div className="text-base leading-none">
              {summary.orbitalPeriod} days
            </div>
          </div>
          <div className="grid gap-1 rounded-xl bg-zinc-50 px-4 py-3">
            <div className="text-xs uppercase text-zinc-600">Atmosphere</div>
            <div className="text-base leading-none">
              {summary.atmosphericComposition}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 sm:flex-row">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-sm transition-colors hover:bg-zinc-100"
            onClick={async () => {
              const response = await submitUserMessage(suggestion);
              setMessages((currentMessages) => [...currentMessages, response]);
            }}
          >
            <Icons.sparkle className="size-3.5" />
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
