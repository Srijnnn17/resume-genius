import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { AccentColor, accentColorMap } from '../AccentColorPicker';

interface TemplateProps {
  data: ResumeData;
  accentColor?: AccentColor;
}

export function ModernTemplate({ data, accentColor = 'green' }: TemplateProps) {
  const { personalInfo, summary, experiences, projects, education, skills } = data;
  const accent = accentColorMap[accentColor];

  return (
    <div className="resume-paper text-[10px] leading-tight bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header with accent background */}
      <header className="p-5 text-white" style={{ backgroundColor: accent }}>
        <h1 className="text-xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-3 mt-1.5 text-[9px] opacity-90">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      <div className="p-5">
        {/* Summary */}
        {summary && (
          <section className="mb-3">
            <p className="text-slate-700 leading-snug">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-3">
            <h2 className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: accent }}>
              Experience
            </h2>
            <div className="space-y-2">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900">{exp.position || 'Position'}</h3>
                    <span className="text-[9px] text-slate-500">
                      {exp.startDate || 'Start'} – {exp.isCurrent ? 'Present' : exp.endDate || 'End'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[9px]">{exp.company || 'Company'}</p>
                  {exp.description && (
                    <p className="text-slate-600 mt-0.5 whitespace-pre-line leading-snug">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-3">
            <h2 className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: accent }}>
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-slate-900">{proj.name || 'Project Name'}</h3>
                  {proj.description && (
                    <p className="text-slate-600 mt-0.5 whitespace-pre-line leading-snug">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-3">
            <h2 className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: accent }}>
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900">
                      {edu.degree || 'Degree'}{edu.field && ` in ${edu.field}`}
                    </h3>
                    <span className="text-[9px] text-slate-500">{edu.endDate || 'End'}</span>
                  </div>
                  <p className="text-slate-600 text-[9px]">
                    {edu.institution || 'Institution'}{edu.gpa && ` · GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>
              Skills
            </h2>
            <p className="text-slate-700">{skills.join(' · ')}</p>
          </section>
        )}
      </div>
    </div>
  );
}
