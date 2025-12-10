import { useState, useCallback } from 'react';
import { ResumeData, PersonalInfo, Experience, Education } from '@/types/resume';
import { v4 as uuidv4 } from 'uuid';

const initialPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  website: '',
};

const initialResume: ResumeData = {
  personalInfo: initialPersonalInfo,
  summary: '',
  experiences: [],
  education: [],
  skills: [],
};

export function useResume() {
  const [resume, setResume] = useState<ResumeData>(initialResume);

  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  }, []);

  const updateSummary = useCallback((summary: string) => {
    setResume(prev => ({ ...prev, summary }));
  }, []);

  const addExperience = useCallback(() => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
    };
    setResume(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));
    return newExperience.id;
  }, []);

  const updateExperience = useCallback((id: string, data: Partial<Experience>) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, ...data } : exp
      ),
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id),
    }));
  }, []);

  const addEducation = useCallback(() => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    setResume(prev => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
    return newEducation.id;
  }, []);

  const updateEducation = useCallback((id: string, data: Partial<Education>) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, ...data } : edu
      ),
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  }, []);

  const updateSkills = useCallback((skills: string[]) => {
    setResume(prev => ({ ...prev, skills }));
  }, []);

  const addSkill = useCallback((skill: string) => {
    if (skill.trim() && !resume.skills.includes(skill.trim())) {
      setResume(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  }, [resume.skills]);

  const removeSkill = useCallback((skill: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  }, []);

  return {
    resume,
    setResume,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    addSkill,
    removeSkill,
  };
}
