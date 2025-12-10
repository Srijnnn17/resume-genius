export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
}

export interface ATSResult {
  score: number;
  missingKeywords: string[];
  suggestions: string[];
}
