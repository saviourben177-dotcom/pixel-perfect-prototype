import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Lightbulb, MessageSquareText, PenLine, Sprout } from "lucide-react";
import { AppShell } from "@/components/aza/app-shell";
import { IdeaCard } from "@/components/aza/idea-card";
import { Progress, Section, Tile } from "@/components/aza/kit";
import { PageHeader } from "@/components/aza/ui";
import { ideas, skills } from "@/lib/aza-data";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/growth/")({
  head: () => meta("Growth", "Track skills, find free courses and share ideas with young founders."),
  component: GrowthHub,
});

function GrowthHub() {
  return (
    <AppShell>
      <PageHeader title="Growth" sub="Learn, build and get feedback" />
      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
        <Tile to="/growth/ideas" icon={Lightbulb} title="Ideas" sub="Community feed" />
        <Tile to="/growth/ideas/new" icon={PenLine} title="Share" sub="Post an idea" />
        <Tile to="/growth/skills" icon={Sprout} title="Skills" sub="Your progress" />
        <Tile to="/growth/courses" icon={BookOpen} title="Courses" sub="Free and paid" />
        <Tile to="/growth/assistant" icon={MessageSquareText} title="Assistant" sub="Ask anything" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <Section title="Trending ideas">
          <div className="grid gap-3">{ideas.slice(0, 3).map((i) => <IdeaCard key={i.id} idea={i} />)}</div>
        </Section>
        <Section title="Your skills">
          <div className="space-y-4 rounded-lg border bg-card p-5 shadow-[var(--shadow-card)]">
            {skills.map((s) => (
              <div key={s.id}>
                <div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold">{s.name}</span><span className="tabular font-bold text-primary-strong">{s.progress}%</span></div>
                <Progress value={s.progress} />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
