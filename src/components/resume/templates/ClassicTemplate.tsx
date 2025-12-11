import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experiences, education, skills } = data;

  return (
    <div className="resume-paper p-8 font-serif text-sm leading-relaxed bg-white" style={{ fontFamily: 'Georgia, Times, serif' }}>
      {/* Header */}
      <header className="text-center border-b-2 border-slate-800 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-wide uppercase">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-slate-600">
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
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-1 text-xs text-slate-600">
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
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-slate-700 text-xs leading-relaxed italic">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">{exp.position || 'Position'}</h3>
                    <p className="text-slate-600 text-xs italic">
                      {exp.company || 'Company'}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {exp.startDate || 'Start'} – {exp.isCurrent ? 'Present' : exp.endDate || 'End'}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-slate-700 text-xs mt-1 whitespace-pre-line">
                    • {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">
                    {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-slate-600 text-xs italic">
                    {edu.institution || 'Institution'}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
                <span className="text-xs text-slate-500 whitespace-nowrap">
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
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
            Skills & Expertise
          </h2>
          <p className="text-slate-700 text-xs">{skills.join(' • ')}</p>
        </section>
      )}
    </div>
  );
}
