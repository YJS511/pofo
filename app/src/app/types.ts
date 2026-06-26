export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  website: string;
  emoji: string;
  iconImg: string;
  iconShape: 'rounded' | 'circle';
  links: Link[];
}

export interface Link {
  label: string;
  url: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  font: 'sans' | 'serif' | 'mono';
  cover: string;
  coverImg: string;
  solidColor: string;
  gradientCustom: string;
  accent: string;
  layout: 'notion' | 'sidebar' | 'minimal' | 'tab';
  wide: boolean;
  style: 'classic' | 'line' | 'bold' | 'mono';
  noCover: boolean;
}

export interface Experience {
  company: string;
  role: string;
  level: string;
  type: string;
  period: string;
  desc: string;
}

export interface Project {
  name: string;
  period: string;
  role: string;
  tech: string;
  desc: string;
  result: string;
  repo: string;
  demo: string;
  image: string;
  stars?: number;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface CustomSection {
  id: string;
  emoji: string;
  title: string;
  items: CustomItem[];
}

export interface CustomItem {
  title: string;
  sub: string;
  period: string;
  desc: string;
}

export interface Certification {
  name: string;
  status: 'acquired' | 'preparing' | 'planned';
  date: string;
}

export interface TargetCompany {
  company: string;
  position: string;
  motivation: string;
}

export interface PortfolioState {
  profile: Profile;
  target: TargetCompany;
  about: string;
  skills: string;
  tools: string[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  custom: CustomSection[];
  theme: Theme;
  sectionOrder: string[];
  hidden: string[];
  github: {
    user: string;
    repos: any[];
  };
}
