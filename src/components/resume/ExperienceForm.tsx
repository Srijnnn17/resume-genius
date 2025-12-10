import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Experience } from '@/types/resume';
import { Briefcase, Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ExperienceFormProps {
  experiences: Experience[];
  onAdd: () => string;
  onUpdate: (id: string, data: Partial<Experience>) => void;
  onRemove: (id: string) => void;
}

export function ExperienceForm({ experiences, onAdd, onUpdate, onRemove }: ExperienceFormProps) {
  const [enhancing, setEnhancing] = useState<string | null>(null);

  const handleEnhance = async (exp: Experience) => {
    if (!exp.description.trim()) {
      toast.error('Please enter a description first');
      return;
    }

    setEnhancing(exp.id);
    try {
      const { data, error } = await supabase.functions.invoke('resume-ai', {
        body: {
          type: 'enhance',
          data: {
            text: exp.description,
            position: exp.position,
            company: exp.company,
          },
        },
      });

      if (error) throw error;
      
      if (data.enhanced) {
        onUpdate(exp.id, { description: data.enhanced });
        toast.success('Description enhanced!');
      }
    } catch (error: any) {
      console.error('Enhancement error:', error);
      toast.error(error.message || 'Failed to enhance description');
    } finally {
      setEnhancing(null);
    }
  };

  return (
    <div className="form-section animate-fade-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Work Experience
        </h3>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      {experiences.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">
          No experience added yet. Click "Add" to add your work history.
        </p>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Experience #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(exp.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    placeholder="Software Engineer"
                    value={exp.position}
                    onChange={(e) => onUpdate(exp.id, { position: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    placeholder="Tech Company Inc."
                    value={exp.company}
                    onChange={(e) => onUpdate(exp.id, { company: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="San Francisco, CA"
                  value={exp.location}
                  onChange={(e) => onUpdate(exp.id, { location: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    placeholder="Jan 2022"
                    value={exp.startDate}
                    onChange={(e) => onUpdate(exp.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    placeholder="Present"
                    value={exp.endDate}
                    onChange={(e) => onUpdate(exp.id, { endDate: e.target.value })}
                    disabled={exp.isCurrent}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.isCurrent}
                  onCheckedChange={(checked) =>
                    onUpdate(exp.id, { isCurrent: !!checked, endDate: checked ? 'Present' : '' })
                  }
                />
                <Label htmlFor={`current-${exp.id}`} className="text-sm cursor-pointer">
                  I currently work here
                </Label>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Description</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEnhance(exp)}
                    disabled={enhancing === exp.id}
                    className="text-accent hover:text-accent ai-button"
                  >
                    {enhancing === exp.id ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-1" />
                    )}
                    Enhance with AI
                  </Button>
                </div>
                <Textarea
                  placeholder="Describe your responsibilities and achievements... (tip: write a short phrase and click 'Enhance with AI')"
                  value={exp.description}
                  onChange={(e) => onUpdate(exp.id, { description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
