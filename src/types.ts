export interface SocialLink {
  platform: string;
  url: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  link: string;
  technologies: string[];
}

export interface ResumeData {
  id?: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  avatarUrl: string;
  theme: "minimal" | "modern" | "serif" | "dark";
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  socialLinks: SocialLink[];
  ownerId: string;
  ownerEmail: string;
  isFeatured: boolean;
}
