import { createFileRoute } from "@tanstack/react-router";
import { PenLine } from "lucide-react";
import { AppShell } from "@/components/aza/app-shell";
import { IdeaCard } from "@/components/aza/idea-card";
import { PageHeader } from "@/components/aza/ui";
import { ideas } from "@/lib/aza-data";

export const Route = createFileRoute("/growth/")({
  head: () => ({
    meta: [
      { title: "Ideas feed — Aza Growth" },
      { name: "description", content: "Founders share what they're building and what they need: co-founders, feedback, testers." },
      { property: "og:title", content: "Ideas feed — Aza Growth" },
      { property: "og:description", content: "Real founders, real asks. Join the conversation." },
    ],
  }),
  component: Growth,
});

function Growth() {
  return (
    <AppShell>
      <PageHeader
        title="Ideas"
        sub="What people are building, and what they need from you"
        action={
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <PenLine className="size-4" /> <span className="hidden sm:inline">Share an idea</span>
          </button>
        }
      />
      <div className="mx-auto grid max-w-5xl gap-3 lg:grid-cols-2">
        {ideas.map((i) => <IdeaCard key={i.id} idea={i} />)}
      </div>
    </AppShell>
  );
}
