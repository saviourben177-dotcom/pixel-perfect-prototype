import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink } from "@/components/aza/kit";
import { PageHeader, Tag } from "@/components/aza/ui";
import { funding } from "@/lib/aza-data";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/business/funding")({
  head: () => meta("Funding", "Loans, grants and equity funding for young African businesses."),
  component: () => (
    <AppShell>
      <BackLink to="/business" label="Business" />
      <PageHeader title="Funding" sub="Loans, grants and equity" />
      <div className="grid gap-3 md:grid-cols-2">
        {funding.map((f) => (
          <article key={f.id} className="card-lift rounded-lg border bg-card p-4">
            <div className="mb-2 flex items-center justify-between"><Tag tone={f.kind === "Grant" ? "primary" : f.kind === "Equity" ? "info" : "neutral"}>{f.kind}</Tag><span className="tabular font-display font-extrabold">{f.amount}</span></div>
            <h3 className="text-base">{f.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.note}</p>
          </article>
        ))}
      </div>
    </AppShell>
  ),
});
