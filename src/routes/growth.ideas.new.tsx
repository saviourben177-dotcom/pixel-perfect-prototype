import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { PageHeader } from "@/components/aza/ui";
import { BackLink, Form, SelectField, TextArea, TextField } from "@/components/aza/kit";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/growth/ideas/new")({
  head: () => meta("Share an idea", "Post what you're building and what you need from the community."),
  component: NewIdea,
});

function NewIdea() {
  return (
    <AppShell>
      <BackLink to="/growth/ideas" label="Ideas" />
      <PageHeader title="Share an idea" sub="Be specific about what you need" />
      <Form onSubmit={api.createIdea} submitLabel="Post idea" success="Idea posted" cancelTo="/growth/ideas">
        <TextField label="Title" name="title" required />
        <SelectField label="The Ask" name="ask" options={["Seeking Co-Founder", "Feedback Wanted", "Looking for Beta Testers", "Distribution Advice"]} />
        <SelectField label="Stage" name="stage" options={["Idea", "Validating", "Building", "Launched"]} />
        <TextArea label="Pitch" name="pitch" rows={6} required />
      </Form>
    </AppShell>
  );
}
