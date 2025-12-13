import { useRef, useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
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
import { FileText, LogIn, LogOut, User, ArrowLeft, Layout, Minimize2, Palette, Save, Loader2 } from 'lucide-react';
import { TemplateType } from './CreateResume';
import { saveResume, loadResume } from '@/services/resumeService';
import { toast } from 'sonner';

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTemplate = (searchParams.get('template') as TemplateType) || 'modern';
  const resumeIdParam = searchParams.get('resumeId');
  
  const [template, setTemplate] = useState<TemplateType>(initialTemplate);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(resumeIdParam);
  const [saving, setSaving] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const {
    resume,
    setResume,
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

  // Load existing resume if resumeId is provided
  useEffect(() => {
    if (resumeIdParam && user) {
      loadExistingResume(resumeIdParam);
    }
  }, [resumeIdParam, user]);

  const loadExistingResume = async (resumeId: string) => {
    if (!user) return;
    setLoadingResume(true);
    try {
      const data = await loadResume(resumeId, user.id);
      if (data) {
        setResume(data);
        setCurrentResumeId(resumeId);
      } else {
        toast.error('Resume not found');
        navigate('/create');
      }
    } catch (error) {
      console.error('Error loading resume:', error);
      toast.error('Failed to load resume');
    } finally {
      setLoadingResume(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save your resume');
      return;
    }

    setSaving(true);
    try {
      const savedId = await saveResume(user.id, resume, currentResumeId || undefined);
      setCurrentResumeId(savedId);
      toast.success('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

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

  if (loadingResume) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3 text-primary" />
          <p className="text-sm text-muted-foreground">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 header-glass">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <Link to="/create">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">ResumeAI</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Save Button */}
            {user && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSave}
                disabled={saving}
                className="h-8"
              >
                {saving ? (
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Save className="h-3.5 w-3.5 mr-1.5" />
                )}
                {saving ? 'Saving...' : 'Save'}
              </Button>
            )}
            
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut} className="h-8 text-muted-foreground hover:text-foreground">
                  <LogOut className="h-3.5 w-3.5 mr-1.5" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild variant="ghost" size="sm" className="h-8">
                <Link to="/auth">
                  <LogIn className="h-3.5 w-3.5 mr-1.5" />
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
          {/* Form Section - Clean and light */}
          <div className="space-y-5">
            <ScrollArea className="h-[calc(100vh-140px)]">
              <div className="space-y-5 pr-4">
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

          {/* Preview Section - Clean and print-friendly */}
          <div className="lg:sticky lg:top-20 h-fit">
            <div className="rounded-lg overflow-hidden border border-border bg-card">
              {/* Preview Header */}
              <div className="p-3 border-b border-border bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">Preview</span>
                  
                  {/* Template Selector */}
                  <Select value={template} onValueChange={(v) => setTemplate(v as TemplateType)}>
                    <SelectTrigger className="w-28 h-7 text-xs border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">
                        <div className="flex items-center gap-1.5">
                          <Minimize2 className="h-3 w-3" />
                          Minimal
                        </div>
                      </SelectItem>
                      <SelectItem value="modern">
                        <div className="flex items-center gap-1.5">
                          <Layout className="h-3 w-3" />
                          Modern
                        </div>
                      </SelectItem>
                      <SelectItem value="classic">
                        <div className="flex items-center gap-1.5">
                          <Palette className="h-3 w-3" />
                          Classic
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DownloadButton data={resume} previewRef={previewRef} />
              </div>
              
              {/* Resume Preview - Light background for print-friendliness */}
              <div className="p-4 bg-neutral-100 max-h-[calc(100vh-180px)] overflow-y-auto">
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