import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Sparkles, Zap, Target, LogIn, LogOut, ArrowRight, CheckCircle, Mail, Phone, MapPin, User } from 'lucide-react';

export default function Home() {
  const { user, signOut } = useAuth();

  const features = [
    { icon: Sparkles, title: 'AI-Powered', description: 'Enhance your bullet points with AI suggestions' },
    { icon: Target, title: 'ATS Optimized', description: 'Match your resume to job descriptions' },
    { icon: Zap, title: 'Real-Time Preview', description: 'See changes instantly as you type' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background font-['Inter']">
      {/* Announcement Bar */}
      <div className="sticky top-0 z-[60] bg-gradient-to-r from-emerald-100 via-green-100 to-teal-100 dark:from-emerald-900/30 dark:via-green-900/30 dark:to-teal-900/30 shadow-sm">
        <div className="container flex items-center justify-center h-9 px-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-emerald-500 text-white rounded-full">
              New
            </span>
            <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
              AI Feature Added
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-9 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md group-hover:shadow-lg transition-shadow">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Auth Button */}
          <div className="flex items-center">
            {user ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="rounded-full px-5 border-border/60 hover:bg-muted/50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
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

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Building
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Build Your Perfect Resume with{' '}
              <span className="gradient-text">AI Assistance</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create professional resumes that stand out. Our AI helps you write compelling bullet points
              and optimize for ATS systems to land more interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 rounded-full">
                <Link to="/create">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {!user && (
                <Button asChild variant="outline" size="lg" className="text-lg px-8 rounded-full">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ResumeAI?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'AI-powered bullet point enhancement',
                'Real-time resume preview',
                'ATS compatibility checker',
                'Multiple professional templates',
                'Export to PDF format',
                'Job description matching',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Resume?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start creating your professional resume today with AI assistance.
          </p>
          <Button asChild size="lg" className="text-lg px-8 rounded-full">
            <Link to="/create">
              Create Your Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/20">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Contact</h2>
            <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-6">Developer: Srijan</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:srijannn17@gmail.com" className="hover:text-foreground transition-colors">
                    srijannn17@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+918210476610" className="hover:text-foreground transition-colors">
                    +91 8210476610
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Ranchi, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ResumeAI. Built with AI-powered technology.
        </div>
      </footer>
    </div>
  );
}