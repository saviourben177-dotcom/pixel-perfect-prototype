import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { PageHeader } from "@/components/aza/ui";
import { prices } from "@/lib/aza-data";
import { meta } from "@/lib/aza/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/prices")({
  head: () => meta("Market prices", "Weekly prices for food, fuel and building materials."),
  component: () => (
    <AppShell>
      <PageHeader title="Market prices" sub="Updated weekly · Lagos averages" />
      <ul className="divide-y overflow-hidden rounded-lg border bg-card shadow-[var(--shadow-card)]">
        {prices.map((p) => (
          <li key={p.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 p-4">
            <span><span className="block font-bold">{p.product}</span><span className="text-sm text-muted-foreground">{p.category}</span></span>
            <span className="tabular font-display font-extrabold">₦{p.price.toLocaleString()}</span>
            <span className={cn("tabular w-14 text-right text-sm font-bold", p.change > 0 ? "text-urgent" : p.change < 0 ? "text-primary-strong" : "text-muted-foreground")}>{p.change > 0 ? "+" : ""}{p.change}%</span>
          </li>
        ))}
      </ul>
    </AppShell>
  ),
});
