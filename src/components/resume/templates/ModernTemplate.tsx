import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { AccentColor, accentColorMap } from '../AccentColorPicker';

interface TemplateProps {
  data: ResumeData;
  accentColor?: AccentColor;
}

export function ModernTemplate({ data, accentColor = 'green' }: TemplateProps) {
  const { personalInfo, summary, experiences, education, skills } = data;
  const accent = accentColorMap[accentColor];

  return (
    <div className="resume-paper font-sans text-sm leading-relaxed bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header with accent color */}
      <header className="p-6 border-b-2" style={{ borderColor: accent }}>
        <h1 className="text-2xl font-bold tracking-tight text-center" style={{ color: accent }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs text-slate-600">
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

      <div className="p-6">
        {/* Summary */}
        {summary && (
          <section className="mb-5">
            <h2 
              className="text-xs font-bold uppercase tracking-wider pl-2 mb-2 border-l-4"
              style={{ color: accent, borderColor: accent }}
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
              className="text-xs font-bold uppercase tracking-wider pl-2 mb-3 border-l-4"
              style={{ color: accent, borderColor: accent }}
            >
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                  <div 
                    className="absolute -left-[5px] top-0 w-2 h-2 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs">{exp.position || 'Position'}</h3>
                      <p className="text-slate-500 text-xs">
                        {exp.company || 'Company'}
                        {exp.location && ` · ${exp.location}`}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400">
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

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-5">
            <h2 
              className="text-xs font-bold uppercase tracking-wider pl-2 mb-3 border-l-4"
              style={{ color: accent, borderColor: accent }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">
                      {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-slate-500 text-xs">
                      {edu.institution || 'Institution'}
                      {edu.gpa && ` · GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
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
            <h2 
              className="text-xs font-bold uppercase tracking-wider pl-2 mb-3 border-l-4"
              style={{ color: accent, borderColor: accent }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="text-xs text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
