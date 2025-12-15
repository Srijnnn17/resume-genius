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
    <div className="resume-paper text-sm leading-relaxed bg-white" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
      {/* Header with colored background */}
      <header className="p-6 text-white" style={{ backgroundColor: accent }}>
        <h1 className="text-2xl font-bold tracking-tight text-center">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-white/90">
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
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-1 text-xs text-white/90">
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

      <div className="p-6">
        {/* Summary */}
        {summary && (
          <section className="mb-5">
            <h2 
              className="text-sm font-bold mb-2"
              style={{ color: accent }}
            >
              Professional Summary
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-5">
            <h2 
              className="text-sm font-bold mb-3"
              style={{ color: accent }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs">{exp.position || 'Position'}</h3>
                      <p className="text-xs" style={{ color: accent }}>
                        {exp.company || 'Company'}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      - {exp.isCurrent ? 'Present' : exp.endDate || 'End'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-slate-600 text-xs mt-1 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-5">
            <h2 
              className="text-sm font-bold mb-3"
              style={{ color: accent }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="relative pl-3 border-l-2" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 text-xs">{proj.name || 'Project Name'}</h3>
                    {proj.date && (
                      <span className="text-xs text-slate-400">{proj.date}</span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-slate-600 text-xs mt-1 whitespace-pre-line">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education and Skills side by side */}
        <div className="grid grid-cols-2 gap-6">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 
                className="text-sm font-bold mb-3"
                style={{ color: accent }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-900 text-xs">
                      {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-xs" style={{ color: accent }}>
                      {edu.institution || 'Institution'}
                    </p>
                    <div className="flex gap-4 text-xs text-slate-400">
                      {edu.startDate && <span>{edu.startDate}</span>}
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 
                className="text-sm font-bold mb-3"
                style={{ color: accent }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="text-xs text-white px-2 py-1 rounded"
                    style={{ backgroundColor: accent }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
