import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BareShell, Form, TextField } from "@/components/aza/kit";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/login")({
  head: () => meta("Log in", "Log in to Aza."),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  return (
    <BareShell narrow>
      <h1 className="mb-6 text-3xl">Welcome back</h1>
      <Form onSubmit={async (d) => { await api.signIn(d); nav({ to: "/" }); }} submitLabel="Log in" success="Logged in">
        <TextField label="Email" name="email" type="email" required />
        <TextField label="Password" name="password" type="password" required />
      </Form>
      <p className="mt-6 text-sm">New here? <Link to="/signup" className="font-bold text-primary-strong">Create an account</Link></p>
    </BareShell>
  );
}
