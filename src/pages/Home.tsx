import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Sparkles, Zap, Target, LogIn, LogOut, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const { user, signOut } = useAuth();

  const features = [
    { icon: Sparkles, title: 'AI-Powered', description: 'Enhance your bullet points with intelligent AI suggestions' },
    { icon: Target, title: 'ATS Optimized', description: 'Match your resume perfectly to job descriptions' },
    { icon: Zap, title: 'Real-Time Preview', description: 'See changes instantly as you type' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground font-serif">ResumeAI</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:flex items-center gap-2">
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

      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Professional Resume Builder
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6 leading-tight">
              Build Your Perfect Resume
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Create professional resumes that stand out. Our AI helps you write compelling content
              and optimize for applicant tracking systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8">
                <Link to="/create">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {!user && (
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container px-4">
        <div className="elegant-divider" />
      </div>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Features</p>
            <h2 className="text-3xl font-serif text-foreground">Why Choose ResumeAI</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-border bg-card hover:shadow-elegant transition-shadow">
                <CardHeader className="pb-3">
                  <div className="p-2.5 rounded-md bg-secondary w-fit mb-4">
                    <feature.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <CardTitle className="text-lg font-serif">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Benefits</p>
              <h2 className="text-3xl font-serif text-foreground">Everything You Need</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'AI-powered content enhancement',
                'Real-time resume preview',
                'ATS compatibility analysis',
                'Multiple professional templates',
                'Export to PDF format',
                'Job description matching',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-md bg-card border border-border">
                  <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-foreground text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Ready to Begin?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start creating your professional resume today with AI assistance.
          </p>
          <Button asChild size="lg" className="px-8">
            <Link to="/create">
              Create Your Resume
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}