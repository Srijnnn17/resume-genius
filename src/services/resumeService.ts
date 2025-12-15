import { supabase } from '@/integrations/supabase/client';
import { ResumeData, PersonalInfo, Experience, Education, Project } from '@/types/resume';
import { Json } from '@/integrations/supabase/types';

export interface SavedResume {
  id: string;
  personal_info: PersonalInfo;
  summary: string;
  skills: string[];
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  created_at: string;
  updated_at: string;
}

function parsePersonalInfo(json: Json | null): PersonalInfo {
  const defaultInfo: PersonalInfo = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  };
  
  if (!json || typeof json !== 'object' || Array.isArray(json)) {
    return defaultInfo;
  }
  
  const obj = json as Record<string, unknown>;
  return {
    fullName: String(obj.fullName || ''),
    email: String(obj.email || ''),
    phone: String(obj.phone || ''),
    location: String(obj.location || ''),
    linkedin: String(obj.linkedin || ''),
    website: String(obj.website || ''),
  };
}

export async function fetchUserResumes(userId: string): Promise<SavedResume[]> {
  const { data: resumes, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  if (!resumes) return [];

  // Fetch experiences, projects, and education for each resume
  const resumesWithDetails = await Promise.all(
    resumes.map(async (resume) => {
      const [expResult, projResult, eduResult] = await Promise.all([
        supabase.from('experiences').select('*').eq('resume_id', resume.id),
        supabase.from('projects').select('*').eq('resume_id', resume.id),
        supabase.from('education').select('*').eq('resume_id', resume.id),
      ]);

      return {
        id: resume.id,
        personal_info: parsePersonalInfo(resume.personal_info),
        summary: resume.summary || '',
        skills: resume.skills || [],
        experiences: (expResult.data || []).map((exp) => ({
          id: exp.id,
          company: exp.company,
          position: exp.position,
          location: exp.location || '',
          startDate: exp.start_date || '',
          endDate: exp.end_date || '',
          isCurrent: exp.is_current || false,
          description: exp.description || '',
        })),
        projects: (projResult.data || []).map((proj) => ({
          id: proj.id,
          name: proj.name,
          techStack: proj.tech_stack || '',
          description: proj.description || '',
          date: proj.date || '',
        })),
        education: (eduResult.data || []).map((edu) => ({
          id: edu.id,
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field || '',
          startDate: edu.start_date || '',
          endDate: edu.end_date || '',
          gpa: edu.gpa || '',
        })),
        created_at: resume.created_at,
        updated_at: resume.updated_at,
      };
    })
  );

  return resumesWithDetails;
}

function personalInfoToJson(info: PersonalInfo): Json {
  return {
    fullName: info.fullName,
    email: info.email,
    phone: info.phone,
    location: info.location,
    linkedin: info.linkedin || '',
    website: info.website || '',
  };
}

export async function saveResume(
  userId: string,
  resumeData: ResumeData,
  resumeId?: string
): Promise<string> {
  // If resumeId exists, update; otherwise create new
  if (resumeId) {
    // Update existing resume
    const { error: updateError } = await supabase
      .from('resumes')
      .update({
        personal_info: personalInfoToJson(resumeData.personalInfo),
        summary: resumeData.summary,
        skills: resumeData.skills,
        updated_at: new Date().toISOString(),
      })
      .eq('id', resumeId)
      .eq('user_id', userId);

    if (updateError) throw updateError;

    // Delete existing experiences, projects, and education, then re-insert
    await supabase.from('experiences').delete().eq('resume_id', resumeId);
    await supabase.from('projects').delete().eq('resume_id', resumeId);
    await supabase.from('education').delete().eq('resume_id', resumeId);

    // Insert experiences
    if (resumeData.experiences.length > 0) {
      const { error: expError } = await supabase.from('experiences').insert(
        resumeData.experiences.map((exp) => ({
          resume_id: resumeId,
          company: exp.company,
          position: exp.position,
          location: exp.location,
          start_date: exp.startDate,
          end_date: exp.endDate,
          is_current: exp.isCurrent,
          description: exp.description,
        }))
      );
      if (expError) throw expError;
    }

    // Insert projects
    if (resumeData.projects.length > 0) {
      const { error: projError } = await supabase.from('projects').insert(
        resumeData.projects.map((proj) => ({
          resume_id: resumeId,
          name: proj.name,
          tech_stack: proj.techStack,
          description: proj.description,
          date: proj.date,
        }))
      );
      if (projError) throw projError;
    }

    // Insert education
    if (resumeData.education.length > 0) {
      const { error: eduError } = await supabase.from('education').insert(
        resumeData.education.map((edu) => ({
          resume_id: resumeId,
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field,
          start_date: edu.startDate,
          end_date: edu.endDate,
          gpa: edu.gpa,
        }))
      );
      if (eduError) throw eduError;
    }

    return resumeId;
  } else {
    // Create new resume
    const { data: newResume, error: createError } = await supabase
      .from('resumes')
      .insert([{
        user_id: userId,
        personal_info: personalInfoToJson(resumeData.personalInfo),
        summary: resumeData.summary,
        skills: resumeData.skills,
      }])
      .select()
      .single();

    if (createError) throw createError;

    const newResumeId = newResume.id;

    // Insert experiences
    if (resumeData.experiences.length > 0) {
      const { error: expError } = await supabase.from('experiences').insert(
        resumeData.experiences.map((exp) => ({
          resume_id: newResumeId,
          company: exp.company,
          position: exp.position,
          location: exp.location,
          start_date: exp.startDate,
          end_date: exp.endDate,
          is_current: exp.isCurrent,
          description: exp.description,
        }))
      );
      if (expError) throw expError;
    }

    // Insert projects
    if (resumeData.projects.length > 0) {
      const { error: projError } = await supabase.from('projects').insert(
        resumeData.projects.map((proj) => ({
          resume_id: newResumeId,
          name: proj.name,
          tech_stack: proj.techStack,
          description: proj.description,
          date: proj.date,
        }))
      );
      if (projError) throw projError;
    }

    // Insert education
    if (resumeData.education.length > 0) {
      const { error: eduError } = await supabase.from('education').insert(
        resumeData.education.map((edu) => ({
          resume_id: newResumeId,
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field,
          start_date: edu.startDate,
          end_date: edu.endDate,
          gpa: edu.gpa,
        }))
      );
      if (eduError) throw eduError;
    }

    return newResumeId;
  }
}

export async function loadResume(resumeId: string, userId: string): Promise<ResumeData | null> {
  const { data: resume, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', resumeId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  if (!resume) return null;

  const [expResult, projResult, eduResult] = await Promise.all([
    supabase.from('experiences').select('*').eq('resume_id', resumeId),
    supabase.from('projects').select('*').eq('resume_id', resumeId),
    supabase.from('education').select('*').eq('resume_id', resumeId),
  ]);

  return {
    personalInfo: parsePersonalInfo(resume.personal_info),
    summary: resume.summary || '',
    skills: resume.skills || [],
    experiences: (expResult.data || []).map((exp) => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      location: exp.location || '',
      startDate: exp.start_date || '',
      endDate: exp.end_date || '',
      isCurrent: exp.is_current || false,
      description: exp.description || '',
    })),
    projects: (projResult.data || []).map((proj) => ({
      id: proj.id,
      name: proj.name,
      techStack: proj.tech_stack || '',
      description: proj.description || '',
      date: proj.date || '',
    })),
    education: (eduResult.data || []).map((edu) => ({
      id: edu.id,
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field || '',
      startDate: edu.start_date || '',
      endDate: edu.end_date || '',
      gpa: edu.gpa || '',
    })),
  };
}

export async function deleteResume(resumeId: string, userId: string): Promise<void> {
  // Delete experiences, projects, and education first (cascade should handle this, but being safe)
  await supabase.from('experiences').delete().eq('resume_id', resumeId);
  await supabase.from('projects').delete().eq('resume_id', resumeId);
  await supabase.from('education').delete().eq('resume_id', resumeId);
  
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', resumeId)
    .eq('user_id', userId);

  if (error) throw error;
}
