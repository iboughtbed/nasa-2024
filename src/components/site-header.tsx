import type { User } from "@clerk/nextjs/server";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

interface SiteHeaderProps {
  user: User | null;
}

export function SiteHeader({}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <Icons.gemini className="size-6" />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button asChild size="sm" variant="ghost">
          <a
            target="_blank"
            href="https://github.com/iboughtbed/nasa-2024"
            rel="noopener noreferrer"
          >
            <Icons.github className="size-4" />
            <span className="ml-2 hidden md:flex">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
