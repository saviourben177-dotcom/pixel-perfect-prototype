import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, btn, Stars } from "@/components/aza/kit";
import { PageHeader, Tag } from "@/components/aza/ui";
import { businesses } from "@/lib/aza-data";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/business/directory/")({
  head: () => meta("Business directory", "Find and rate local businesses run by young founders."),
  component: Directory,
});

function Directory() {
  return (
    <AppShell>
      <BackLink to="/business" label="Business" />
      <PageHeader title="Directory" sub="Local businesses near you" action={<Link to="/business/directory/new" className={btn.primary}>List yours</Link>} />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {businesses.map((b) => (
          <Link key={b.id} to="/business/directory/$id" params={{ id: b.id }} className="card-lift flex flex-col gap-3 rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <span className="emboss grid size-11 place-items-center rounded-md border font-display text-sm font-bold">{b.mark}</span>
              <div className="min-w-0">
                <h3 className="flex items-center gap-1 truncate text-base">{b.name}{b.verified && <BadgeCheck aria-label="Verified" className="size-4 shrink-0 text-primary" />}</h3>
                <p className="text-sm text-muted-foreground">{b.location}</p>
              </div>
            </div>
            <p className="line-clamp-2 text-sm text-foreground/80">{b.description}</p>
            <div className="mt-auto flex items-center justify-between"><Tag>{b.category}</Tag><span className="flex items-center gap-1 text-sm"><Stars value={Math.round(b.rating)} /><span className="tabular font-bold">{b.rating}</span></span></div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
