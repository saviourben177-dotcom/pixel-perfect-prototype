import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, Form, SelectField, TextArea, TextField } from "@/components/aza/kit";
import { PageHeader } from "@/components/aza/ui";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/business/marketplace/new")({
  head: () => meta("Post a listing", "Sell, buy, offer a service or find a collaborator."),
  component: () => (
    <AppShell>
      <BackLink to="/business/marketplace" label="Marketplace" />
      <PageHeader title="Post a listing" />
      <Form onSubmit={api.createListing} submitLabel="Post listing" success="Listing posted" cancelTo="/business/marketplace">
        <SelectField label="Type" name="type" options={["Sell", "Buy", "Service", "Collaborate"]} />
        <TextField label="Title" name="title" required />
        <TextField label="Price" name="price" hint="Optional" placeholder="₦" />
        <TextField label="Location" name="location" required />
        <TextArea label="Details" name="body" required />
      </Form>
    </AppShell>
  ),
});
