// UI ↔ backend seam. Every screen calls these functions instead of a backend directly.
// To hook up the real app, replace each body with your Supabase query / server action.
// Signatures use the real app's types from ./types so the swap is drop-in.
type Payload = Record<string, FormDataEntryValue>;
const wait = <T,>(v: T) => new Promise<T>((r) => setTimeout(() => r(v), 400));

export const api = {
  // auth
  signIn: (d: Payload) => wait(d),
  signUp: (d: Payload) => wait(d),
  signOut: () => wait(true),
  completeOnboarding: (d: Payload) => wait(d),
  deleteAccount: () => wait(true),
  // profile & CV
  updateProfile: (d: Payload) => wait(d),
  updateCv: (d: Payload) => wait(d),
  tailorCv: (opportunityId: string) => wait({ opportunityId, summary: "Tailored summary ready" }),
  updateSettings: (d: Payload) => wait(d),
  // opportunities
  saveOpportunity: (id: string, saved: boolean) => wait({ id, saved }),
  setApplicationStatus: (id: string, status: string) => wait({ id, status }),
  // growth
  createIdea: (d: Payload) => wait(d),
  deleteIdea: (id: string) => wait(id),
  setIdeaStage: (id: string, stage: string) => wait({ id, stage }),
  addComment: (ideaId: string, body: string) => wait({ ideaId, body }),
  deleteComment: (id: string) => wait(id),
  addSkill: (skillId: string) => wait(skillId),
  updateSkillProgress: (skillId: string, percent: number) => wait({ skillId, percent }),
  askAssistant: (q: string) => wait(`Here's a starting point for "${q}": pick one free course this week, then share what you built in Ideas.`),
  // business
  createBusiness: (d: Payload) => wait(d),
  rateBusiness: (id: string, stars: number, comment: string) => wait({ id, stars, comment }),
  createListing: (d: Payload) => wait(d),
  deleteListing: (id: string) => wait(id),
  generateBusinessPlan: (d: Payload) => wait(d),
  // team finder
  sendJoinRequest: (ideaId: string, d: Payload) => wait({ ideaId, ...d }),
  respondToRequest: (id: string, status: "accepted" | "declined") => wait({ id, status }),
  sendMessage: (requestId: string, body: string) => wait({ requestId, body }),
  // notifications
  markAllRead: () => wait(true),
  // curator / admin
  saveOpportunityAdmin: (d: Payload) => wait(d),
  saveCuratorItem: (kind: string, d: Payload) => wait({ kind, ...d }),
  moderate: (kind: string, id: string, action: "approve" | "reject" | "remove") => wait({ kind, id, action }),
};
