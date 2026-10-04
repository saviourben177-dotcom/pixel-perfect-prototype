import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, Form, SelectField, TextArea, TextField } from "@/components/aza/kit";
import { PageHeader } from "@/components/aza/ui";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/business/plan")({
  head: () => meta("Business plan generator", "Answer a few questions and get a draft business plan."),
  component: () => (
    <AppShell>
      <BackLink to="/business" label="Business" />
      <PageHeader title="Business plan" sub="Answer five questions, get a draft you can edit" />
      <Form onSubmit={api.generateBusinessPlan} submitLabel="Generate plan" success="Draft plan ready">
        <TextField label="Business name" name="name" required />
        <SelectField label="Industry" name="industry" options={["Agriculture", "Food", "Retail", "Tech", "Energy", "Services"]} />
        <TextArea label="What problem do you solve?" name="problem" required />
        <TextArea label="Who are your customers?" name="customers" rows={3} />
        <TextField label="Startup budget" name="budget" placeholder="₦" />
      </Form>
    </AppShell>
  ),
});
