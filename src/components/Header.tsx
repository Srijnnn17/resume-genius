import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { FileText, LogIn, LogOut, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  backTo?: string;
  showNav?: boolean;
  onScrollToSection?: (id: string) => void;
}

export function Header({ showBackButton = false, backTo = '/', showNav = false, onScrollToSection }: HeaderProps) {
  const { user, signOut } = useAuth();

  // Extract first name from email (before @)
  const getUserName = () => {
    if (!user?.email) return '';
    const namePart = user.email.split('@')[0];
    // Capitalize first letter
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  return (
    <header className="sticky top-9 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Left Side */}
        <div className="flex items-center gap-2.5">
          {showBackButton && (
            <Button asChild variant="ghost" size="icon">
              <Link to={backTo}>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md group-hover:shadow-lg transition-shadow">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </Link>
        </div>

        {/* Navigation Links (only on Home) */}
        {showNav && onScrollToSection && (
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onScrollToSection('hero')}
              className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onScrollToSection('features')}
              className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => onScrollToSection('contact')}
              className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </nav>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-3">
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
  );
}