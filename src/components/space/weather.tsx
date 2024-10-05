"use client";

import { useActions, useUIState } from "ai/rsc";

import { Icons } from "~/components/icons";
import type { AI } from "~/lib/chat/actions";

interface WeatherProps {
  summary: {
    name: string;
    temperature: number;
    atmosphericPressure: number;
    windSpeed: number;
    conditions: "clear" | "cloudy" | "storm" | "rain" | "snow" | "windy";
  };
}

export const suggestions = [
  "Plan a mission to the exoplanet with rocket requirements",
];

export function Weather({ summary }: WeatherProps) {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="">
            <div className="text-lg font-medium">Weather on {summary.name}</div>
            <div className="text-sm">
              Current Conditions: {summary.conditions}
            </div>
          </div>
          <div className="ml-auto text-center">
            <div className="text-xs uppercase text-zinc-600">Temperature</div>
            <div className="font-mono text-2xl">{summary.temperature}°C</div>
          </div>
        </div>
        <div className="grid gap-1 rounded-xl bg-zinc-50 p-4">
          <div className="text-lg font-medium">Atmospheric Details</div>
          <div className="flex justify-between text-sm">
            <div>Pressure: {summary.atmosphericPressure} Pa</div>
            <div className="">Wind Speed: {summary.windSpeed} m/s</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="grid gap-1 rounded-xl bg-zinc-50 px-4 py-3">
            <div className="text-xs uppercase text-zinc-600">Conditions</div>
            <div className="text-base capitalize leading-none">
              {summary.conditions}
            </div>
          </div>
          <div className="grid flex-grow gap-1 rounded-xl bg-zinc-50 px-4 py-3">
            <div className="text-xs uppercase text-zinc-600">Description</div>
            <div className="text-base leading-none">
              {getWeatherDescription(summary.conditions)}
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

function getWeatherDescription(
  conditions: WeatherProps["summary"]["conditions"],
) {
  switch (conditions) {
    case "clear":
      return "Clear skies with excellent visibility.";
    case "cloudy":
      return "Overcast with cloud cover.";
    case "storm":
      return "Severe weather conditions with possible electrical activity.";
    case "rain":
      return "Precipitation in liquid form.";
    case "snow":
      return "Frozen precipitation, possibly in crystalline form.";
    case "windy":
      return "Strong air currents with potential for dust or particle movement.";
  }
}
