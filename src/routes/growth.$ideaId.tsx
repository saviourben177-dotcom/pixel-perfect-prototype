import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Send, Target } from "lucide-react";
import { useRef, useState } from "react";
import { AppShell } from "@/components/aza/app-shell";
import { IdeaActions } from "@/components/aza/idea-card";
import { AuthorLine, Tag } from "@/components/aza/ui";
import { ideas, me, getPerson, type Comment } from "@/lib/aza-data";

export const Route = createFileRoute("/growth/$ideaId")({
  loader: ({ params }) => {
    const idea = ideas.find((i) => i.id === params.ideaId);
    if (!idea) throw notFound();
    return { idea };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Idea not found — Aza" }, { name: "robots", content: "noindex" }] };
    const { idea } = loaderData;
    const t = `${getPerson(idea.author).name}: ${idea.ask} — Aza`;
    const d = idea.pitch.slice(0, 150);
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  notFoundComponent: () => (
    <AppShell><p className="py-16 text-center text-muted-foreground">This idea no longer exists.</p></AppShell>
  ),
  component: IdeaThread,
});

const prompts = ["Give feedback on this concept...", "Share your experience with this market...", "Ask the creator a question..."];

function IdeaThread() {
  const { idea } = Route.useLoaderData();
  const [comments, setComments] = useState<Comment[]>(idea.comments);
  const [text, setText] = useState("");
  const ta = useRef<HTMLTextAreaElement>(null);
  const placeholder = prompts[idea.id.length % prompts.length];

  const submit = () => {
    if (!text.trim()) return;
    setComments([...comments, { id: crypto.randomUUID(), author: me.id, body: text.trim(), hoursAgo: 0 }]);
    setText("");
    if (ta.current) ta.current.style.height = "auto";
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <Link to="/growth" className="-ml-2 mb-4 inline-flex h-11 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Ideas
        </Link>

        <article className="border-b pb-4">
          <AuthorLine id={idea.author} hoursAgo={idea.hoursAgo} />
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Tag tone="primary" icon={<Target className="size-3.5" />}>{idea.ask}</Tag>
            <Tag>{idea.stage}</Tag>
          </div>
          <p className="mt-4 text-lg leading-relaxed">{idea.pitch}</p>
          <div className="mt-3"><IdeaActions idea={idea} full /></div>
        </article>

        <h2 className="mt-6 text-base font-semibold">
          {comments.length ? "Conversation" : "No replies yet"}
        </h2>
        {comments.length === 0 && (
          <p className="mt-1 text-sm text-muted-foreground">
            Be the first. Have you seen this problem up close, or tried something similar?
          </p>
        )}
        <ul className="mt-4 space-y-6">
          {comments.map((c) => <CommentItem key={c.id} c={c} op={idea.author} />)}
        </ul>

        <form
          onSubmit={(e) => { e.preventDefault(); submit(); }}
          className="fixed inset-x-0 bottom-14 z-20 border-t bg-background p-3 md:static md:mt-8 md:rounded-lg md:border md:p-3"
        >
          <div className="mx-auto flex max-w-2xl items-end gap-2">
            <label className="sr-only" htmlFor="reply">Reply</label>
            <textarea
              id="reply"
              ref={ta}
              rows={1}
              value={text}
              placeholder={placeholder}
              onChange={(e) => {
                setText(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
              }}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(); }}
              className="min-h-11 flex-1 resize-none rounded-md border border-input bg-background px-3 py-2.5 text-sm leading-normal placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-40"
            >
              <Send className="size-4" /> Reply
            </button>
          </div>
        </form>
        <div className="h-20 md:hidden" />
      </div>
    </AppShell>
  );
}

function CommentItem({ c, op }: { c: Comment; op: string }) {
  return (
    <li>
      <AuthorLine id={c.author} hoursAgo={c.hoursAgo} op={c.author === op} />
      <p className="mt-2 pl-[52px] text-base leading-relaxed">{c.body}</p>
      {c.replies && c.replies.length > 0 && (
        <ul className="ml-5 mt-4 space-y-5 border-l-2 pl-6">
          {c.replies.map((r) => <CommentItem key={r.id} c={r} op={op} />)}
        </ul>
      )}
    </li>
  );
}
