export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — Aza` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Aza` },
    { property: "og:description", content: description },
  ],
});
