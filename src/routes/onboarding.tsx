import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BareShell, Checkbox, Form, SelectField, TextField } from "@/components/aza/kit";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/onboarding")({
  head: () => meta("Set up your profile", "Tell us what you're looking for so we can match opportunities."),
  component: Onboarding,
});

function Onboarding() {
  const nav = useNavigate();
  return (
    <BareShell narrow>
      <p className="text-sm font-bold uppercase tracking-wide text-primary-strong">Step 1 of 1</p>
      <h1 className="mb-6 mt-1 text-3xl">What are you looking for?</h1>
      <Form onSubmit={async (d) => { await api.completeOnboarding(d); nav({ to: "/welcome" }); }} submitLabel="Continue" success="Profile set up">
        <TextField label="Location" name="location" required placeholder="e.g. Lagos" />
        <SelectField label="I am a" name="role" options={["Student", "Graduate", "Founder", "Freelancer"]} />
        <Checkbox label="Grants & funding" name="grants" defaultChecked />
        <Checkbox label="Scholarships" name="scholarships" />
        <Checkbox label="Internships & jobs" name="jobs" />
        <Checkbox label="Co-founders & teams" name="teams" />
      </Form>
    </BareShell>
  );
}
