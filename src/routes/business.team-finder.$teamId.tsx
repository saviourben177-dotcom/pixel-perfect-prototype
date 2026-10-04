import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, btn } from "@/components/aza/kit";
import { AuthorLine, Tag } from "@/components/aza/ui";
import { teamPosts } from "@/lib/aza-data";

export const Route = createFileRoute("/business/team-finder/$teamId")({
  loader: ({ params }) => {
    const t = teamPosts.find((x) => x.id === params.teamId);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData }) => loaderData ? {
    meta: [
      { title: `${loaderData.name} — Team Finder` },
      { name: "description", content: `Looking for: ${loaderData.roles.join(", ")}` },
      { property: "og:title", content: loaderData.name },
      { property: "og:description", content: `Looking for: ${loaderData.roles.join(", ")}` },
    ],
  } : { meta: [{ title: "Not found — Aza" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => <AppShell><p>Team not found.</p></AppShell>,
  component: Team,
});

function Team() {
  const t = Route.useLoaderData();
  return (
    <AppShell>
      <BackLink to="/business/team-finder" label="Team Finder" />
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl">{t.name}</h1>
        <div className="my-4"><AuthorLine id={t.owner} hoursAgo={30} op /></div>
        <div className="mb-6 flex flex-wrap gap-1.5"><Tag>{t.where}</Tag><Tag>{t.commitment}</Tag><Tag tone="primary">{t.equity}</Tag></div>
        <h2 className="mb-2 text-lg">Open roles</h2>
        <ul className="mb-6 divide-y rounded-lg border bg-card shadow-[var(--shadow-card)]">
          {t.roles.map((r) => <li key={r} className="p-4 font-semibold">{r}</li>)}
        </ul>
        <Link to="/business/team-finder/$teamId/join" params={{ teamId: t.id }} className={btn.primary}>Request to join</Link>
      </div>
    </AppShell>
  );
}
