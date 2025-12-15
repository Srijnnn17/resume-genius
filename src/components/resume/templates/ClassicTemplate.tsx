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
    <div className="resume-paper p-6 text-[10px] leading-tight bg-white" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
      {/* Header */}
      <header className="border-b-2 pb-3 mb-3" style={{ borderColor: accent }}>
        <h1 className="text-xl font-bold" style={{ color: accent }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-3 mt-1.5 text-[9px] text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>
            Professional Summary
          </h2>
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
                <p className="text-slate-600 text-[9px]">
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
          <h2 className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: accent }}>
            Projects
          </h2>
          <div className="space-y-2">
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
          <h2 className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: accent }}>
            Education
          </h2>
          <table className="w-full text-[9px]">
            <tbody>
              {education.map((edu) => (
                <tr key={edu.id} className="border-b border-slate-100">
                  <td className="py-0.5 font-medium text-slate-900">
                    {edu.degree || 'Degree'}{edu.field && ` in ${edu.field}`}
                  </td>
                  <td className="py-0.5 text-slate-600">{edu.institution || 'Institution'}</td>
                  <td className="py-0.5 text-slate-500">{edu.endDate || 'End'}</td>
                  <td className="py-0.5 text-slate-500">{edu.gpa && `GPA: ${edu.gpa}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>
            Skills
          </h2>
          <p className="text-slate-700">{skills.join(', ')}</p>
        </section>
      )}
    </div>
  );
}
