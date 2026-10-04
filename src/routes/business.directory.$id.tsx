import { createFileRoute, notFound } from "@tanstack/react-router";
import { BadgeCheck, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, btn, Stars } from "@/components/aza/kit";
import { Tag } from "@/components/aza/ui";
import { businesses } from "@/lib/aza-data";
import { api } from "@/lib/aza/api";

export const Route = createFileRoute("/business/directory/$id")({
  loader: ({ params }) => {
    const b = businesses.find((x) => x.id === params.id);
    if (!b) throw notFound();
    return b;
  },
  head: ({ loaderData }) => loaderData ? {
    meta: [
      { title: `${loaderData.name} — Aza Directory` },
      { name: "description", content: loaderData.description },
      { property: "og:title", content: loaderData.name },
      { property: "og:description", content: loaderData.description },
    ],
  } : { meta: [{ title: "Not found — Aza" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => <AppShell><p>Business not found.</p></AppShell>,
  component: BusinessDetail,
});

function BusinessDetail() {
  const b = Route.useLoaderData();
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  return (
    <AppShell>
      <BackLink to="/business/directory" label="Directory" />
      <div className="max-w-2xl">
        <div className="mb-4 flex items-center gap-4">
          <span className="emboss grid size-16 place-items-center rounded-lg border font-display text-xl font-bold">{b.mark}</span>
          <div>
            <h1 className="flex items-center gap-2 text-2xl">{b.name}{b.verified && <BadgeCheck aria-label="Verified" className="size-5 text-primary" />}</h1>
            <p className="text-sm text-muted-foreground">{b.location}</p>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2"><Tag>{b.category}</Tag><Stars value={Math.round(b.rating)} /><span className="text-sm"><b className="tabular">{b.rating}</b> · {b.reviews} reviews</span></div>
        <p className="mb-6 leading-relaxed">{b.description}</p>
        <a href={`tel:${b.phone}`} className={btn.primary}><Phone className="size-4" /> Call {b.phone}</a>
        <section className="mt-10 rounded-lg border bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="mb-2 text-lg">Rate this business</h2>
          <Stars value={stars} onChange={setStars} />
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} aria-label="Comment" placeholder="What was it like?" className="mt-3 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
          <button className={`${btn.primary} mt-3`} disabled={!stars} onClick={async () => { await api.rateBusiness(b.id, stars, comment); toast.success("Thanks for your rating"); setStars(0); setComment(""); }}>Submit rating</button>
        </section>
      </div>
    </AppShell>
  );
}
