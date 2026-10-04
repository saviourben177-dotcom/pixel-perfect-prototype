import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, Form, SelectField, TextArea, TextField } from "@/components/aza/kit";
import { PageHeader } from "@/components/aza/ui";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/business/directory/new")({
  head: () => meta("List your business", "Add your business to the Aza directory so customers can find you."),
  component: () => (
    <AppShell>
      <BackLink to="/business/directory" label="Directory" />
      <PageHeader title="List your business" sub="Reviewed by a curator before it goes live" />
      <Form onSubmit={api.createBusiness} submitLabel="Submit for review" success="Submitted for review" cancelTo="/business/directory">
        <TextField label="Business name" name="name" required />
        <SelectField label="Category" name="category" options={["Food", "Fuel & energy", "Building materials", "Services", "Retail", "Tech"]} />
        <TextField label="Location" name="location" required placeholder="e.g. Yaba, Lagos" />
        <TextField label="Phone" name="phone" type="tel" />
        <TextArea label="Description" name="description" required />
      </Form>
    </AppShell>
  ),
});
