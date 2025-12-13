import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Sparkles, Zap, Target, LogIn, LogOut, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const { user, signOut } = useAuth();

  const features = [
    { icon: Sparkles, title: 'AI-Powered', description: 'Enhance your bullet points with intelligent AI suggestions' },
    { icon: Target, title: 'ATS Optimized', description: 'Match your resume to job descriptions for better results' },
    { icon: Zap, title: 'Real-Time Preview', description: 'See changes instantly as you type your content' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">ResumeAI</span>
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

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-24 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative px-4">
          <div className="max-w-2xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Resume Building
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight tracking-tight">
              Build Your Perfect Resume
              <br />
              <span className="text-primary">with AI Assistance</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Create professional resumes that stand out. Our AI helps you write compelling content
              and optimize for ATS systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="btn-primary-enhanced text-base px-6">
                <Link to="/create">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {!user && (
                <Button asChild variant="outline" size="lg" className="text-base px-6">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Why Choose ResumeAI?</h2>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="card-base hover-lift animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">Everything You Need</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'AI-powered bullet point enhancement',
                'Real-time resume preview',
                'ATS compatibility checker',
                'Multiple professional templates',
                'Export to PDF format',
                'Job description matching',
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-card border border-border hover-lift animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/[0.03] border-y border-border">
        <div className="container px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Build Your Resume?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start creating your professional resume today with AI assistance.
          </p>
          <Button asChild size="lg" className="btn-primary-enhanced px-6">
            <Link to="/create">
              Create Your Resume
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ResumeAI. Built with AI-powered technology.
        </div>
      </footer>
    </div>
  );
}