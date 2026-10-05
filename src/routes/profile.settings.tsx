import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/aza/app-shell";
import { BackLink, btn, Checkbox, Form, SelectField } from "@/components/aza/kit";
import { PageHeader } from "@/components/aza/ui";
import { api } from "@/lib/aza/api";
import { meta } from "@/lib/aza/meta";

export const Route = createFileRoute("/profile/settings")({
  head: () => meta("Settings", "Notifications, language, sign out and account."),
  component: Settings,
});

function Settings() {
  const nav = useNavigate();
  return (
    <AppShell>
      <BackLink to="/profile" label="Profile" />
      <PageHeader title="Settings" />
      <Form onSubmit={api.updateSettings} submitLabel="Save settings">
        <Checkbox label="Email me when a saved opportunity is closing" name="deadlineEmails" defaultChecked />
        <Checkbox label="Notify me about replies to my ideas" name="replyAlerts" defaultChecked />
        <Checkbox label="Weekly opportunities digest" name="digest" />
        <SelectField label="Currency" name="currency" options={["NGN", "GHS", "KES", "USD"]} />
      </Form>
      <div className="mt-10 flex max-w-2xl flex-wrap gap-2 border-t pt-6">
        <button className={btn.secondary} onClick={async () => { await api.signOut(); nav({ to: "/login" }); }}>Sign out</button>
        <button className={btn.danger} onClick={async () => { if (confirm("Delete your account? This can't be undone.")) { await api.deleteAccount(); toast.success("Account deleted"); nav({ to: "/" }); } }}>Delete account</button>
      </div>
    </AppShell>
  );
}
