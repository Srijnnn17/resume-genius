import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Zap, Target, LogIn, LogOut, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const { user, signOut } = useAuth();

  const features = [
    { icon: Sparkles, title: 'AI-Powered', description: 'Enhance your bullet points with intelligent AI suggestions' },
    { icon: Target, title: 'ATS Optimized', description: 'Match your resume to job descriptions for better results' },
    { icon: Zap, title: 'Real-Time Preview', description: 'See changes instantly as you type your content' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 header-glass">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
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
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container relative px-4">
          <div className="max-w-2xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-primary text-sm font-medium mb-8 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Resume Building
            </div>
            <h1 className="text-foreground mb-6">
              Build Your Perfect Resume
              <br />
              <span className="text-gradient">with AI Assistance</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Create professional resumes that stand out. Our AI helps you write compelling content
              and optimize for ATS systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="btn-primary-enhanced text-base px-8">
                <Link to="/create">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {!user && (
                <Button asChild variant="outline" size="lg" className="text-base px-8 hover-lift">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4">
          <h2 className="text-center mb-12 animate-fade-up">Why Choose ResumeAI?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card card-interactive animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 w-fit mb-4">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12 animate-fade-up">Everything You Need</h2>
            <div className="grid sm:grid-cols-2 gap-4">
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
                  className="flex items-center gap-3 p-4 rounded-xl card-base hover-lift animate-fade-up"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="p-1 rounded-full bg-primary/10">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl card-base animate-fade-up">
            <h2 className="mb-3">Ready to Build Your Resume?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start creating your professional resume today with AI assistance.
            </p>
            <Button asChild size="lg" className="btn-primary-enhanced px-8">
              <Link to="/create">
                Create Your Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="container px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ResumeAI. Built with AI-powered technology.
        </div>
      </footer>
    </div>
  );
}