import { SiteHeader } from "~/components/site-header";
// import { getCachedUser } from "~/lib/auth";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  // const user = await getCachedUser();
  const user = null;

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
