export type Tone = "blue" | "purple" | "yellow";

export type CollectionName =
  | "services"
  | "trainings"
  | "projects"
  | "resources"
  | "team"
  | "partners";

type Base = {
  id: string;
  published: boolean;
  order: number;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type Service = Base & {
  slug: string;
  no: string;
  title: string;
  tag: string;
  text: string;
  intro: string;
  promise: string;
  points: string[];
  audience: string;
  result: string;
  isTraining: boolean;
  image?: string;
};

export type Training = Base & {
  slug: string;
  no: string;
  title: string;
  summary: string;
  intro: string;
  duration: string;
  format: string;
  date: string;
  audience: string;
  goals: string[];
  tone: Tone;
  image?: string;
};

export type Project = Base & {
  slug: string;
  sector: string;
  title: string;
  text: string;
  tags: string[];
  tone: Tone;
  client?: string;
  challenge?: string;
  approach?: string;
  results?: string;
  image?: string;
};

export type Resource = Base & {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  content?: string;
  accent: Tone;
  publishedAt?: string;
  image?: string;
};

export type TeamMember = Base & {
  name: string;
  role: string;
  detail: string;
  photo?: string;
};

export type Partner = Base & {
  name: string;
  logo?: string;
  url?: string;
  category?: string;
};

export type Collections = {
  services: Service;
  trainings: Training;
  projects: Project;
  resources: Resource;
  team: TeamMember;
  partners: Partner;
};

export type MessageStatus = "new" | "read" | "done";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  source: string;
  status: MessageStatus;
  createdAt?: { toDate: () => Date } | null;
};

export type StaffRole = "admin" | "editor";
