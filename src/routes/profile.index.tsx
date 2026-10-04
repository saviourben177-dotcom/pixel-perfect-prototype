import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, FileText, Settings } from "lucide-react";
import { AppShell } from "@/components/aza/app-shell";
import { IdeaCard } from "@/components/aza/idea-card";
import { Avatar, OpportunityCard } from "@/components/aza/ui";
import { ideas, me, opportunities } from "@/lib/aza-data";

export const Route = createFileRoute("/profile/")({
  head: () => ({
    meta: [
      { title: "Your profile — Aza" },
      { name: "description", content: "Your ideas, saved opportunities and CV on Aza." },
      { property: "og:title", content: "Your profile — Aza" },
      { property: "og:description", content: "Ideas, saved opportunities and CV in one place." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const mine = ideas.filter((i) => i.author === me.id);
  return (
    <AppShell>
      <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar id={me.id} size={64} />
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold">{me.name}</h1>
            <p className="text-sm text-muted-foreground">{me.role} · {me.location}</p>
          </div>
        </div>
        <Link to="/profile/settings" aria-label="Settings" className="grid size-11 place-items-center rounded-md border hover:bg-accent"><Settings className="size-4" /></Link>
      </div>

      <div className="mb-8 grid grid-cols-3 divide-x rounded-lg border bg-card text-center shadow-[var(--shadow-card)]">
        {[["Ideas", mine.length], ["Saved", 3], ["Applied", 2]].map(([l, n]) => (
          <div key={l} className="p-4"><p className="tabular font-display text-2xl font-extrabold">{n}</p><p className="text-sm text-muted-foreground">{l}</p></div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Bookmark className="size-4" /> Saved</h2>
          <div className="grid gap-3 sm:grid-cols-2">{opportunities.slice(0, 3).map((o) => <OpportunityCard key={o.id} o={o} />)}</div>
          <h2 className="mb-3 mt-8 text-lg font-semibold">Your ideas</h2>
          <div className="grid gap-3">{mine.map((i) => <IdeaCard key={i.id} idea={i} />)}</div>
        </div>
        <aside className="h-fit rounded-lg border p-5">
          <FileText className="size-5 text-primary" />
          <h2 className="mt-3 text-base font-semibold">Your CV is 60% complete</h2>
          <p className="mt-1 text-sm text-muted-foreground">Add education and one project to tailor applications automatically.</p>
          <div className="mt-4 h-2 rounded-full bg-muted"><div className="h-2 w-3/5 rounded-full bg-primary" /></div>
          <Link to="/profile/cv" className="mt-4 inline-flex h-11 items-center text-sm font-bold text-primary-strong">Finish CV</Link>
        </aside>
      </div>
    </AppShell>
  );
}
