import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

interface SummaryFormProps {
  value: string;
  onChange: (value: string) => void;
}

export function SummaryForm({ value, onChange }: SummaryFormProps) {
  return (
    <div className="form-section animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        Professional Summary
      </h3>
      
      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px] resize-none transition-all focus:shadow-glow"
        />
        <p className="text-xs text-muted-foreground">
          Write 2-4 sentences highlighting your key achievements and career goals.
        </p>
      </div>
    </div>
  );
}
