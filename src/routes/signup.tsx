import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BareShell, Form, TextField } from "@/components/aza/kit";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/signup")({
  head: () => meta("Sign up", "Join Aza for grants, scholarships and founder tools."),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  return (
    <BareShell narrow>
      <h1 className="mb-6 text-3xl">Join Aza</h1>
      <Form onSubmit={async (d) => { await api.signUp(d); nav({ to: "/onboarding" }); }} submitLabel="Create account" success="Account created">
        <TextField label="Full name" name="name" required />
        <TextField label="Email" name="email" type="email" required />
        <TextField label="Password" name="password" type="password" required hint="At least 8 characters" />
      </Form>
      <p className="mt-6 text-sm">Have an account? <Link to="/login" className="font-bold text-primary-strong">Log in</Link></p>
      <p className="mt-2 text-xs text-muted-foreground">By joining you agree to our <Link to="/privacy" className="underline">privacy policy</Link>.</p>
    </BareShell>
  );
}
