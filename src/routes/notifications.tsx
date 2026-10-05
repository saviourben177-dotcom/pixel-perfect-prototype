import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/aza/app-shell";
import { btn } from "@/components/aza/kit";
import { PageHeader } from "@/components/aza/ui";
import { notifications, timeAgo } from "@/lib/aza-data";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => meta("Notifications", "Deadlines, replies and team updates."),
  component: Notifs,
});

function Notifs() {
  const [list, setList] = useState(notifications);
  return (
    <AppShell>
      <PageHeader title="Notifications" action={<button className={btn.ghost} onClick={async () => { await api.markAllRead(); setList(list.map((n) => ({ ...n, unread: false }))); }}>Mark all read</button>} />
      <ul className="divide-y overflow-hidden rounded-lg border bg-card shadow-[var(--shadow-card)]">
        {list.map((n) => (
          <li key={n.id}>
            <Link to={n.to} className={cn("grid grid-cols-[auto_1fr] gap-3 p-4 hover:bg-accent", n.unread && "bg-primary-soft/50")}>
              <span className={cn("mt-1.5 size-2 rounded-full", n.unread ? "bg-primary" : "bg-transparent")} />
              <span><span className="block font-bold">{n.title}</span><span className="block text-sm text-muted-foreground">{n.body} · {timeAgo(n.hoursAgo)}</span></span>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
