import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeData, ATSResult } from '@/types/resume';
import { Target, Loader2, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ATSMatcherProps {
  resume: ResumeData;
}

export function ATSMatcher({ resume }: ATSMatcherProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('resume-ai', {
        body: {
          type: 'ats',
          data: {
            jobDescription,
            resume,
          },
        },
      });

      if (error) throw error;

      setResult(data);
      toast.success('Analysis complete!');
    } catch (error: any) {
      console.error('ATS analysis error:', error);
      toast.error(error.message || 'Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-6 w-6 text-green-600" />;
    if (score >= 60) return <AlertCircle className="h-6 w-6 text-yellow-600" />;
    return <XCircle className="h-6 w-6 text-red-600" />;
  };

  return (
    <Card className="border-accent/30 bg-gradient-to-br from-card to-accent/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-accent" />
          ATS Job Matcher
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Paste the job description here to analyze your resume match..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[120px] resize-none text-sm"
          />
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !jobDescription.trim()}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Target className="h-4 w-4 mr-2" />
                Analyze Match
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="space-y-4 pt-4 border-t border-border animate-fade-up">
            {/* Score */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-background">
              <div className="flex items-center gap-3">
                {getScoreIcon(result.score)}
                <div>
                  <p className="text-sm font-medium">Match Score</p>
                  <p className="text-xs text-muted-foreground">Based on keywords & qualifications</p>
                </div>
              </div>
              <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}%
              </span>
            </div>

            {/* Missing Keywords */}
            {result.missingKeywords.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Missing Keywords</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingKeywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-destructive/10 text-destructive"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Improvement Suggestions</p>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
