import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { AccentColor, accentColorMap } from '../AccentColorPicker';

interface TemplateProps {
  data: ResumeData;
  accentColor?: AccentColor;
}

export function MinimalTemplate({ data, accentColor = 'green' }: TemplateProps) {
  const { personalInfo, summary, experiences, projects, education, skills } = data;
  const accent = accentColorMap[accentColor];

  return (
    <div className="resume-paper p-6 text-[10px] leading-tight bg-white" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
      {/* Header */}
      <header className="mb-3">
        <h1 className="text-xl font-light tracking-tight" style={{ color: accent }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-3 mt-1.5 text-[9px] text-slate-500">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-2.5 w-2.5" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-2.5 w-2.5" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-2.5 w-2.5" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-2.5 w-2.5" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-3">
          <h2 className="text-[9px] font-semibold uppercase tracking-wider mb-1" style={{ color: accent }}>
            Professional Summary
          </h2>
          <p className="text-slate-600 leading-snug">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[9px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: accent }}>
            Professional Experience
          </h2>
          <div className="space-y-2">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <h3 className="font-semibold text-slate-900">{exp.position || 'Position'}</h3>
                <div className="flex justify-between text-[9px] text-slate-500">
                  <span>{exp.company || 'Company'}{exp.location && ` · ${exp.location}`}</span>
                  <span>{exp.startDate || 'Start'} – {exp.isCurrent ? 'Present' : exp.endDate || 'End'}</span>
                </div>
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
          <h2 className="text-[9px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: accent }}>
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
          <h2 className="text-[9px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: accent }}>
            Education
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold text-slate-900">
                  {edu.degree || 'Degree'}{edu.field && ` in ${edu.field}`}
                </h3>
                <div className="flex justify-between text-[9px] text-slate-500">
                  <span>{edu.institution || 'Institution'}{edu.gpa && ` · GPA: ${edu.gpa}`}</span>
                  <span>{edu.endDate || 'End'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-[9px] font-semibold uppercase tracking-wider mb-1" style={{ color: accent }}>
            Core Skills
          </h2>
          <p className="text-slate-600">· {skills.join(' · ')}</p>
        </section>
      )}
    </div>
  );
}
