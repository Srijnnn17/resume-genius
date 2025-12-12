-- Drop existing policies and create user-specific ones for resumes
DROP POLICY IF EXISTS "Anyone can create resumes" ON public.resumes;
DROP POLICY IF EXISTS "Anyone can delete resumes" ON public.resumes;
DROP POLICY IF EXISTS "Anyone can update resumes" ON public.resumes;
DROP POLICY IF EXISTS "Anyone can view resumes" ON public.resumes;

CREATE POLICY "Users can view their own resumes" ON public.resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own resumes" ON public.resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own resumes" ON public.resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own resumes" ON public.resumes FOR DELETE USING (auth.uid() = user_id);

-- Drop existing policies and create user-specific ones for experiences
DROP POLICY IF EXISTS "Anyone can create experiences" ON public.experiences;
DROP POLICY IF EXISTS "Anyone can delete experiences" ON public.experiences;
DROP POLICY IF EXISTS "Anyone can update experiences" ON public.experiences;
DROP POLICY IF EXISTS "Anyone can view experiences" ON public.experiences;

CREATE POLICY "Users can view their own experiences" ON public.experiences FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.resumes WHERE resumes.id = experiences.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Users can create their own experiences" ON public.experiences FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.resumes WHERE resumes.id = experiences.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Users can update their own experiences" ON public.experiences FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.resumes WHERE resumes.id = experiences.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Users can delete their own experiences" ON public.experiences FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.resumes WHERE resumes.id = experiences.resume_id AND resumes.user_id = auth.uid())
);

-- Drop existing policies and create user-specific ones for education
DROP POLICY IF EXISTS "Anyone can create education" ON public.education;
DROP POLICY IF EXISTS "Anyone can delete education" ON public.education;
DROP POLICY IF EXISTS "Anyone can update education" ON public.education;
DROP POLICY IF EXISTS "Anyone can view education" ON public.education;

CREATE POLICY "Users can view their own education" ON public.education FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.resumes WHERE resumes.id = education.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Users can create their own education" ON public.education FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.resumes WHERE resumes.id = education.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Users can update their own education" ON public.education FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.resumes WHERE resumes.id = education.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Users can delete their own education" ON public.education FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.resumes WHERE resumes.id = education.resume_id AND resumes.user_id = auth.uid())
);