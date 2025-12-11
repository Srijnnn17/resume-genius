import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useResume } from '@/hooks/useResume';
import { useAuth } from '@/contexts/AuthContext';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { SummaryForm } from '@/components/resume/SummaryForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { ATSMatcher } from '@/components/resume/ATSMatcher';
import { DownloadButton } from '@/components/resume/DownloadButton';
import { MinimalTemplate } from '@/components/resume/templates/MinimalTemplate';
import { ModernTemplate } from '@/components/resume/templates/ModernTemplate';
import { ClassicTemplate } from '@/components/resume/templates/ClassicTemplate';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Sparkles, LogIn, LogOut, User, ArrowLeft, Layout, Minimize2, Palette } from 'lucide-react';
import { TemplateType } from './CreateResume';

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const initialTemplate = (searchParams.get('template') as TemplateType) || 'modern';
  const [template, setTemplate] = useState<TemplateType>(initialTemplate);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
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

  const renderTemplate = () => {
    switch (template) {
      case 'minimal':
        return <MinimalTemplate data={resume} />;
      case 'modern':
        return <ModernTemplate data={resume} />;
      case 'classic':
        return <ClassicTemplate data={resume} />;
      default:
        return <ModernTemplate data={resume} />;
    }
  };

  const templateIcons = {
    minimal: Minimize2,
    modern: Layout,
    classic: Palette,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon">
              <Link to="/create">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">ResumeAI</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Resume Builder</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="hidden sm:inline">Powered by AI</span>
            </div>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {user.email}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/auth">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
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
              <div className="p-3 border-b border-border bg-muted/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">Live Preview</span>
                  </div>
                  
                  {/* Template Selector */}
                  <Select value={template} onValueChange={(v) => setTemplate(v as TemplateType)}>
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">
                        <div className="flex items-center gap-2">
                          <Minimize2 className="h-3 w-3" />
                          Minimal
                        </div>
                      </SelectItem>
                      <SelectItem value="modern">
                        <div className="flex items-center gap-2">
                          <Layout className="h-3 w-3" />
                          Modern
                        </div>
                      </SelectItem>
                      <SelectItem value="classic">
                        <div className="flex items-center gap-2">
                          <Palette className="h-3 w-3" />
                          Classic
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DownloadButton data={resume} previewRef={previewRef} />
              </div>
              <div className="p-4 bg-slate-100 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div ref={previewRef}>
                  {renderTemplate()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
