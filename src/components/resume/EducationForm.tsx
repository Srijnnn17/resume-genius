import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Education } from '@/types/resume';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  education: Education[];
  onAdd: () => string;
  onUpdate: (id: string, data: Partial<Education>) => void;
  onRemove: (id: string) => void;
}

export function EducationForm({ education, onAdd, onUpdate, onRemove }: EducationFormProps) {
  return (
    <div className="form-section animate-fade-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Education
        </h3>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      {education.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">
          No education added yet. Click "Add" to add your education history.
        </p>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id} className="p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Education #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(edu.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  placeholder="Stanford University"
                  value={edu.institution}
                  onChange={(e) => onUpdate(edu.id, { institution: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    placeholder="Bachelor of Science"
                    value={edu.degree}
                    onChange={(e) => onUpdate(edu.id, { degree: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    placeholder="Computer Science"
                    value={edu.field}
                    onChange={(e) => onUpdate(edu.id, { field: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Start Year</Label>
                  <Input
                    placeholder="2018"
                    value={edu.startDate}
                    onChange={(e) => onUpdate(edu.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Year</Label>
                  <Input
                    placeholder="2022"
                    value={edu.endDate}
                    onChange={(e) => onUpdate(edu.id, { endDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GPA (Optional)</Label>
                  <Input
                    placeholder="3.8/4.0"
                    value={edu.gpa || ''}
                    onChange={(e) => onUpdate(edu.id, { gpa: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
