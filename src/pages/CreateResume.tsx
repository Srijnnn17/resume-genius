import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, Plus, LogIn, LogOut, User, ArrowLeft, Layout, Minimize2, Palette } from 'lucide-react';

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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');

  const handleCreateNew = () => {
    navigate(`/builder?template=${selectedTemplate}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon">
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">ResumeAI</h1>
                <p className="text-xs text-muted-foreground">Create Your Resume</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
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
      <main className="container px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">How would you like to start?</h1>
            <p className="text-muted-foreground">Choose an option to begin creating your resume</p>
          </div>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-primary cursor-pointer hover:shadow-lg transition-all">
              <CardHeader className="text-center">
                <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Create New Resume</CardTitle>
                <CardDescription>Start from scratch with a template</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 cursor-pointer hover:shadow-lg transition-all opacity-60">
              <CardHeader className="text-center">
                <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl">Upload Existing</CardTitle>
                <CardDescription>Coming soon - Upload PDF or DOCX</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Template Selection */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Choose a Template</h2>
              <p className="text-muted-foreground">Select a template style for your resume</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTemplate === template.id
                      ? 'border-2 border-primary ring-2 ring-primary/20'
                      : 'border-border/50'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`p-3 rounded-xl w-fit mx-auto mb-4 ${
                        selectedTemplate === template.id ? 'bg-primary/10' : 'bg-muted'
                      }`}
                    >
                      <template.icon
                        className={`h-6 w-6 ${
                          selectedTemplate === template.id ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
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
