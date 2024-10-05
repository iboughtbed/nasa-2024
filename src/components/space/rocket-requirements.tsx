"use client";

import { useActions, useUIState } from "ai/rsc";
import * as React from "react";

import { Icons } from "~/components/icons";
import type { AI } from "~/lib/chat/actions";

interface RocketRequirementsProps {
  summary: {
    crewSize: number;
    payloadWeight: number;
    fuelAmount: number;
    rocketType: "chemical" | "nuclear" | "ionThrusters" | "fusion";
    missionDuration: number;
  };
}

export const suggestions = [
  "Simulate the journey to the exoplanet",
  // "Adjust mission parameters"
];

export function RocketRequirements({ summary }: RocketRequirementsProps) {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  const [loading, setLoading] = React.useState(true);
  const { crewSize, payloadWeight, fuelAmount, rocketType, missionDuration } =
    summary;

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="">
            <div className="text-lg font-medium">Rocket Requirements</div>
            <div className="text-sm">Mission to Exoplanet</div>
          </div>
          <div className="ml-auto text-center">
            <div className="text-xs uppercase text-zinc-600">
              Duration (days)
            </div>
            <div className="font-mono text-2xl">{missionDuration}</div>
          </div>
        </div>

        {loading ? (
          <div className="relative mb-6 h-8 overflow-hidden rounded-full bg-gray-200">
            <div className="absolute inset-0 flex items-center">
              <div className="animate-rocket-progress h-2 rounded-full bg-blue-500"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-start">
              <div className="animate-rocket-move text-2xl">🚀</div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-1 rounded-xl bg-zinc-50 p-4">
              <div className="text-lg font-medium">Crew and Payload</div>
              <div className="flex justify-between text-sm">
                <div>Crew Size: {crewSize} members</div>
                <div className="">
                  Payload: {payloadWeight.toLocaleString()} kg
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="grid shrink-0 grow gap-1 rounded-xl bg-zinc-50 px-4 py-3">
                <div className="text-xs uppercase text-zinc-600">
                  Fuel Amount
                </div>
                <div className="font-mono text-base leading-none">
                  {fuelAmount.toLocaleString()} liters
                </div>
              </div>
              <div className="grid gap-1 rounded-xl bg-zinc-50 px-4 py-3">
                <div className="text-xs uppercase text-zinc-600">
                  Rocket Type
                </div>
                <div className="text-base leading-none">
                  {rocketType.charAt(0).toUpperCase() + rocketType.slice(1)}{" "}
                  Propulsion
                </div>
              </div>
              <div className="grid shrink-0 grow gap-1 rounded-xl bg-zinc-50 px-4 py-3">
                <div className="text-xs uppercase text-zinc-600">
                  Mission Duration
                </div>
                <div className="text-base leading-none">
                  {missionDuration} days
                </div>
              </div>
            </div>
          </>
        )}
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
