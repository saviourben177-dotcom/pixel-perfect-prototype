// Sample data for the preview. Replace with real queries when wired to a backend.
export type Person = { id: string; name: string; role?: string; location?: string; initials: string };

export const people: Record<string, Person> = {
  ada: { id: "ada", name: "Adaeze Okafor", role: "Agritech founder", location: "Enugu", initials: "AO" },
  tunde: { id: "tunde", name: "Tunde Bakare", role: "Backend engineer", location: "Lagos", initials: "TB" },
  zainab: { id: "zainab", name: "Zainab Musa", role: "Product designer", location: "Kano", initials: "ZM" },
  kofi: { id: "kofi", name: "Kofi Mensah", role: "Logistics ops", location: "Accra", initials: "KM" },
  ife: { id: "ife", name: "Ifeoluwa Adeyemi", role: "Student, UNILAG", location: "Lagos", initials: "IA" },
};

export const me = people.ife;

export type Ask = "Seeking Co-Founder" | "Feedback Wanted" | "Looking for Beta Testers" | "Distribution Advice";

export type Comment = { id: string; author: string; body: string; hoursAgo: number; replies?: Comment[] };

export type Idea = {
  id: string;
  author: string;
  hoursAgo: number;
  ask: Ask;
  stage: string;
  pitch: string;
  upvotes: number;
  comments: Comment[];
};

export const ideas: Idea[] = [
  {
    id: "cold-chain",
    author: "ada",
    hoursAgo: 2,
    ask: "Seeking Co-Founder",
    stage: "Validating",
    pitch:
      "Tomato farmers around Enugu lose almost half their harvest before it reaches a market. I'm piloting solar-powered cold rooms that farmers rent by the crate, paid per day through USSD. Three cooperatives have signed letters of intent. I need a technical co-founder who can own the payments and booking side while I handle farmer relationships and the hardware.",
    upvotes: 48,
    comments: [
      {
        id: "c1",
        author: "kofi",
        hoursAgo: 1,
        body: "We tried crate-based pricing in Kumasi. Farmers preferred paying per kg because crates vary a lot in size. Worth testing both early.",
        replies: [
          { id: "c1r1", author: "ada", hoursAgo: 1, body: "That's really useful, thank you. Did weighing at the door slow things down much?" },
          { id: "c1r2", author: "kofi", hoursAgo: 0.5, body: "A little at first. A cheap hanging scale fixed most of it." },
        ],
      },
      { id: "c2", author: "tunde", hoursAgo: 0.3, body: "I've built USSD flows with Africa's Talking before. Happy to jump on a call this week." },
    ],
  },
  {
    id: "exam-prep",
    author: "ife",
    hoursAgo: 5,
    ask: "Looking for Beta Testers",
    stage: "Building",
    pitch:
      "A WhatsApp study buddy for JAMB candidates: daily past questions, explanations in plain English or Pidgin, and a weekly mock score you can share with your parents. First 200 students get it free while I tune the questions.",
    upvotes: 31,
    comments: [],
  },
  {
    id: "tailor-booking",
    author: "zainab",
    hoursAgo: 26,
    ask: "Feedback Wanted",
    stage: "Idea",
    pitch:
      "Tailors in Kano lose customers because measurements live on paper and fittings get double-booked. A simple booking page plus a saved measurement card per customer. Is this a real pain, or do tailors prefer things the way they are?",
    upvotes: 19,
    comments: [
      { id: "c3", author: "ada", hoursAgo: 20, body: "My aunt runs a shop. Double bookings during Sallah season are a nightmare, so yes, it's real." },
    ],
  },
  {
    id: "fuel-share",
    author: "kofi",
    hoursAgo: 50,
    ask: "Distribution Advice",
    stage: "Launched",
    pitch:
      "Small shops can now split a generator diesel delivery with neighbours on the same street. It's live on 4 streets in Accra. How do I reach market associations without paying a fortune for agents?",
    upvotes: 57,
    comments: [],
  },
];

export type Opportunity = {
  id: string;
  title: string;
  org: string;
  orgMark: string;
  verified: boolean;
  category: string;
  location: string;
  daysLeft: number;
  amount?: string;
};

export const opportunities: Opportunity[] = [
  { id: "o1", title: "Tony Elumelu Entrepreneurship Programme 2027", org: "TEF", orgMark: "TE", verified: true, category: "Grant", location: "Pan-African", daysLeft: 3, amount: "$5,000" },
  { id: "o2", title: "MTN Foundation Science & Tech Scholarship", org: "MTN Foundation", orgMark: "MT", verified: true, category: "Scholarship", location: "Nigeria", daysLeft: 6, amount: "₦200,000/yr" },
  { id: "o3", title: "Google Africa Developer Scholarship", org: "Google", orgMark: "G", verified: true, category: "Fellowship", location: "Remote", daysLeft: 18 },
  { id: "o4", title: "Lagos Climate Hackathon", org: "LSETF", orgMark: "LS", verified: false, category: "Hackathon", location: "Lagos", daysLeft: 9, amount: "₦5m prize pool" },
  { id: "o5", title: "Product Design Internship", org: "Paystack", orgMark: "PS", verified: true, category: "Internship", location: "Lagos · Hybrid", daysLeft: 24 },
  { id: "o6", title: "Youth Agripreneur Challenge", org: "AfDB", orgMark: "AD", verified: false, category: "Competition", location: "Pan-African", daysLeft: 41, amount: "$10,000" },
];

export function timeAgo(h: number) {
  if (h < 1) return `${Math.max(1, Math.round(h * 60))}m ago`;
  if (h < 24) return `${Math.round(h)}h ago`;
  return `${Math.round(h / 24)}d ago`;
}
