import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, btn, Empty } from "@/components/aza/kit";
import { PageHeader } from "@/components/aza/ui";
import { ideas, me } from "@/lib/aza-data";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";
import { toast } from "sonner";

export const Route = createFileRoute("/growth/my-ideas")({
  head: () => meta("Your ideas", "Manage the ideas you've posted: update the stage or remove them."),
  component: MyIdeas,
});

const stages = ["Idea", "Validating", "Building", "Launched"];

function MyIdeas() {
  const [list, setList] = useState(ideas.filter((i) => i.author === me.id));
  return (
    <AppShell>
      <BackLink to="/growth" label="Growth" />
      <PageHeader title="Your ideas" action={<Link to="/growth/ideas/new" className={btn.primary}>Share an idea</Link>} />
      {list.length === 0 ? <Empty title="No ideas yet" sub="Share what you're building to get feedback." /> : (
        <ul className="grid gap-3">
          {list.map((i) => (
            <li key={i.id} className="grid gap-3 rounded-lg border bg-card p-4 shadow-[var(--shadow-card)] sm:grid-cols-[1fr_auto] sm:items-center">
              <Link to="/growth/ideas/$ideaId" params={{ ideaId: i.id }} className="font-bold hover:underline">{i.title}</Link>
              <div className="flex gap-2">
                <select aria-label="Stage" defaultValue={stages[0]} onChange={(e) => api.setIdeaStage(i.id, e.target.value).then(() => toast.success("Stage updated"))} className="h-11 rounded-md border border-input bg-background px-3 text-sm">
                  {stages.map((s) => <option key={s}>{s}</option>)}
                </select>
                <button className={btn.danger} onClick={async () => { await api.deleteIdea(i.id); setList(list.filter((x) => x.id !== i.id)); toast.success("Idea deleted"); }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
