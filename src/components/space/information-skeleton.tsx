export function InformationSkeleton() {
  return (
    <div className="grid animate-pulse gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="h-6 w-2/3 rounded bg-gray-200"></div>
        <div className="ml-auto text-center">
          <div className="mb-2 h-4 w-20 rounded bg-gray-200"></div>
          <div className="h-8 w-16 rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="grid gap-1 rounded-xl bg-zinc-50 p-4">
        <div className="mb-2 h-6 w-1/2 rounded bg-gray-200"></div>
        <div className="flex justify-between">
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="grid flex-1 gap-1 rounded-xl bg-zinc-50 px-4 py-3"
          >
            <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
            <div className="h-6 w-2/3 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
