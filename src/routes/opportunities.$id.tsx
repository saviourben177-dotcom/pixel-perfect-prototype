import { createFileRoute, notFound } from "@tanstack/react-router";
import { BadgeCheck, Bookmark, ExternalLink, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, btn } from "@/components/aza/kit";
import { Deadline, Tag } from "@/components/aza/ui";
import { opportunities, opportunityDetails } from "@/lib/aza-data";
import { api } from "@/lib/aza/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/opportunities/$id")({
  loader: ({ params }) => {
    const o = opportunities.find((x) => x.id === params.id);
    if (!o) throw notFound();
    return { o, d: opportunityDetails[o.id] };
  },
  head: ({ loaderData }) => loaderData ? {
    meta: [
      { title: `${loaderData.o.title} — Aza` },
      { name: "description", content: loaderData.d.description },
      { property: "og:title", content: loaderData.o.title },
      { property: "og:description", content: loaderData.d.description },
    ],
  } : { meta: [{ title: "Not found — Aza" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => <AppShell><p>Opportunity not found.</p></AppShell>,
  component: Detail,
});

const statuses = ["Not started", "In progress", "Submitted", "Accepted", "Rejected"];

function Detail() {
  const { o, d } = Route.useLoaderData();
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState(statuses[0]);
  return (
    <AppShell>
      <BackLink to="/discover" label="Discover" />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article>
          <div className="mb-4 flex items-center gap-3">
            <span className="emboss grid size-14 place-items-center rounded-lg border font-display text-lg font-bold">{o.orgMark}</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary-strong">{o.category}</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">{o.org}{o.verified && <BadgeCheck aria-label="Verified" className="size-4 text-primary" />}</p>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl">{o.title}</h1>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Tag>{o.location}</Tag>
            {o.amount && <Tag tone="primary">{o.amount}</Tag>}
            <Deadline days={o.daysLeft} />
            <Tag icon={<Users className="size-3.5" />}>{d.applicants} applied</Tag>
          </div>
          <h2 className="mb-2 mt-8 text-lg">About</h2>
          <p className="leading-relaxed text-foreground/85">{d.description}</p>
          <h2 className="mb-2 mt-6 text-lg">Who can apply</h2>
          <p className="leading-relaxed text-foreground/85">{d.eligibility}</p>
        </article>
        <aside className="h-fit space-y-3 rounded-lg border bg-card p-5 shadow-[var(--shadow-lift)] lg:sticky lg:top-24">
          <a href={d.applyUrl} target="_blank" rel="noreferrer" className={cn(btn.primary, "w-full")}>Apply now <ExternalLink className="size-4" /></a>
          <button className={cn(btn.secondary, "w-full")} aria-pressed={saved} onClick={async () => { await api.saveOpportunity(o.id, !saved); setSaved(!saved); toast.success(saved ? "Removed from saved" : "Saved"); }}>
            <Bookmark className="size-4" fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save"}
          </button>
          <button className={cn(btn.secondary, "w-full")} onClick={async () => { const r = await api.tailorCv(o.id); toast.success(r.summary); }}>
            <Sparkles className="size-4 text-primary" /> Tailor my CV
          </button>
          <label className="block pt-2 text-sm">
            <span className="font-semibold">Application status</span>
            <select value={status} onChange={async (e) => { setStatus(e.target.value); await api.setApplicationStatus(o.id, e.target.value); toast.success("Status updated"); }} className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3">
              {statuses.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
        </aside>
      </div>
    </AppShell>
  );
}
