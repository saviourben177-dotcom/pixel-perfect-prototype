import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, btn } from "@/components/aza/kit";
import { PageHeader } from "@/components/aza/ui";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/growth/assistant")({
  head: () => meta("Growth assistant", "Ask for a learning plan, business advice or feedback on an idea."),
  component: Assistant,
});

function Assistant() {
  const [msgs, setMsgs] = useState<{ me: boolean; text: string }[]>([]);
  const [busy, setBusy] = useState(false);
  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const q = String(new FormData(f).get("q") ?? "").trim();
    if (!q) return;
    f.reset();
    setMsgs((m) => [...m, { me: true, text: q }]);
    setBusy(true);
    const a = await api.askAssistant(q);
    setMsgs((m) => [...m, { me: false, text: a }]);
    setBusy(false);
  }
  return (
    <AppShell>
      <BackLink to="/growth" label="Growth" />
      <PageHeader title="Assistant" sub="Ask about skills, ideas or your business" />
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 min-h-48 space-y-3 rounded-lg border bg-muted/50 p-4">
          {msgs.length === 0 && <p className="text-sm text-muted-foreground">Try: "How do I start learning product design for free?"</p>}
          {msgs.map((m, i) => (
            <p key={i} className={cn("max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm", m.me ? "ml-auto bg-primary text-primary-foreground" : "border bg-card")}>{m.text}</p>
          ))}
          {busy && <p className="text-sm text-muted-foreground">Thinking…</p>}
        </div>
        <form onSubmit={send} className="flex gap-2">
          <input name="q" aria-label="Your question" placeholder="Ask a question" className="h-11 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm" />
          <button className={btn.primary} aria-label="Send"><Send className="size-4" /></button>
        </form>
      </div>
    </AppShell>
  );
}
