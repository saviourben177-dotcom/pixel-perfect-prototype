import { createFileRoute } from "@tanstack/react-router";
import { BareShell } from "@/components/aza/kit";
import { meta } from "@/lib/aza/meta";
import { infoPages } from "@/lib/aza/info";

export const Route = createFileRoute("/about")({
  head: () => meta("About", "Aza helps young Africans find opportunities, learn skills and build businesses."),
  component: () => (
    <BareShell>
      <h1 className="mb-2 text-3xl">About</h1>
      <p className="mb-8 text-muted-foreground">Aza helps young Africans find opportunities, learn skills and build businesses.</p>
      <div className="space-y-6">
        {infoPages.about.map(([h, b]) => (
          <section key={h}><h2 className="mb-1 text-lg">{h}</h2><p className="leading-relaxed text-foreground/85">{b}</p></section>
        ))}
      </div>
    </BareShell>
  ),
});
