import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink } from "@/components/aza/kit";
import { PageHeader, Tag } from "@/components/aza/ui";
import { incubators } from "@/lib/aza-data";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/business/incubators")({
  head: () => meta("Incubators", "Incubators and accelerators across Africa, with intake dates."),
  component: () => (
    <AppShell>
      <BackLink to="/business" label="Business" />
      <PageHeader title="Incubators" sub="Programmes that back early founders" />
      <div className="grid gap-3 md:grid-cols-3">
        {incubators.map((i) => (
          <article key={i.id} className="card-lift flex flex-col gap-3 rounded-lg border bg-card p-4">
            <span className="emboss grid size-11 place-items-center rounded-md border font-display text-sm font-bold">{i.mark}</span>
            <div><h3 className="text-base">{i.name}</h3><p className="text-sm text-muted-foreground">{i.location} · {i.focus}</p></div>
            <div className="mt-auto"><Tag tone="primary">Intake: {i.intake}</Tag></div>
          </article>
        ))}
      </div>
    </AppShell>
  ),
});
