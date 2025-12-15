-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resume_id UUID NOT NULL REFERENCES public.resumes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL DEFAULT '',
  tech_stack TEXT DEFAULT '',
  description TEXT DEFAULT '',
  date TEXT DEFAULT ''
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own projects" 
ON public.projects 
FOR SELECT 
USING (EXISTS ( SELECT 1 FROM resumes WHERE resumes.id = projects.resume_id AND resumes.user_id = auth.uid()));

CREATE POLICY "Users can create their own projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (EXISTS ( SELECT 1 FROM resumes WHERE resumes.id = projects.resume_id AND resumes.user_id = auth.uid()));

CREATE POLICY "Users can update their own projects" 
ON public.projects 
FOR UPDATE 
USING (EXISTS ( SELECT 1 FROM resumes WHERE resumes.id = projects.resume_id AND resumes.user_id = auth.uid()));

CREATE POLICY "Users can delete their own projects" 
ON public.projects 
FOR DELETE 
USING (EXISTS ( SELECT 1 FROM resumes WHERE resumes.id = projects.resume_id AND resumes.user_id = auth.uid()));