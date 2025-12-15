import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/resume';
import { FolderKanban, Plus, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  projects: Project[];
  onAdd: () => string;
  onUpdate: (id: string, data: Partial<Project>) => void;
  onRemove: (id: string) => void;
}

export function ProjectsForm({ projects, onAdd, onUpdate, onRemove }: ProjectsFormProps) {
  return (
    <div className="form-section animate-fade-up" style={{ animationDelay: '0.25s' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <FolderKanban className="h-5 w-5 text-primary" />
          Projects
        </h3>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-1" /> Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">
          Add your projects to showcase your work.
        </p>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Project #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  placeholder="Path Pilot"
                  value={project.name}
                  onChange={(e) => onUpdate(project.id, { name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tech Stack</Label>
                  <Input
                    placeholder="MERN Stack, React, Node.js..."
                    value={project.techStack}
                    onChange={(e) => onUpdate(project.id, { techStack: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    placeholder="Jan 2024"
                    value={project.date}
                    onChange={(e) => onUpdate(project.id, { date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="An AI-powered learning platform that intelligently adapts to each learner's skill level..."
                  value={project.description}
                  onChange={(e) => onUpdate(project.id, { description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
