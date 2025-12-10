import { useResume } from '@/hooks/useResume';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { SummaryForm } from '@/components/resume/SummaryForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ATSMatcher } from '@/components/resume/ATSMatcher';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Sparkles } from 'lucide-react';

const Index = () => {
  const {
    resume,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
  } = useResume();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">ResumeAI</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Resume Builder</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Powered by AI</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6">
            <ScrollArea className="h-[calc(100vh-180px)]">
              <div className="space-y-6 pr-4">
                <PersonalInfoForm
                  data={resume.personalInfo}
                  onChange={updatePersonalInfo}
                />
                <SummaryForm
                  value={resume.summary}
                  onChange={updateSummary}
                />
                <ExperienceForm
                  experiences={resume.experiences}
                  onAdd={addExperience}
                  onUpdate={updateExperience}
                  onRemove={removeExperience}
                />
                <EducationForm
                  education={resume.education}
                  onAdd={addEducation}
                  onUpdate={updateEducation}
                  onRemove={removeEducation}
                />
                <SkillsForm
                  skills={resume.skills}
                  onAdd={addSkill}
                  onRemove={removeSkill}
                />
                
                {/* ATS Matcher */}
                <ATSMatcher resume={resume} />
              </div>
            </ScrollArea>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-xl overflow-hidden shadow-xl border border-border bg-card">
              <div className="p-3 border-b border-border bg-muted/50 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-muted-foreground ml-2">Live Preview</span>
              </div>
              <div className="p-4 bg-slate-100 max-h-[calc(100vh-200px)] overflow-y-auto">
                <ResumePreview data={resume} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
