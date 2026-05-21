import { ResumeData } from "./types";

export const defaultResume: ResumeData = {
  fullName: "Dr. Chih-Hua Wu",
  title: "Professor of Computer Science & Information Engineering",
  email: "wuchihua@stust.edu.tw",
  phone: "+886 6 253 3131",
  location: "Tainan, Taiwan",
  website: "https://csie.stust.edu.tw",
  summary: "Academic leader and software engineering researcher passionate about modern full-stack web systems, Cloud Architectures, and Artificial Intelligence. Over 15 years of experience bridging cutting-edge academic theories with robust industry software engineering solutions.",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  theme: "modern",
  skills: [
    "React & TypeScript",
    "Node.js & Express",
    "Machine Learning",
    "Cloud Native Computing (GCP/AWS)",
    "Distributed Systems",
    "Database Systems & Firestore",
    "Cybersecurity Invariants"
  ],
  experience: [
    {
      company: "Southern Taiwan University of Science and Technology",
      role: "Professor & Lead AI Researcher",
      period: "2018 - Present",
      description: "Directing the Intelligent Software Systems Laboratory. Teaching advanced curriculum in Web Engineering, Cloud Architecture, and Database Systems. Published top-tier research papers in distributed systems and predictive analytics."
    },
    {
      company: "Aether Systems & Technologies",
      role: "Chief Software Architect (Part-Time)",
      period: "2014 - 2018",
      description: "Designed multi-tenant real-time web applications with offline support. Led a team of 8 engineers in deploying and securing high-traffic Node.js backends on Google Cloud Platform."
    }
  ],
  education: [
    {
      school: "National Cheng Kung University",
      degree: "Ph.D. in Computer Science and Information Engineering",
      period: "2008 - 2013",
      description: "Doctoral research focused on distributed consensus algorithms, high-performance database sharding mechanisms, and load balancing for massive web platforms."
    },
    {
      school: "National Cheng Kung University",
      degree: "M.S. in Computer Science",
      period: "2006 - 2008",
      description: "Specialized in software design patterns, automated unit testing frameworks, and advanced operating systems."
    }
  ],
  projects: [
    {
      name: "Interactive Canvas Lab Sync",
      description: "A collaborative, real-time whiteboarding workspace used by STUST students to brainstorm algorithms and synchronise diagram states instantly.",
      link: "https://github.com",
      technologies: ["React", "TypeScript", "WebSockets", "Canvas API", "Tailwind CSS"]
    },
    {
      name: "Smart Campus Energy Analyzer",
      description: "An AI-powered dashboard collecting IoT data from campus buildings, displaying real-time power consumption anomaly detection charts.",
      link: "https://github.com",
      technologies: ["Node.js", "Python", "TensorFlow", "Recharts", "Google Cloud Storage"]
    }
  ],
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com"
    },
    {
      platform: "Google Scholar",
      url: "https://scholar.google.com"
    }
  ],
  ownerId: "default_owner",
  ownerEmail: "wuchihua@stust.edu.tw",
  isFeatured: true
};
