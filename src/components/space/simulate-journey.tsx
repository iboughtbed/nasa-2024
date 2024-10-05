"use client";

// import { Icons } from "~/components/icons";

interface SimulateJourneyProps {
  summary: {
    startTime: string;
    endTime: string;
    distance: number;
    averageSpeed: number;
    fuelUsed: number;
  };
}

export function SimulateJourney({ summary }: SimulateJourneyProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="">
            <div className="text-lg font-medium">Journey Simulation</div>
            <div className="text-sm">Earth - Destination</div>
          </div>
          <div className="ml-auto text-center">
            <div className="text-xs uppercase text-zinc-600">Distance (ly)</div>
            <div className="font-mono text-2xl">{summary.distance}</div>
          </div>
        </div>
        <div className="grid gap-1 rounded-xl bg-zinc-50 p-4">
          <div className="text-lg font-medium">Journey Details</div>
          <div className="flex justify-between text-sm">
            <div>Start: {new Date(summary.startTime).toLocaleString()}</div>
            <div>End: {new Date(summary.endTime).toLocaleString()}</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="grid shrink-0 grow gap-1 rounded-xl bg-zinc-50 px-4 py-3">
            <div className="text-xs uppercase text-zinc-600">Average Speed</div>
            <div className="font-mono text-base leading-none">
              {summary.averageSpeed.toLocaleString()} km/h
            </div>
          </div>
          <div className="grid gap-1 rounded-xl bg-zinc-50 px-4 py-3">
            <div className="text-xs uppercase text-zinc-600">Fuel Used</div>
            <div className="text-base leading-none">
              {summary.fuelUsed.toLocaleString()} liters
            </div>
          </div>
          <div className="grid shrink-0 grow gap-1 rounded-xl bg-zinc-50 px-4 py-3">
            <div className="text-xs uppercase text-zinc-600">Travel Time</div>
            <div className="text-base leading-none">
              {calculateTravelTime(summary.startTime, summary.endTime)}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-center">
        <button className="flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-sm transition-colors hover:bg-zinc-100">
          <Icons.rocket className="size-3.5" />
          Start Simulation
        </button>
      </div> */}
    </div>
  );
}

function calculateTravelTime(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} years, ${diffInDays % 365} days`;
  } else {
    return `${diffInDays} days`;
  }
}
