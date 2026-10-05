import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, btn, Progress, Section } from "@/components/aza/kit";
import { PageHeader, Tag } from "@/components/aza/ui";
import { me } from "@/lib/aza-data";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/profile/cv/")({
  head: () => meta("Your CV", "View your CV and tailor it to each opportunity."),
  component: () => (
    <AppShell>
      <BackLink to="/profile" label="Profile" />
      <PageHeader title="Your CV" action={<Link to="/profile/cv/edit" className={btn.primary}>Edit CV</Link>} />
      <div className="mb-8 max-w-2xl rounded-lg border bg-primary-soft p-4"><p className="mb-2 text-sm font-bold text-primary-strong">60% complete</p><Progress value={60} /></div>
      <article className="max-w-2xl rounded-lg border bg-card p-6 shadow-[var(--shadow-lift)]">
        <h2 className="text-2xl">{me.name}</h2>
        <p className="mb-6 text-sm text-muted-foreground">{me.role} · {me.location}</p>
        <Section title="Summary"><p className="text-sm leading-relaxed">Self-taught builder focused on education tools for students across Nigeria.</p></Section>
        <Section title="Experience"><p className="text-sm"><b>Founder, WhatsApp JAMB tutor</b> · 2025 – now</p></Section>
        <Section title="Skills"><div className="flex flex-wrap gap-1.5">{["Product design", "Python", "Bookkeeping"].map((s) => <Tag key={s}>{s}</Tag>)}</div></Section>
        <Section title="Education" className="mb-0"><p className="text-sm text-muted-foreground">Not added yet</p></Section>
      </article>
    </AppShell>
  ),
});
