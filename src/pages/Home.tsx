import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Zap, Target, ArrowRight, CheckCircle, Instagram } from 'lucide-react';
import { Header } from '@/components/Header';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { useAuth } from '@/contexts/AuthContext';
import srijanProfile from '@/assets/srijan-profile.jpg';

export default function Home() {
  const { user } = useAuth();

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
      <AnnouncementBar />

      {/* Header */}
      <Header showNav onScrollToSection={scrollToSection} />

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
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Contact</h2>
            <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 dark:from-blue-950/50 dark:via-sky-950/50 dark:to-indigo-950/50 rounded-2xl p-6 shadow-xl shadow-blue-200/40 dark:shadow-blue-900/20">
              {/* Top Section with Photo and Info */}
              <div className="flex items-center gap-5 mb-6">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <img 
                    src={srijanProfile} 
                    alt="Srijan" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                {/* Info */}
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                    Developer
                  </p>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    Srijan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    srijannn17@gmail.com
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-6 mb-6 pl-1">
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-500" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Instagram</p>
                    <a 
                      href="https://instagram.com/srijannn17" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground hover:text-blue-600 transition-colors"
                    >
                      @srijannn17
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <a 
                href="mailto:srijannn17@gmail.com"
                className="flex items-center justify-center gap-2 w-full py-3 bg-white dark:bg-background rounded-lg text-sm font-semibold text-foreground uppercase tracking-wide hover:bg-gray-50 dark:hover:bg-muted transition-colors border border-border/30 shadow-sm"
              >
                Contact Me
                <ArrowRight className="h-4 w-4" />
              </a>
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