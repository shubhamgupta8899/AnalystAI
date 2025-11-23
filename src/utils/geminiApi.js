// utils/geminiApi.js
export const generateCareerGrowthAnalysis = async (companyName, userQuery) => {
  try {
    const systemPrompt = `
# CAREER GROWTH ANALYSIS EXPERT

You are a specialized career intelligence analyst focusing on professional development, skill advancement, and career progression opportunities.

## ANALYSIS FRAMEWORK
Provide comprehensive career growth analysis including:

### PROMOTION PATHS
- Typical promotion timeline and hierarchy
- Common career progression routes
- Leadership opportunities

### SKILL DEVELOPMENT
- Key technical skills required
- Soft skills valued by the company
- Learning and development programs

### GROWTH METRICS
- Average time between promotions
- Internal mobility rate
- Training investment per employee

### COMPANY-SPECIFIC INSIGHTS
- Mentorship programs
- Career development resources
- Educational assistance

## RESPONSE FORMAT
Return structured JSON:
{
  "promotionPaths": [
    {
      "role": "Position Title",
      "timeline": "Typical timeline",
      "requirements": ["Requirement 1", "Requirement 2"]
    }
  ],
  "skillDevelopment": {
    "technicalSkills": ["Skill 1", "Skill 2"],
    "softSkills": ["Skill 1", "Skill 2"],
    "trainingPrograms": ["Program 1", "Program 2"]
  },
  "growthMetrics": {
    "avgPromotionTimeline": "X years",
    "internalMobility": "X%",
    "trainingInvestment": "$X per employee"
  },
  "developmentPrograms": [
    {
      "name": "Program Name",
      "description": "Program details",
      "benefit": "Employee benefit"
    }
  ],
  "growthScore": 4.5,
  "summary": "Comprehensive analysis summary"
}

## COMPANY CONTEXT
Analyzing career growth at: ${companyName}
User Query: ${userQuery}
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
          maxOutputTokens: 2000
        }
      })
    });

    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text) {
      return JSON.parse(text);
    }
    
    throw new Error('No response from API');
  } catch (error) {
    console.error('Career growth analysis error:', error);
    throw error;
  }
};

export const generateQuickAssessment = async (companyName, focusArea) => {
  try {
    const prompt = `
Provide a quick career assessment for ${companyName} focusing on ${focusArea}.
Include:
1. Key strengths for career growth
2. Areas for development
3. Immediate opportunities
4. Long-term prospects
5. Actionable recommendations

Return as JSON:
{
  "quickAssessment": {
    "strengths": ["Strength 1", "Strength 2"],
    "developmentAreas": ["Area 1", "Area 2"],
    "immediateOpportunities": ["Opportunity 1", "Opportunity 2"],
    "longTermProspects": "Prospects summary",
    "actionableSteps": ["Step 1", "Step 2"]
  },
  "confidenceScore": 4.2
}
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
          maxOutputTokens: 1000
        }
      })
    });

    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text) {
      return JSON.parse(text);
    }
    
    throw new Error('No response from API');
  } catch (error) {
    console.error('Quick assessment error:', error);
    throw error;
  }
};