import React, { useState, useEffect, useRef } from 'react';
import RightPanel from './components/RightPanel';
import JobSeekerPanel from './components/JobSeekerPanel';
import InvestorPanel from './components/InvestorPanel';
import SettingsModal from './components/SettingsModal';
import { MOCK_ANALYSIS } from './data/mockData';
import LeftPanel from './components/leftPanel';

export default function CompanyAnalyzer() {
  // State with hardcoded API key
  const [apiKey] = useState("AIzaSyBTAQtOhqiFpoUPmMwNTbyX4v0HOekuigI");
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', content: "Hello! I'm your Company Intelligence Agent. Name a company to start research." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [analysis, setAnalysis] = useState(null); 
  const [loadingStep, setLoadingStep] = useState("");
  const [userMode, setUserMode] = useState('general'); // 'general', 'job-seeker', 'investor'
  
  // Conversation State Machine (for Simulation)
  const [conversationState, setConversationState] = useState({
    stage: 'IDLE', // IDLE, AWAITING_PURPOSE, AWAITING_DETAIL
    company: null,
    purpose: null
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // --- Logic ---

  const handleOptionSelect = (optionText) => {
    handleSend(null, optionText);
  };

  const handleQuickStart = (prompt) => {
    setInputValue(prompt);
    handleSend(null, prompt);
  };

  const generateResponse = async (userQuery) => {
    // 1. Simulation Logic (Client-Side State Machine)
    if (!apiKey) {
      await new Promise(r => setTimeout(r, 800));
      
      // Stage 1: IDLE -> User provides Company Name
      if (conversationState.stage === 'IDLE') {
        const company = userQuery.replace(/(analyze|research|look up|find)/i, "").trim();
        setConversationState({ stage: 'AWAITING_PURPOSE', company, purpose: null });
        
        const modeSpecificOptions = {
          'general': ["Financial Performance", "Market Position", "Competitive Landscape", "Full Business Report"],
          'job-seeker': ["Company Culture & Values", "Salary & Benefits", "Career Growth", "Work-Life Balance", "Open Positions"],
          'investor': ["Financial Metrics", "Growth Potential", "Risk Analysis", "Valuation Assessment", "Stock Performance"]
        };
        
        return {
          text: `I found **${company}**. What specific aspect would you like to analyze?`,
          options: modeSpecificOptions[userMode]
        };
      }

      // Stage 2: AWAITING_PURPOSE -> User selects Purpose
      if (conversationState.stage === 'AWAITING_PURPOSE') {
        const purpose = userQuery;
        setConversationState(prev => ({ ...prev, stage: 'AWAITING_DETAIL', purpose }));
        
        if (userMode === 'job-seeker') {
          return {
            text: `Great! For **${conversationState.company}**, which role or department are you interested in?`,
            options: ["Engineering/Technical", "Sales & Marketing", "Product Management", "Operations", "Executive Leadership", "All Departments"]
          };
        } else if (userMode === 'investor') {
          return {
            text: `Analyzing **${conversationState.company}** for investment. What's your primary focus?`,
            options: ["Short-term Performance", "Long-term Growth", "Dividend Analysis", "Risk Assessment", "Market Position"]
          };
        } else {
          return {
            text: `Researching **${conversationState.company}**. Do you want a specific timeframe or region?`,
            options: ["Current Quarter", "Annual Report", "3-Year Trend", "Global Analysis", "Regional Focus"]
          };
        }
      }

      // Stage 3: AWAITING_DETAIL -> Final Generation
      if (conversationState.stage === 'AWAITING_DETAIL') {
        setLoadingStep(`Generating ${userMode === 'job-seeker' ? 'Career' : userMode === 'investor' ? 'Investment' : 'Business'} Analysis...`);
        await new Promise(r => setTimeout(r, 2000));
        setLoadingStep("");
        
        // Enhanced mock data based on user mode
        const enhancedAnalysis = {
          ...MOCK_ANALYSIS,
          companyName: conversationState.company,
          sentiment: Math.random() > 0.3 ? 'Bullish' : 'Neutral',
          userMode: userMode,
          financials: {
            revenue: `$${(Math.random() * 50 + 5).toFixed(1)}B`,
            growth: `+${(Math.random() * 20 + 5).toFixed(1)}%`,
            margin: `${(Math.random() * 15 + 10).toFixed(1)}%`,
            cashFlow: `$${(Math.random() * 8 + 1).toFixed(1)}B`
          }
        };

        // Add mode-specific data
        if (userMode === 'job-seeker') {
          enhancedAnalysis.salaryRange = `$${(Math.random() * 100 + 80).toFixed(0)}K`;
          enhancedAnalysis.cultureScore = (Math.random() * 1 + 4).toFixed(1);
          enhancedAnalysis.remoteWork = `${Math.floor(Math.random() * 60 + 20)}%`;
          enhancedAnalysis.hiringStatus = Math.random() > 0.5 ? 'Active Hiring' : 'Selective Hiring';
          enhancedAnalysis.openPositions = [
            { title: 'Senior Software Engineer', location: 'San Francisco, CA', salary: '$150K - $200K', type: 'Full-time', level: 'Senior' },
            { title: 'Product Manager', location: 'Remote', salary: '$130K - $170K', type: 'Full-time', level: 'Mid' },
            { title: 'Data Scientist', location: 'New York, NY', salary: '$140K - $180K', type: 'Full-time', level: 'Senior' },
            { title: 'Marketing Specialist', location: 'Austin, TX', salary: '$90K - $120K', type: 'Full-time', level: 'Junior' }
          ];
        } else if (userMode === 'investor') {
          enhancedAnalysis.peRatio = (Math.random() * 20 + 15).toFixed(1);
          enhancedAnalysis.marketCap = `$${(Math.random() * 3 + 0.5).toFixed(1)}T`;
          enhancedAnalysis.dividendYield = `${(Math.random() * 3 + 0.5).toFixed(2)}%`;
          enhancedAnalysis.stockPerformance = `+${(Math.random() * 30 + 5).toFixed(1)}% YTD`;
        }

        setAnalysis(enhancedAnalysis);
        setConversationState({ stage: 'IDLE', company: null, purpose: null });
        
        return {
          text: `I've completed the **${purpose}** analysis for ${conversationState.company}. The dashboard has been updated with detailed ${userMode === 'job-seeker' ? 'career' : userMode === 'investor' ? 'investment' : 'business'} insights.`,
          options: ["Analyze Another Company", "Deeper Dive Analysis", "Compare with Competitors", "Export Report"]
        };
      }
      
      // Fallback
      return { text: "I can help you analyze companies for business intelligence, career research, or investment analysis. Name a company to begin." };
    }

    // 2. Real Gemini API (Using JSON Mode for Options)
    try {
      setLoadingStep("Consulting AI Analyst...");
      
      const systemPrompt = `
# COMPANY INTELLIGENCE AGENT - PROFESSIONAL ANALYSIS PROTOCOL

## ROLE & CONTEXT
You are an expert AI business intelligence analyst with deep expertise in:
- Financial analysis and market research
- Company culture and employment analytics  
- Investment analysis and valuation
- Competitive intelligence and strategic positioning

## USER MODE CONTEXT
Current Analysis Mode: ${userMode}
- GENERAL: Comprehensive business intelligence
- JOB-SEEKER: Career-focused company research
- INVESTOR: Financial and market analysis

## RESPONSE PROTOCOL

### MULTI-TURN CONVERSATION FLOW
1. **Initial Company Query**: If user provides only a company name, ask clarifying questions about their specific interests
2. **Follow-up Questions**: Gather necessary details (timeframe, department, focus area)
3. **Analysis Generation**: When sufficient information is gathered, provide comprehensive analysis

### ANALYSIS FRAMEWORK REQUIREMENTS
For ALL analysis responses, you MUST return structured JSON with the following format:

{
  "chatResponse": "Engaging text summary of findings (2-3 paragraphs)",
  "options": ["Relevant follow-up questions or actions"],
  "dashboardData": {
    "companyName": "Company Name",
    "ticker": "Stock Symbol if available",
    "sentiment": "Bullish/Neutral/Bearish",
    "summary": "Executive summary (3-4 sentences)",
    "financials": {
      "revenue": "$X.XXB",
      "growth": "+XX.X%",
      "margin": "XX.X%",
      "cashFlow": "$X.XXB"
    },
    "swot": {
      "strengths": ["Strength 1", "Strength 2", "Strength 3"],
      "weaknesses": ["Weakness 1", "Weakness 2"],
      "opportunities": ["Opportunity 1", "Opportunity 2"],
      "threats": ["Threat 1", "Threat 2"]
    },
    "userMode": "${userMode}",
    ${userMode === 'job-seeker' ? `
    "salaryRange": "$XXXK",
    "cultureScore": "X.X/5",
    "remoteWork": "XX%",
    "hiringStatus": "Active/Selective Hiring",
    "openPositions": [
      {"title": "Position 1", "location": "Location", "salary": "Salary", "type": "Full-time", "level": "Senior/Mid/Junior"}
    ],
    ` : userMode === 'investor' ? `
    "peRatio": "XX.X",
    "marketCap": "$X.XXT", 
    "dividendYield": "X.XX%",
    "stockPerformance": "+XX.X% YTD",
    ` : ''}
    "competitors": [
      {"name": "Competitor 1", "share": XX},
      {"name": "Competitor 2", "share": XX}
    ]
  }
}

### MODE-SPECIFIC ANALYSIS FOCUS

#### GENERAL BUSINESS ANALYSIS
- Market position and competitive landscape
- Financial performance and growth trajectory  
- Operational efficiency and business model
- Industry trends and strategic positioning

#### JOB-SEEKER ANALYSIS
- Company culture and values assessment
- Compensation benchmarks and benefits
- Career growth opportunities and promotion paths
- Work-life balance and employee satisfaction
- Team structure and management quality
- Open positions and hiring status

#### INVESTOR ANALYSIS  
- Financial metrics and valuation assessment
- Growth potential and market opportunities
- Risk factors and competitive threats
- Management quality and strategic direction
- Dividend history and shareholder returns
- Stock performance and market sentiment

### DATA QUALITY STANDARDS
- Use realistic, plausible numbers based on company size and industry
- Provide balanced analysis with both strengths and concerns
- Include specific, actionable insights
- Maintain professional, data-driven tone
- Support conclusions with logical reasoning

### RESPONSE GUIDELINES
- ALWAYS return valid JSON - no markdown, no extra text
- For incomplete information: ask clarifying questions using "options" field
- For complete analysis: provide full "dashboardData" with comprehensive insights
- Use industry-standard terminology appropriate for the user mode
- Include 2-4 relevant follow-up options in every response

### EXAMPLE RESPONSES

Example for job-seeker mode:
{
  "chatResponse": "Based on my analysis of Google's career opportunities, the company offers competitive compensation with senior engineering roles averaging $180K-$250K. The culture emphasizes innovation and work-life balance, with 4.2/5 employee satisfaction. Remote work options are available for 60% of positions, and current hiring focuses on AI/ML and cloud engineering roles.",
  "options": ["Compare with Microsoft", "View engineering roles", "Analyze promotion paths", "Research team culture"],
  "dashboardData": {
    "companyName": "Google",
    "ticker": "GOOGL",
    "sentiment": "Bullish",
    "summary": "Google maintains strong employer branding with competitive compensation, excellent benefits, and focus on innovation. The company is actively hiring in technical roles with emphasis on AI and cloud technologies.",
    "financials": {
      "revenue": "$282.8B",
      "growth": "+14.6%", 
      "margin": "25.3%",
      "cashFlow": "$91.5B"
    },
    "swot": {
      "strengths": ["Innovation culture", "Competitive compensation", "Strong brand reputation", "Career growth opportunities"],
      "weaknesses": ["Large company bureaucracy", "Work-life balance challenges", "High expectations"],
      "opportunities": ["AI leadership roles", "Remote work expansion", "Cross-team mobility"],
      "threats": ["Market competition for talent", "Regulatory scrutiny", "Economic uncertainty"]
    },
    "userMode": "job-seeker",
    "salaryRange": "$180K",
    "cultureScore": "4.2/5",
    "remoteWork": "60%",
    "hiringStatus": "Active Hiring",
    "openPositions": [
      {"title": "Senior AI Engineer", "location": "Mountain View, CA", "salary": "$200K - $280K", "type": "Full-time", "level": "Senior"},
      {"title": "Cloud Solutions Architect", "location": "Remote", "salary": "$180K - $240K", "type": "Full-time", "level": "Senior"},
      {"title": "Product Manager", "location": "New York, NY", "salary": "$150K - $220K", "type": "Full-time", "level": "Mid"}
    ],
    "competitors": [
      {"name": "Microsoft", "share": 25},
      {"name": "Amazon", "share": 20},
      {"name": "Meta", "share": 15}
    ]
  }
}

Example for investor mode:
{
  "chatResponse": "Microsoft demonstrates strong financial performance with Q3 revenue growth of 15.3% driven by cloud services. The company maintains healthy margins at 41.8% and shows consistent dividend growth. With a P/E ratio of 28.5 and $65B in cash reserves, the stock presents a solid long-term investment opportunity in the enterprise software and cloud computing space.",
  "options": ["Compare with Amazon AWS", "Analyze dividend history", "Review risk factors", "Export investment report"],
  "dashboardData": {
    "companyName": "Microsoft Corporation",
    "ticker": "MSFT",
    "sentiment": "Bullish",
    "summary": "Microsoft shows robust cloud revenue growth and maintains enterprise software dominance. Strong balance sheet with consistent dividend increases and strategic AI investments position the company for sustained growth.",
    "financials": {
      "revenue": "$218.4B",
      "growth": "+15.3%", 
      "margin": "41.8%",
      "cashFlow": "$76.2B"
    },
    "swot": {
      "strengths": ["Azure cloud leadership", "Enterprise software dominance", "Strong balance sheet", "AI integration capabilities"],
      "weaknesses": ["Regulatory scrutiny", "Slower consumer segment growth", "Dependence on enterprise spending"],
      "opportunities": ["AI-powered productivity tools", "Cloud market expansion", "Gaming and metaverse initiatives"],
      "threats": ["Intense cloud competition", "Economic downturn impacting enterprise IT", "Open-source alternatives"]
    },
    "userMode": "investor",
    "peRatio": "28.5",
    "marketCap": "$3.1T", 
    "dividendYield": "0.71%",
    "stockPerformance": "+18.2% YTD",
    "competitors": [
      {"name": "Amazon AWS", "share": 33},
      {"name": "Google Cloud", "share": 22},
      {"name": "Oracle", "share": 8}
    ]
  }
}

## CURRENT QUERY CONTEXT
Previous Analysis: ${analysis ? JSON.stringify(analysis) : 'None'}
User Query: "${userQuery}"
User Mode: ${userMode}

Now, provide your analysis in the specified JSON format:
`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: { 
            responseMimeType: "application/json",
            temperature: 0.2, // Lower temperature for more consistent responses
            topK: 40,
            topP: 0.8
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setLoadingStep("");

      if (text) {
        try {
          const parsed = JSON.parse(text);
          if (parsed.dashboardData) {
            // Ensure user mode is preserved and add any missing mode-specific fields
            parsed.dashboardData.userMode = userMode;
            setAnalysis(parsed.dashboardData);
          }
          return { 
            text: parsed.chatResponse, 
            options: parsed.options || ["Ask another question", "Analyze different company"] 
          };
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          return { 
            text: "I encountered an issue processing the analysis. Please try again with a more specific query.",
            options: ["Try again", "Analyze different company"]
          };
        }
      }
      
      return { 
        text: "I couldn't generate a proper analysis. Please try rephrasing your question.",
        options: ["Try again", "Get help with query format"]
      };

    } catch (error) {
      console.error('API Error:', error);
      setLoadingStep("");
      return { 
        text: "I'm having trouble connecting to the analysis service. Please check your API key or try again later.",
        options: ["Retry connection", "Use demo mode", "Check settings"]
      };
    }
  };

  const handleSend = async (e, manualText = null) => {
    if (e) e.preventDefault();
    const textToSend = manualText || inputValue;
    if (!textToSend.trim()) return;

    // Add User Message
    const userMsg = { id: Date.now(), role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Get Bot Response
    const response = await generateResponse(textToSend);
    
    setIsTyping(false);
    setMessages(prev => [
      ...prev, 
      { 
        id: Date.now() + 1, 
        role: 'bot', 
        content: response.text,
        options: response.options 
      }
    ]);
  };

  // Function to render the appropriate right panel based on user mode
  const renderRightPanel = () => {
    switch (userMode) {
      case 'job-seeker':
        return (
          <JobSeekerPanel 
            analysis={analysis} 
            onReset={() => setAnalysis(null)} 
            onQuickStart={handleQuickStart}
          />
        );
      case 'investor':
        return (
          <InvestorPanel 
            analysis={analysis} 
            onReset={() => setAnalysis(null)} 
            onQuickStart={handleQuickStart}
          />
        );
      case 'general':
      default:
        return (
          <RightPanel 
            analysis={analysis} 
            onReset={() => setAnalysis(null)} 
            onQuickStart={handleQuickStart}
            userMode={userMode}
          />
        );
    }
  };

  // Simplified SettingsModal that doesn't show API key input
  const SimpleSettingsModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              API Status: <span className="text-green-600 font-medium">Connected</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Using Gemini API for real-time company analysis
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100 overflow-hidden">
      <LeftPanel
        apiKey={apiKey}
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isTyping={isTyping}
        loadingStep={loadingStep}
        messagesEndRef={messagesEndRef}
        onSend={handleSend}
        onOptionSelect={handleOptionSelect}
        onSettingsClick={() => setShowSettings(true)}
        userMode={userMode}
        setUserMode={setUserMode}
      />
      
      {renderRightPanel()}

      {showSettings && (
        <SimpleSettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}