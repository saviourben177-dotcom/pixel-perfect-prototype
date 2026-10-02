import { Link } from "@tanstack/react-router";
import { BadgeCheck, Clock } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { people, timeAgo, type Opportunity } from "@/lib/aza-data";

export function Avatar({ id, size = 40 }: { id: string; size?: number }) {
  const p = people[id];
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="grid shrink-0 place-items-center rounded-full bg-primary-soft font-display text-sm font-semibold text-foreground"
    >
      {p.initials}
    </span>
  );
}

export function Tag({ children, icon, tone = "neutral" }: { children: ReactNode; icon?: ReactNode; tone?: "neutral" | "urgent" | "primary" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
        tone === "neutral" && "border-border bg-muted text-muted-foreground",
        tone === "urgent" && "border-transparent bg-urgent-soft text-urgent",
        tone === "primary" && "border-transparent bg-primary-soft text-foreground",
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function Deadline({ days }: { days: number }) {
  const urgent = days <= 7;
  return (
    <Tag tone={urgent ? "urgent" : "neutral"} icon={<Clock className="size-3.5" strokeWidth={2} />}>
      {days === 0 ? "Closes today" : `${days} days left`}
    </Tag>
  );
}

export function PageHeader({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function OpportunityCard({ o }: { o: Opportunity }) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-border-strong">
      <div className="flex min-w-0 items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-md border bg-muted font-display text-sm font-semibold">
          {o.orgMark}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug">{o.title}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
            {o.org}
            {o.verified && <BadgeCheck aria-label="Verified" className="size-4 text-primary" />}
          </p>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-1.5">
        <Tag>{o.category}</Tag>
        <Tag>{o.location}</Tag>
        {o.amount && <Tag>{o.amount}</Tag>}
        <Deadline days={o.daysLeft} />
      </div>
    </article>
  );
}

export function AuthorLine({ id, hoursAgo, op }: { id: string; hoursAgo: number; op?: boolean }) {
  const p = people[id];
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Link to="/profile" className="rounded-full" aria-label={`${p.name}'s profile`}>
        <Avatar id={id} />
      </Link>
      <div className="min-w-0 text-sm">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <Link to="/profile" className="font-semibold hover:underline">{p.name}</Link>
          {op && <span className="rounded-md bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground">Creator</span>}
        </div>
        <p className="truncate text-muted-foreground">
          {[p.role, p.location].filter(Boolean).join(" · ")} · {timeAgo(hoursAgo)}
        </p>
      </div>
    </div>
  );
}
