import { useRef, useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useResume } from '@/hooks/useResume';
import { useAuth } from '@/contexts/AuthContext';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { SummaryForm } from '@/components/resume/SummaryForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { ProjectsForm } from '@/components/resume/ProjectsForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { ATSMatcher } from '@/components/resume/ATSMatcher';
import { DownloadButton } from '@/components/resume/DownloadButton';
import { MinimalTemplate } from '@/components/resume/templates/MinimalTemplate';
import { ModernTemplate } from '@/components/resume/templates/ModernTemplate';
import { ClassicTemplate } from '@/components/resume/templates/ClassicTemplate';
import { AccentColorPicker, AccentColor } from '@/components/resume/AccentColorPicker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FileText, Sparkles, LogIn, LogOut, ArrowLeft, Layout, Minimize2, Palette, Save, Loader2 } from 'lucide-react';
import { TemplateType } from './CreateResume';
import { saveResume, loadResume } from '@/services/resumeService';
import { toast } from 'sonner';

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTemplate = (searchParams.get('template') as TemplateType) || 'modern';
  const resumeIdParam = searchParams.get('resumeId');
  
  const [template, setTemplate] = useState<TemplateType>(initialTemplate);
  const [accentColor, setAccentColor] = useState<AccentColor>('green');
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
    addProject,
    updateProject,
    removeProject,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
  } = useResume();

  // Extract first name from email (before @)
  const getUserName = () => {
    if (!user?.email) return '';
    const namePart = user.email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

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
        return <MinimalTemplate data={resume} accentColor={accentColor} />;
      case 'modern':
        return <ModernTemplate data={resume} accentColor={accentColor} />;
      case 'classic':
        return <ClassicTemplate data={resume} accentColor={accentColor} />;
      default:
        return <ModernTemplate data={resume} accentColor={accentColor} />;
    }
  };

  if (loadingResume) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-['Inter']">
      {/* Header - styled consistently with Home */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16 px-4">
          {/* Left Side */}
          <div className="flex items-center gap-2.5">
            <Button asChild variant="ghost" size="icon">
              <Link to="/create">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md group-hover:shadow-lg transition-shadow">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="hidden sm:inline">Powered by AI</span>
            </div>
            
            {/* Save Button */}
            {user && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSave}
                disabled={saving}
                className="rounded-full px-5 border-border/60 hover:bg-muted/50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {saving ? 'Saving...' : 'Save'}
              </Button>
            )}
            
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Hi {getUserName()}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="rounded-full px-5 border-border/60 hover:bg-muted/50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                asChild 
                variant="outline" 
                size="sm"
                className="rounded-full px-5 border-border/60 hover:bg-muted/50"
              >
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
                <ProjectsForm
                  projects={resume.projects}
                  onAdd={addProject}
                  onUpdate={updateProject}
                  onRemove={removeProject}
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
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                  </div>
                  
                  {/* Template Selector */}
                  <Select value={template} onValueChange={(v) => setTemplate(v as TemplateType)}>
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <Layout className="h-3 w-3 mr-1" />
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
                          <FileText className="h-3 w-3" />
                          Classic
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Accent Color Picker */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 text-xs gap-2">
                        <Palette className="h-3 w-3" />
                        Accent
                        <div 
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: accentColor === 'green' ? '#22C55E' : 
                            accentColor === 'blue' ? '#3B82F6' :
                            accentColor === 'indigo' ? '#6366F1' :
                            accentColor === 'purple' ? '#A855F7' :
                            accentColor === 'red' ? '#EF4444' :
                            accentColor === 'orange' ? '#F97316' :
                            accentColor === 'teal' ? '#14B8A6' :
                            accentColor === 'pink' ? '#EC4899' :
                            accentColor === 'gray' ? '#6B7280' : '#1F2937'
                          }}
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-2" align="start">
                      <AccentColorPicker selected={accentColor} onChange={setAccentColor} />
                    </PopoverContent>
                  </Popover>
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