import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { IdeaCard } from "@/components/aza/idea-card";
import { BackLink, Section } from "@/components/aza/kit";
import { OpportunityCard, PageHeader } from "@/components/aza/ui";
import { ideas, opportunities } from "@/lib/aza-data";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/profile/saved")({
  head: () => meta("Saved", "Opportunities and ideas you've saved."),
  component: () => (
    <AppShell>
      <BackLink to="/profile" label="Profile" />
      <PageHeader title="Saved" />
      <Section title="Opportunities"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{opportunities.slice(0, 3).map((o) => <OpportunityCard key={o.id} o={o} />)}</div></Section>
      <Section title="Ideas"><div className="grid gap-3 lg:grid-cols-2">{ideas.slice(1, 3).map((i) => <IdeaCard key={i.id} idea={i} />)}</div></Section>
    </AppShell>
  ),
});
