import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, Upload, Plus, LogIn, LogOut, User, ArrowLeft, 
  Layout, Minimize2, Palette, Clock, Trash2, Copy, Edit3, 
  ChevronRight, FolderOpen
} from 'lucide-react';
import { fetchUserResumes, deleteResume, SavedResume } from '@/services/resumeService';
import { toast } from 'sonner';
import { format } from 'date-fns';

export type TemplateType = 'minimal' | 'modern' | 'classic';

const templates: { id: TemplateType; name: string; description: string; icon: React.ElementType }[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design',
    icon: Minimize2,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary with accents',
    icon: Layout,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional',
    icon: Palette,
  },
];

export default function CreateResume() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [savedResumes, setSavedResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadSavedResumes();
    }
  }, [user]);

  const loadSavedResumes = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const resumes = await fetchUserResumes(user.id);
      setSavedResumes(resumes);
    } catch (error) {
      console.error('Error loading resumes:', error);
      toast.error('Failed to load saved resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate(`/builder?template=${selectedTemplate}`);
  };

  const handleEditResume = (resumeId: string) => {
    navigate(`/builder?resumeId=${resumeId}&template=${selectedTemplate}`);
  };

  const handleDeleteResume = async (resumeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    
    try {
      await deleteResume(resumeId, user.id);
      setSavedResumes(prev => prev.filter(r => r.id !== resumeId));
      toast.success('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume');
    }
  };

  const getTemplateIcon = (templateName?: string) => {
    switch (templateName?.toLowerCase()) {
      case 'modern': return Layout;
      case 'minimal': return Minimize2;
      case 'classic': return Palette;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-primary">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">ResumeAI</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
      <main className="container px-4 py-8 max-w-5xl mx-auto">
        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-10 animate-fade-up">
          {/* Create New Resume Card */}
          <div 
            className="action-card-primary cursor-pointer group"
            onClick={handleCreateNew}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Create New Resume</h3>
                <p className="text-sm text-muted-foreground">Start from scratch using templates</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>

          {/* Upload Existing Card */}
          <div className="action-card cursor-not-allowed opacity-60">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">Upload Existing Resume</h3>
                  <span className="badge-coming-soon">Coming Soon</span>
                </div>
                <p className="text-sm text-muted-foreground">Upload PDF or DOCX to edit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Resumes Section */}
        {user && (
          <section className="mb-10 animate-fade-up delay-75">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="section-header">Your Resumes</h2>
                <p className="section-subheader">
                  {savedResumes.length > 0 
                    ? `${savedResumes.length} saved resume${savedResumes.length !== 1 ? 's' : ''}`
                    : 'No resumes created yet'
                  }
                </p>
              </div>
            </div>
            
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-5">
                      <div className="h-10 w-10 rounded-lg bg-muted mb-3" />
                      <div className="h-4 w-3/4 bg-muted rounded mb-2" />
                      <div className="h-3 w-1/2 bg-muted rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : savedResumes.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedResumes.map((resume, index) => {
                  const TemplateIcon = getTemplateIcon();
                  return (
                    <Card
                      key={resume.id}
                      className="card-interactive group animate-fade-up"
                      style={{ animationDelay: `${(index + 1) * 50}ms` }}
                      onClick={() => handleEditResume(resume.id)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                            <TemplateIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditResume(resume.id);
                              }}
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              onClick={(e) => handleDeleteResume(resume.id, e)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-medium text-foreground mb-0.5 truncate">
                          {resume.personal_info?.fullName || 'Untitled Resume'}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate mb-3">
                          {resume.personal_info?.email || 'No email added'}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Updated {format(new Date(resume.updated_at), 'MMM d, yyyy')}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state border border-dashed border-border rounded-xl">
                <div className="empty-state-icon">
                  <FolderOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="empty-state-title">No resumes yet</h3>
                <p className="empty-state-description">Create your first resume to get started</p>
                <Button onClick={handleCreateNew} className="btn-primary-enhanced">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Resume
                </Button>
              </div>
            )}
          </section>
        )}

        {/* Template Selection */}
        <section className="animate-fade-up delay-150">
          <div className="mb-4">
            <h2 className="section-header">Choose a Template</h2>
            <p className="section-subheader">Select a style for your new resume</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`card-interactive transition-all ${
                  selectedTemplate === template.id
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/[0.02]'
                    : ''
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardContent className="p-5 text-center">
                  <div
                    className={`p-2.5 rounded-lg w-fit mx-auto mb-3 transition-colors ${
                      selectedTemplate === template.id ? 'bg-primary/10' : 'bg-muted'
                    }`}
                  >
                    <template.icon
                      className={`h-5 w-5 ${
                        selectedTemplate === template.id ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                  <h3 className="font-medium text-foreground mb-0.5">{template.name}</h3>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={handleCreateNew} className="btn-primary-enhanced px-8">
              Continue with {templates.find((t) => t.id === selectedTemplate)?.name}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}