import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, Form, SelectField, TextArea, TextField } from "@/components/aza/kit";
import { PageHeader } from "@/components/aza/ui";
import { teamPosts } from "@/lib/aza-data";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/business/team-finder/$teamId/join")({
  head: () => meta("Request to join", "Tell the founder why you're a good fit."),
  component: Join,
});

function Join() {
  const { teamId } = Route.useParams();
  const t = teamPosts.find((x) => x.id === teamId);
  return (
    <AppShell>
      <BackLink to="/business/team-finder" label="Team Finder" />
      <PageHeader title="Request to join" sub={t?.name} />
      <Form onSubmit={(d) => api.sendJoinRequest(teamId, d)} submitLabel="Send request" success="Request sent" cancelTo="/business/team-finder">
        <SelectField label="Role" name="role" options={t?.roles ?? ["Any"]} />
        <TextArea label="Why you?" name="note" required />
        <TextField label="Portfolio or LinkedIn" name="link" type="url" />
      </Form>
    </AppShell>
  );
}
