import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, Plus, Layout, Minimize2, Palette, Clock, Trash2 } from 'lucide-react';
import { fetchUserResumes, deleteResume, SavedResume } from '@/services/resumeService';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Header } from '@/components/Header';
import { AnnouncementBar } from '@/components/AnnouncementBar';

export type TemplateType = 'minimal' | 'modern' | 'classic';

const templates: { id: TemplateType; name: string; description: string; icon: React.ElementType }[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design focusing on content',
    icon: Minimize2,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with accent colors',
    icon: Layout,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional layout',
    icon: Palette,
  },
];

export default function CreateResume() {
  const { user } = useAuth();
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

  return (
    <div className="min-h-screen bg-background font-['Inter']">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <Header showBackButton backTo="/" />

      {/* Main Content */}
      <main className="container px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Saved Resumes Section */}
          {user && savedResumes.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Your Resumes</h2>
                <p className="text-muted-foreground">Continue editing your saved resumes</p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedResumes.map((resume) => (
                  <Card
                    key={resume.id}
                    className="cursor-pointer transition-all duration-300 border-border/50 hover:border-primary/50 group hover:-translate-y-1 hover:shadow-xl"
                    onClick={() => handleEditResume(resume.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={(e) => handleDeleteResume(resume.id, e)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1 truncate text-lg">
                        {resume.personal_info?.fullName || 'Untitled Resume'}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate mb-4">
                        {resume.personal_info?.email || 'No email'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t border-border/50">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Updated {format(new Date(resume.updated_at), 'MMM d, yyyy')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {savedResumes.length > 0 ? 'Create a New Resume' : 'How would you like to start?'}
            </h1>
            <p className="text-muted-foreground">Choose an option to begin creating your resume</p>
          </div>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-primary cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader className="text-center py-8">
                <div className="p-5 rounded-2xl bg-primary/10 w-fit mx-auto mb-5 transition-transform duration-300 group-hover:scale-110">
                  <Plus className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Create New Resume</CardTitle>
                <CardDescription className="text-base mt-2">Start from scratch with a template</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl opacity-60">
              <CardHeader className="text-center py-8">
                <div className="p-5 rounded-2xl bg-muted w-fit mx-auto mb-5">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold">Upload Existing</CardTitle>
                <CardDescription className="text-base mt-2">Coming soon - Upload PDF or DOCX</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Template Selection */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Choose a Template</h2>
              <p className="text-muted-foreground">Select a template style for your resume</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    selectedTemplate === template.id
                      ? 'border-2 border-primary ring-2 ring-primary/20'
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`p-4 rounded-2xl w-fit mx-auto mb-5 transition-all duration-300 ${
                        selectedTemplate === template.id ? 'bg-primary/10 scale-110' : 'bg-muted'
                      }`}
                    >
                      <template.icon
                        className={`h-7 w-7 ${
                          selectedTemplate === template.id ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                    <h3 className="font-bold text-foreground mb-2 text-lg">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-6">
              <Button size="lg" className="px-12" onClick={handleCreateNew}>
                Continue with {templates.find((t) => t.id === selectedTemplate)?.name}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}