import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/aza/app-shell";
import { IdeaCard } from "@/components/aza/idea-card";
import { OpportunityCard } from "@/components/aza/ui";
import { ideas, opportunities } from "@/lib/aza-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aza — Opportunities, ideas and tools for young founders" },
      { name: "description", content: "See grants and scholarships closing this week, plus fresh ideas from the Aza community." },
      { property: "og:title", content: "Aza — Opportunities closing this week" },
      { property: "og:description", content: "Grants, scholarships and founder ideas in one feed." },
    ],
  }),
  component: Home,
});

function Home() {
  const closing = opportunities.filter((o) => o.daysLeft <= 10);
  return (
    <AppShell>
      <section className="mb-8 rounded-lg border bg-muted p-5 md:p-6">
        <p className="text-sm font-medium text-muted-foreground">This week</p>
        <h1 className="mt-1 text-2xl font-semibold md:text-3xl">
          {closing.length} opportunities close in the next 10 days
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">12 new listings added since Monday · 3 match your profile</p>
      </section>

      <SectionHead title="Closing soon" to="/discover" />
      <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {closing.map((o) => <OpportunityCard key={o.id} o={o} />)}
      </div>

      <SectionHead title="From the community" to="/growth" />
      <div className="grid gap-3 lg:grid-cols-2">
        {ideas.slice(0, 2).map((i) => <IdeaCard key={i.id} idea={i} />)}
      </div>
    </AppShell>
  );
}

function SectionHead({ title, to }: { title: string; to: "/discover" | "/growth" }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Link to={to} className="inline-flex h-11 items-center gap-1 rounded-md px-2 text-sm font-medium text-primary hover:bg-accent">
        See all <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
