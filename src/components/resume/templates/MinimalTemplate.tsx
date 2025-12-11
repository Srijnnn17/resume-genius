import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experiences, education, skills } = data;

  return (
    <div className="resume-paper p-8 font-sans text-sm leading-relaxed bg-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-light text-slate-900 tracking-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <p className="text-slate-600 text-xs leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-slate-900 text-sm">{exp.position || 'Position'}</h3>
                  <span className="text-xs text-slate-400">
                    {exp.startDate || 'Start'} – {exp.isCurrent ? 'Present' : exp.endDate || 'End'}
                  </span>
                </div>
                <p className="text-slate-500 text-xs">
                  {exp.company || 'Company'}
                  {exp.location && ` · ${exp.location}`}
                </p>
                {exp.description && (
                  <p className="text-slate-600 text-xs mt-1 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium text-slate-900 text-sm">
                    {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-slate-500 text-xs">
                    {edu.institution || 'Institution'}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </p>
                </div>
                <span className="text-xs text-slate-400">
                  {edu.startDate || 'Start'} – {edu.endDate || 'End'}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
