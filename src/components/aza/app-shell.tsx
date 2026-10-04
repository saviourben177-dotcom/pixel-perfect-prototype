import { Link } from "@tanstack/react-router";
import { Bell, Briefcase, Compass, Home, Search, Sprout, User } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/growth", label: "Growth", icon: Sprout },
  { to: "/business", label: "Business", icon: Briefcase },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 hidden border-b bg-background md:block">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6">
          <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
            aza<span className="text-primary">.</span>
          </Link>
          <nav className="flex gap-1" aria-label="Main">
            {tabs.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                activeOptions={{ exact: t.to === "/" }}
                className="inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                activeProps={{ className: "bg-primary-soft !text-primary-strong font-semibold" }}
              >
                <t.icon className="size-4" strokeWidth={2} />
                {t.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex gap-1">
            <Link to="/search" aria-label="Search" className="grid size-11 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"><Search className="size-4" /></Link>
            <Link to="/notifications" aria-label="Notifications" className="relative grid size-11 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"><Bell className="size-4" /><span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary" /></Link>
          </div>
        </div>
      </header>
      <div className="flex h-14 items-center justify-between border-b px-4 md:hidden">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight">aza<span className="text-primary">.</span></Link>
        <div className="flex gap-1">
          <Link to="/search" aria-label="Search" className="grid size-11 place-items-center rounded-md text-muted-foreground"><Search className="size-5" /></Link>
          <Link to="/notifications" aria-label="Notifications" className="relative grid size-11 place-items-center rounded-md text-muted-foreground"><Bell className="size-5" /><span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary" /></Link>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 md:px-6 md:pb-16 md:pt-10">{children}</main>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeOptions={{ exact: t.to === "/" }}
            className="relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium text-muted-foreground"
            activeProps={{ className: "!text-primary-strong font-bold before:absolute before:inset-x-5 before:top-0 before:h-0.5 before:rounded-full before:bg-primary" }}
          >
            <t.icon className="size-5" strokeWidth={2} />
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
