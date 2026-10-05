import { createFileRoute } from "@tanstack/react-router";
import { BareShell } from "@/components/aza/kit";
import { meta } from "@/lib/aza/meta";
import { infoPages } from "@/lib/aza/info";

export const Route = createFileRoute("/privacy")({
  head: () => meta("Privacy", "How Aza collects, uses and protects your data."),
  component: () => (
    <BareShell>
      <h1 className="mb-2 text-3xl">Privacy</h1>
      <p className="mb-8 text-muted-foreground">How Aza collects, uses and protects your data.</p>
      <div className="space-y-6">
        {infoPages.privacy.map(([h, b]) => (
          <section key={h}><h2 className="mb-1 text-lg">{h}</h2><p className="leading-relaxed text-foreground/85">{b}</p></section>
        ))}
      </div>
    </BareShell>
  ),
});
