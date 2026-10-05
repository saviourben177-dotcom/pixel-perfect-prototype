import { createFileRoute } from "@tanstack/react-router";
import { BareShell } from "@/components/aza/kit";
import { meta } from "@/lib/aza/meta";
import { infoPages } from "@/lib/aza/info";

export const Route = createFileRoute("/help")({
  head: () => meta("Help", "Answers to common questions about using Aza."),
  component: () => (
    <BareShell>
      <h1 className="mb-2 text-3xl">Help</h1>
      <p className="mb-8 text-muted-foreground">Answers to common questions about using Aza.</p>
      <div className="space-y-6">
        {infoPages.help.map(([h, b]) => (
          <section key={h}><h2 className="mb-1 text-lg">{h}</h2><p className="leading-relaxed text-foreground/85">{b}</p></section>
        ))}
      </div>
    </BareShell>
  ),
});
