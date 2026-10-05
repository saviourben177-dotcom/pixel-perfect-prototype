import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, Form, TextArea, TextField } from "@/components/aza/kit";
import { PageHeader } from "@/components/aza/ui";
import { me } from "@/lib/aza-data";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/profile/edit")({
  head: () => meta("Edit profile", "Update your name, role, location and bio."),
  component: () => (
    <AppShell>
      <BackLink to="/profile" label="Profile" />
      <PageHeader title="Edit profile" />
      <Form onSubmit={api.updateProfile} submitLabel="Save changes" cancelTo="/profile">
        <TextField label="Full name" name="name" required defaultValue={me.name} />
        <TextField label="Role" name="role" defaultValue={me.role} />
        <TextField label="Location" name="location" defaultValue={me.location} />
        <TextArea label="Bio" name="bio" />
      </Form>
    </AppShell>
  ),
});
