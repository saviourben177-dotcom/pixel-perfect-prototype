import { createFileRoute } from "@tanstack/react-router";
import { Search as Icon } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/aza/app-shell";
import { IdeaCard } from "@/components/aza/idea-card";
import { Empty, Section } from "@/components/aza/kit";
import { OpportunityCard, PageHeader } from "@/components/aza/ui";
import { ideas, opportunities } from "@/lib/aza-data";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/search")({
  head: () => meta("Search", "Search opportunities and ideas across Aza."),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const t = q.toLowerCase().trim();
  const o = t ? opportunities.filter((x) => (x.title + x.org + x.category).toLowerCase().includes(t)) : [];
  const i = t ? ideas.filter((x) => x.pitch.toLowerCase().includes(t)) : [];
  return (
    <AppShell>
      <PageHeader title="Search" />
      <label className="relative mb-8 block max-w-2xl">
        <Icon className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" placeholder="Grants, scholarships, ideas…" className="h-12 w-full rounded-md border border-input bg-background pl-10 pr-3" />
      </label>
      {t && !o.length && !i.length && <Empty title="No results" sub="Try another word." />}
      {o.length > 0 && <Section title="Opportunities"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{o.map((x) => <OpportunityCard key={x.id} o={x} />)}</div></Section>}
      {i.length > 0 && <Section title="Ideas"><div className="grid gap-3 lg:grid-cols-2">{i.map((x) => <IdeaCard key={x.id} idea={x} />)}</div></Section>}
    </AppShell>
  );
}
