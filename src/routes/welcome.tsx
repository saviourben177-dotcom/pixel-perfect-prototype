import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { BareShell, btn } from "@/components/aza/kit";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/welcome")({
  head: () => meta("Welcome", "You're all set on Aza."),
  component: () => (
    <BareShell narrow>
      <div className="pt-10 text-center">
        <span className="emboss-primary mx-auto grid size-16 place-items-center rounded-full border"><Sparkles className="size-7" /></span>
        <h1 className="mt-6 text-3xl">You're in</h1>
        <p className="mt-2 text-muted-foreground">We found 3 opportunities that match your profile.</p>
        <Link to="/" className={`${btn.primary} mt-8`}>See my matches</Link>
      </div>
    </BareShell>
  ),
});
