import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, btn, Pills } from "@/components/aza/kit";
import { AuthorLine, PageHeader, Tag } from "@/components/aza/ui";
import { listings } from "@/lib/aza-data";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/business/marketplace/")({
  head: () => meta("Marketplace", "Buy, sell, offer services and find collaborators."),
  component: Market,
});

const types = ["All", "Sell", "Buy", "Service", "Collaborate"] as const;

function Market() {
  const [t, setT] = useState<(typeof types)[number]>("All");
  return (
    <AppShell>
      <BackLink to="/business" label="Business" />
      <PageHeader title="Marketplace" sub="Trade with founders near you" action={<Link to="/business/marketplace/new" className={btn.primary}>Post a listing</Link>} />
      <Pills options={types} value={t} onChange={setT} />
      <div className="grid gap-3 md:grid-cols-2">
        {listings.filter((l) => t === "All" || l.type === t).map((l) => (
          <article key={l.id} className="card-lift flex flex-col gap-3 rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between gap-2"><Tag tone={l.type === "Sell" ? "primary" : l.type === "Collaborate" ? "info" : "neutral"}>{l.type}</Tag>{l.price && <span className="tabular font-display font-extrabold">{l.price}</span>}</div>
            <h3 className="text-base">{l.title}</h3>
            <p className="text-sm text-foreground/80">{l.body}</p>
            <div className="mt-auto pt-1"><AuthorLine id={l.author} hoursAgo={l.hoursAgo} /></div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
