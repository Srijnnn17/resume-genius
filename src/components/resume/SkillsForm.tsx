import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wrench, Plus, X } from 'lucide-react';

interface SkillsFormProps {
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
}

const suggestedSkills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL',
  'AWS', 'Docker', 'Git', 'Agile', 'Leadership', 'Communication'
];

export function SkillsForm({ skills, onAdd, onRemove }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = () => {
    if (newSkill.trim()) {
      onAdd(newSkill);
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const availableSuggestions = suggestedSkills.filter(s => !skills.includes(s));

  return (
    <div className="form-section animate-fade-up" style={{ animationDelay: '0.4s' }}>
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
        <Wrench className="h-5 w-5 text-primary" />
        Skills
      </h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add a skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleAdd} disabled={!newSkill.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-3 py-1 text-sm flex items-center gap-1.5 hover:bg-secondary/80 transition-colors"
              >
                {skill}
                <button
                  onClick={() => onRemove(skill)}
                  className="ml-1 hover:text-destructive transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {availableSuggestions.length > 0 && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-1.5">
              {availableSuggestions.slice(0, 8).map((skill) => (
                <button
                  key={skill}
                  onClick={() => onAdd(skill)}
                  className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
