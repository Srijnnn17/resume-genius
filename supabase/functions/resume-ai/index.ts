import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    if (type === 'enhance') {
      // Bullet point enhancer
      systemPrompt = `You are an expert resume writer specializing in transforming basic job descriptions into powerful, ATS-optimized bullet points using the STAR method (Situation, Task, Action, Result).

Your task is to enhance resume bullet points to be:
1. Action-oriented with strong verbs
2. Quantified with metrics where possible
3. Results-focused showing impact
4. Professional and concise (under 2 lines)

If the input is vague, infer reasonable details to make it impactful. Always start with an action verb in past tense.`;

      userPrompt = `Transform this basic description into a professional STAR-method resume bullet point:

Input: "${data.text}"
Job Title: ${data.position || 'Not specified'}
Company Context: ${data.company || 'Not specified'}

Return ONLY the enhanced bullet point, nothing else.`;

    } else if (type === 'ats') {
      // ATS Matcher
      systemPrompt = `You are an expert ATS (Applicant Tracking System) analyst and career coach. Your job is to analyze resumes against job descriptions and provide actionable feedback.

Analyze the match between the resume and job description, considering:
1. Keyword matching (technical skills, soft skills, industry terms)
2. Experience alignment
3. Education requirements
4. Overall suitability

Provide your response ONLY as a valid JSON object with this exact structure:
{
  "score": <number 0-100>,
  "missingKeywords": [<array of missing important keywords>],
  "suggestions": [<array of specific improvement suggestions>]
}`;

      userPrompt = `Analyze this resume against the job description:

JOB DESCRIPTION:
${data.jobDescription}

RESUME:
Name: ${data.resume.personalInfo?.fullName || 'Not provided'}
Summary: ${data.resume.summary || 'Not provided'}
Skills: ${data.resume.skills?.join(', ') || 'Not provided'}
Experience: ${data.resume.experiences?.map((e: any) => `${e.position} at ${e.company}: ${e.description}`).join('\n') || 'Not provided'}
Education: ${data.resume.education?.map((e: any) => `${e.degree} in ${e.field} from ${e.institution}`).join('\n') || 'Not provided'}

Return ONLY the JSON object, no markdown formatting.`;
    } else {
      throw new Error('Invalid request type');
    }

    console.log(`Processing ${type} request`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in AI response');
    }

    let result;
    if (type === 'enhance') {
      result = { enhanced: content.trim() };
    } else {
      // Parse JSON response for ATS
      try {
        const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        result = JSON.parse(cleanContent);
      } catch {
        console.error('Failed to parse ATS JSON:', content);
        result = {
          score: 50,
          missingKeywords: ['Unable to parse response'],
          suggestions: ['Please try again'],
        };
      }
    }

    console.log(`Successfully processed ${type} request`);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in resume-ai function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
