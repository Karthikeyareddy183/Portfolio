export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface Project {
  title: string;
  date: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number; // 1-100
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
