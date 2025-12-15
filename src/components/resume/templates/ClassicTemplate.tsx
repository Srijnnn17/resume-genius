import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { AccentColor, accentColorMap } from '../AccentColorPicker';

interface TemplateProps {
  data: ResumeData;
  accentColor?: AccentColor;
}

export function ClassicTemplate({ data, accentColor = 'green' }: TemplateProps) {
  const { personalInfo, summary, experiences, projects, education, skills } = data;
  const accent = accentColorMap[accentColor];

  return (
    <div className="resume-paper p-6 text-[10px] leading-tight bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <header className="text-center pb-2 mb-3 border-b-2" style={{ borderColor: accent }}>
        <h1 className="text-2xl font-bold mb-1" style={{ color: accent }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-[9px] text-slate-600">
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-snug">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: accent }}>
            Professional Experience
          </h2>
          <div className="space-y-2 border-l-2 pl-2" style={{ borderColor: accent }}>
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-900">{exp.position || 'Position'}</h3>
                  <span className="text-[9px] text-slate-500">
                    {exp.startDate || 'Start'} – {exp.isCurrent ? 'Present' : exp.endDate || 'End'}
                  </span>
                </div>
                <p className="text-slate-600 text-[9px] font-medium">
                  {exp.company || 'Company'}{exp.location && ` · ${exp.location}`}
                </p>
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
          <h2 className="text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: accent }}>
            Projects
          </h2>
          <div className="space-y-2 border-l-2 pl-2" style={{ borderColor: accent }}>
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-900">{proj.name || 'Project Name'}</h3>
                  {proj.date && <span className="text-[9px] text-slate-500">{proj.date}</span>}
                </div>
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
          <h2 className="text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: accent }}>
            Education
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-slate-900">
                    {edu.degree || 'Degree'}{edu.field && ` in ${edu.field}`}
                  </p>
                  <p className="text-slate-600 text-[9px]">{edu.institution || 'Institution'}</p>
                  {edu.gpa && <p className="text-slate-500 text-[9px]">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-[9px] text-slate-500">{edu.endDate || ''}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>
            Core Skills
          </h2>
          <p className="text-slate-700">
            {skills.map((skill, i) => (
              <span key={i}>• {skill}{i < skills.length - 1 ? '  ' : ''}</span>
            ))}
          </p>
        </section>
      )}
    </div>
  );
}
