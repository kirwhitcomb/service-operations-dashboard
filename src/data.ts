
export type RecordType =
  | "Escalation"
  | "Cancellation"
  | "Pause"
  | "Support Request"
  | "Billing Request";

export type ContactChannel = "Call" | "Email" | "Chat" | "Meeting";

export type RecordStatus = "Open" | "In Progress" | "Resolved";

export type ServiceRecord = {
  id: string;
  date: string;
  client: string;
  type: RecordType;
  category: string;
  channel: ContactChannel;
  status: RecordStatus;
};

export type Survey = {
  date: string;
  score: number;
};

// Fictional data for the dashboard.
export const records: ServiceRecord[] = [
  {
    id: "R001",
    date: "2026-06-04",
    client: "Client A",
    type: "Escalation",
    category: "Communication",
    channel: "Call",
    status: "Resolved",
  },
  {
    id: "R002",
    date: "2026-08-07",
    client: "Client B",
    type: "Cancellation",
    category: "Budget",
    channel: "Email",
    status: "Resolved",
  },
  {
    id: "R003",
    date: "2026-08-11",
    client: "Client C",
    type: "Support Request",
    category: "Reporting Question",
    channel: "Email",
    status: "Resolved",
  },
  {
    id: "R004",
    date: "2026-08-15",
    client: "Client D",
    type: "Billing Request",
    category: "Invoice Question",
    channel: "Call",
    status: "Resolved",
  },
  {
    id: "R005",
    date: "2026-08-20",
    client: "Client E",
    type: "Pause",
    category: "Seasonal Break",
    channel: "Email",
    status: "Resolved",
  },
  {
    id: "R006",
    date: "2026-08-25",
    client: "Client F",
    type: "Cancellation",
    category: "Service Fit",
    channel: "Call",
    status: "Resolved",
  },
  {
    id: "R007",
    date: "2026-07-03",
    client: "Client G",
    type: "Escalation",
    category: "Performance",
    channel: "Call",
    status: "In Progress",
  },
  {
    id: "R008",
    date: "2026-09-07",
    client: "Client H",
    type: "Cancellation",
    category: "Provider Change",
    channel: "Email",
    status: "Resolved",
  },
  {
    id: "R009",
    date: "2026-09-11",
    client: "Client I",
    type: "Support Request",
    category: "Account Setup",
    channel: "Chat",
    status: "Resolved",
  },
  {
    id: "R010",
    date: "2026-09-15",
    client: "Client J",
    type: "Billing Request",
    category: "Invoice Question",
    channel: "Email",
    status: "Resolved",
  },
  {
    id: "R011",
    date: "2026-09-19",
    client: "Client A",
    type: "Pause",
    category: "Budget",
    channel: "Call",
    status: "Resolved",
  },
  {
    id: "R012",
    date: "2026-09-24",
    client: "Client B",
    type: "Escalation",
    category: "Management",
    channel: "Meeting",
    status: "Open",
  },
  {
    id: "R013",
    date: "2026-08-03",
    client: "Client C",
    type: "Escalation",
    category: "Communication",
    channel: "Email",
    status: "Open",
  },
  {
    id: "R014",
    date: "2026-10-06",
    client: "Client D",
    type: "Cancellation",
    category: "Budget",
    channel: "Call",
    status: "In Progress",
  },
  {
    id: "R015",
    date: "2026-10-10",
    client: "Client E",
    type: "Cancellation",
    category: "Contract Change",
    channel: "Email",
    status: "Resolved",
  },
  {
    id: "R016",
    date: "2026-10-14",
    client: "Client F",
    type: "Support Request",
    category: "Reporting Question",
    channel: "Chat",
    status: "Resolved",
  },
  {
    id: "R017",
    date: "2026-10-19",
    client: "Client G",
    type: "Escalation",
    category: "Billing / Spend",
    channel: "Call",
    status: "In Progress",
  },
  {
    id: "R018",
    date: "2026-10-24",
    client: "Client H",
    type: "Pause",
    category: "Temporary Hold",
    channel: "Email",
    status: "Open",
  },
];

export const surveys: Survey[] = [
  { date: "2026-08-08", score: 10 },
  { date: "2026-08-14", score: 8 },
  { date: "2026-08-22", score: 6 },
  { date: "2026-09-04", score: 9 },
  { date: "2026-09-13", score: 10 },
  { date: "2026-09-26", score: 7 },
  { date: "2026-10-05", score: 10 },
  { date: "2026-10-12", score: 9 },
  { date: "2026-10-18", score: 6 },
  { date: "2026-10-25", score: 8 },
];
