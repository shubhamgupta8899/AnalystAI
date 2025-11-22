import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  RefreshCw, 
  Sparkles, 
  Building2,
  DollarSign,
  PieChart,
  Briefcase,
  Globe,
  Search,
  Zap,
  Target,
  Users,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Heart,
  Star,
  MapPin,
  Calendar,
  GraduationCap,
  Wallet,
  ShieldCheck,
  Coffee
} from 'lucide-react';

const RightPanel = ({ analysis, onReset, onQuickStart, userMode = 'general' }) => {
  if (!analysis) {
    return (
      <div className="flex flex-1 flex-col  from-slate-50 via-blue-50/20 to-purple-50/10 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/5 overflow-hidden">
        <EnhancedEmptyState onQuickStart={onQuickStart} userMode={userMode} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col  from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-right-4 duration-500">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16  from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg border border-blue-200 dark:border-blue-800 font-bold text-2xl text-white">
                {analysis.ticker?.[0] || analysis.companyName?.[0] || "C"}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
                  {analysis.companyName}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg text-xs font-medium">
                    {analysis.ticker}
                  </span>
                  <span className="hidden sm:inline text-gray-400">•</span>
                  <span className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${
                    analysis.sentiment?.toLowerCase() === 'bullish' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                      : analysis.sentiment?.toLowerCase() === 'bearish'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    <TrendingUp className={`w-3.5 h-3.5 ${
                      analysis.sentiment?.toLowerCase() === 'bullish' ? '' : 
                      analysis.sentiment?.toLowerCase() === 'bearish' ? 'rotate-180' : ''
                    }`} />
                    {analysis.sentiment || 'Neutral'} {userMode === 'investor' ? 'Outlook' : 'Sentiment'}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={onReset} 
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-200 text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" /> 
              <span className="hidden sm:inline">New Analysis</span>
            </button>
          </div>

          {/* Mode-specific Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {userMode === 'job-seeker' ? (
              <>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs font-medium text-gray-500">Rating</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">4.2/5</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-medium text-gray-500">Avg Salary</span>
                  </div>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                    ${analysis.salaryRange || "125K"}
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-medium text-gray-500">Culture</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">Great</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium text-gray-500">Locations</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">Global</p>
                </div>
              </>
            ) : userMode === 'investor' ? (
              <>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-medium text-gray-500">Growth</span>
                  </div>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                    {analysis.financials?.growth || "+12.5%"}
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium text-gray-500">P/E Ratio</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">24.5</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-medium text-gray-500">Stability</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">High</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-medium text-gray-500">Market Cap</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">$2.1T</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium text-gray-500">Sector</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">Technology</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-medium text-gray-500">Growth</span>
                  </div>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                    {analysis.financials?.growth || "+12.5%"}
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-medium text-gray-500">Stability</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">High</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-medium text-gray-500">Global Rank</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">#42</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Metrics & Summary */}
          <div className="xl:col-span-2 space-y-6 lg:space-y-8">
            {/* Key Metrics */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                {userMode === 'job-seeker' ? 'Career & Culture Metrics' : 
                 userMode === 'investor' ? 'Financial Performance' : 
                 'Business Performance'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {userMode === 'job-seeker' ? (
                  <>
                    <MetricCard 
                      label="Avg Salary" 
                      value={analysis.salaryRange || "$125K"} 
                      trend="+8% YoY"
                      icon={Wallet}
                    />
                    <MetricCard 
                      label="Culture Score" 
                      value="4.2/5"
                      icon={Heart}
                    />
                    <MetricCard 
                      label="Remote Work" 
                      value="80%"
                      icon={Coffee}
                    />
                    <MetricCard 
                      label="Growth Rate" 
                      value="15%"
                      icon={TrendingUp}
                    />
                  </>
                ) : userMode === 'investor' ? (
                  <>
                    <MetricCard 
                      label="Revenue" 
                      value={analysis.financials?.revenue} 
                      trend={analysis.financials?.growth}
                      icon={DollarSign}
                    />
                    <MetricCard 
                      label="P/E Ratio" 
                      value="24.5"
                      icon={PieChart}
                    />
                    <MetricCard 
                      label="Dividend" 
                      value="2.1%"
                      icon={Briefcase}
                    />
                    <MetricCard 
                      label="Market Cap" 
                      value="$2.1T"
                      icon={Globe}
                    />
                  </>
                ) : (
                  <>
                    <MetricCard 
                      label="Revenue" 
                      value={analysis.financials?.revenue} 
                      trend={analysis.financials?.growth}
                      icon={DollarSign}
                    />
                    <MetricCard 
                      label="Op. Margin" 
                      value={analysis.financials?.margin}
                      icon={PieChart}
                    />
                    <MetricCard 
                      label="Cash Flow" 
                      value={analysis.financials?.cashFlow}
                      icon={Briefcase}
                    />
                    <MetricCard 
                      label="Market Share" 
                      value="High"
                      icon={Globe}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                {userMode === 'job-seeker' ? 'Career Opportunity Summary' : 
                 userMode === 'investor' ? 'Investment Summary' : 
                 'Executive Summary'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                {analysis.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {userMode === 'job-seeker' ? (
                  <>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                      Great Culture
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                      Remote Friendly
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                      Career Growth
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full">
                      Learning Opportunities
                    </span>
                  </>
                ) : userMode === 'investor' ? (
                  <>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                      Strong Growth
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                      Market Leader
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                      Stable Dividend
                    </span>
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full">
                      Innovation Focus
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                      Market Leader
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                      Growth Phase
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                      Innovation Focus
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - SWOT Analysis */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="w-5 h-5 from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {userMode === 'job-seeker' ? 'J' : userMode === 'investor' ? 'I' : 'S'}
                  </span>
                </div>
                {userMode === 'job-seeker' ? 'Career Assessment' : 
                 userMode === 'investor' ? 'Investment Analysis' : 
                 'SWOT Analysis'}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <SwotSection 
                  type={userMode === 'job-seeker' ? "Pros" : "Strengths"} 
                  items={analysis.swot?.strengths || []} 
                  color="bg-gradient-to-br from-green-50 to-emerald-50 text-green-800 border-green-200 dark:from-green-900/20 dark:to-emerald-900/10 dark:text-green-200 dark:border-green-800/30"
                  icon={userMode === 'job-seeker' ? "👍" : "💪"}
                />
                <SwotSection 
                  type={userMode === 'job-seeker' ? "Cons" : "Weaknesses"} 
                  items={analysis.swot?.weaknesses || []} 
                  color="bg-gradient-to-br from-red-50 to-orange-50 text-red-800 border-red-200 dark:from-red-900/20 dark:to-orange-900/10 dark:text-red-200 dark:border-red-800/30"
                  icon={userMode === 'job-seeker' ? "👎" : "⚠️"}
                />
                <SwotSection 
                  type={userMode === 'job-seeker' ? "Opportunities" : "Opportunities"} 
                  items={analysis.swot?.opportunities || []} 
                  color="bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-800 border-blue-200 dark:from-blue-900/20 dark:to-cyan-900/10 dark:text-blue-200 dark:border-blue-800/30"
                  icon={userMode === 'job-seeker' ? "🚀" : "📈"}
                />
                <SwotSection 
                  type={userMode === 'job-seeker' ? "Considerations" : "Threats"} 
                  items={analysis.swot?.threats || []} 
                  color="bg-gradient-to-br from-amber-50 to-yellow-50 text-amber-800 border-amber-200 dark:from-amber-900/20 dark:to-yellow-900/10 dark:text-amber-200 dark:border-amber-800/30"
                  icon={userMode === 'job-seeker' ? "🤔" : "🌪️"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnhancedEmptyState = ({ onQuickStart, userMode = 'general' }) => {
  const quickActions = {
    'general': [
      {
        title: "Company Research",
        description: "Get comprehensive business intelligence and market analysis",
        icon: Building2,
        color: "from-blue-500 to-cyan-600",
        examples: ["Apple Inc. analysis", "Tech industry overview", "Competitive landscape"]
      },
      {
        title: "Financial Analysis",
        description: "Detailed financial statements and performance metrics",
        icon: DollarSign,
        color: "from-green-500 to-emerald-600",
        examples: ["Revenue trends", "Profit margins", "Cash flow analysis"]
      },
      {
        title: "Market Intelligence",
        description: "Industry trends and competitive positioning",
        icon: Target,
        color: "from-purple-500 to-pink-600",
        examples: ["Market size", "Growth projections", "Competitor analysis"]
      },
      {
        title: "Strategic Insights",
        description: "SWOT analysis and strategic recommendations",
        icon: Zap,
        color: "from-orange-500 to-red-600",
        examples: ["Business strategy", "Growth opportunities", "Risk assessment"]
      }
    ],
    'job-seeker': [
      {
        title: "Company Culture",
        description: "Research work environment and employee satisfaction",
        icon: Heart,
        color: "from-pink-500 to-rose-600",
        examples: ["Work-life balance", "Team culture", "Management style"]
      },
      {
        title: "Salary Research",
        description: "Compare compensation and benefits packages",
        icon: Wallet,
        color: "from-green-500 to-emerald-600",
        examples: ["Salary ranges", "Bonus structure", "Stock options"]
      },
      {
        title: "Career Growth",
        description: "Understand promotion paths and skill development",
        icon: GraduationCap,
        color: "from-blue-500 to-cyan-600",
        examples: ["Promotion timeline", "Learning opportunities", "Career paths"]
      },
      {
        title: "Team & Role",
        description: "Research specific teams and role expectations",
        icon: Users,
        color: "from-purple-500 to-pink-600",
        examples: ["Team structure", "Role responsibilities", "Technical stack"]
      }
    ],
    'investor': [
      {
        title: "Financial Performance",
        description: "Analyze financial metrics and growth trends",
        icon: DollarSign,
        color: "from-green-500 to-emerald-600",
        examples: ["Revenue growth", "Profitability", "Cash flow"]
      },
      {
        title: "Valuation Analysis",
        description: "Evaluate company valuation and stock performance",
        icon: TrendingUp,
        color: "from-blue-500 to-cyan-600",
        examples: ["P/E ratios", "Market cap", "Stock trends"]
      },
      {
        title: "Risk Assessment",
        description: "Identify investment risks and opportunities",
        icon: Shield,
        color: "from-orange-500 to-red-600",
        examples: ["Market risks", "Competition", "Regulatory factors"]
      },
      {
        title: "Industry Outlook",
        description: "Understand market trends and growth potential",
        icon: Globe,
        color: "from-purple-500 to-pink-600",
        examples: ["Market size", "Growth rate", "Industry trends"]
      }
    ]
  };

  const popularCompanies = {
    'general': [
      { name: "Apple Inc.", ticker: "AAPL", industry: "Technology" },
      { name: "Microsoft", ticker: "MSFT", industry: "Software" },
      { name: "Amazon", ticker: "AMZN", industry: "E-commerce" },
      { name: "Google (Alphabet)", ticker: "GOOGL", industry: "Technology" },
      { name: "Tesla", ticker: "TSLA", industry: "Automotive" },
      { name: "Netflix", ticker: "NFLX", industry: "Entertainment" }
    ],
    'job-seeker': [
      { name: "Google", ticker: "GOOGL", industry: "Great Culture" },
      { name: "Microsoft", ticker: "MSFT", industry: "Work-Life Balance" },
      { name: "Salesforce", ticker: "CRM", industry: "Employee Benefits" },
      { name: "HubSpot", ticker: "HUBS", industry: "Career Growth" },
      { name: "Adobe", ticker: "ADBE", industry: "Learning Culture" },
      { name: "Zoom", ticker: "ZM", industry: "Remote Work" }
    ],
    'investor': [
      { name: "Apple Inc.", ticker: "AAPL", industry: "Stable Growth" },
      { name: "Microsoft", ticker: "MSFT", industry: "Dividend Stock" },
      { name: "Amazon", ticker: "AMZN", industry: "Growth Potential" },
      { name: "NVIDIA", ticker: "NVDA", industry: "High Growth" },
      { name: "Visa", ticker: "V", industry: "Stable Returns" },
      { name: "Johnson & Johnson", ticker: "JNJ", industry: "Defensive Stock" }
    ]
  };

  const modeTitles = {
    'general': "Company Intelligence",
    'job-seeker': "Career Intelligence",
    'investor': "Investment Intelligence"
  };

  const modeDescriptions = {
    'general': "AI-powered insights for smarter business decisions and market analysis",
    'job-seeker': "AI-powered insights for smarter career moves and job opportunities",
    'investor': "AI-powered insights for smarter investment decisions and portfolio growth"
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 lg:w-32 lg:h-32 from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mb-4 mx-auto">
              {userMode === 'job-seeker' ? (
                <Briefcase className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
              ) : userMode === 'investor' ? (
                <TrendingUp className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
              ) : (
                <BarChart3 className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
              )}
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent mb-4">
            {modeTitles[userMode]}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {modeDescriptions[userMode]}
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8 lg:mb-12">
            {userMode === 'job-seeker' ? 'What career information do you need?' :
             userMode === 'investor' ? 'What investment insights are you looking for?' :
             'What would you like to analyze?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {quickActions[userMode].map((action, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => onQuickStart && onQuickStart(action.title)}
              >
                <div className={`w-12 h-12  ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {action.description}
                </p>
                <div className="space-y-1">
                  {action.examples.map((example, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <ArrowRight className="w-3 h-3" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Companies */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8 lg:mb-12">
            {userMode === 'job-seeker' ? 'Top Companies to Research' :
             userMode === 'investor' ? 'Popular Investment Opportunities' :
             'Popular Companies to Analyze'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {popularCompanies[userMode].map((company, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => onQuickStart && onQuickStart(company.name)}
              >
                <div className="w-10 h-10 from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">
                    {company.name[0]}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate">
                  {company.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                    {company.ticker}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {company.industry}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className=" from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 lg:p-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8 lg:mb-12">
            {userMode === 'job-seeker' ? 'Why Use Our Career Analyst?' :
             userMode === 'investor' ? 'Why Use Our Investment Analyst?' :
             'Why Use Our AI Analyst?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <FeatureCard
              icon={Clock}
              title="Real-time Data"
              description={userMode === 'job-seeker' ? "Latest salary data and company reviews updated daily" :
                         userMode === 'investor' ? "Live market data and financial metrics in real-time" :
                         "Latest financial metrics and market data updated in real-time"}
            />
            <FeatureCard
              icon={Shield}
              title="Accurate Analysis"
              description={userMode === 'job-seeker' ? "AI-powered insights with verified company data" :
                         userMode === 'investor' ? "95% accuracy in financial predictions and trends" :
                         "AI-powered insights with 95% accuracy in business predictions"}
            />
            <FeatureCard
              icon={Users}
              title="Expert Methodology"
              description={userMode === 'job-seeker' ? "Combines HR insights with modern AI analysis" :
                         userMode === 'investor' ? "Wall Street analysis techniques with AI algorithms" :
                         "Combines industry expertise with modern AI analysis"}
            />
            <FeatureCard
              icon={Award}
              title="Trusted by Professionals"
              description={userMode === 'job-seeker' ? "Used by job seekers and career coaches worldwide" :
                         userMode === 'investor' ? "Trusted by investors and financial advisors globally" :
                         "Used by business leaders and analysts worldwide"}
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8 lg:p-12 shadow-sm">
            <Search className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              {userMode === 'job-seeker' ? 
                "Start a conversation with our AI career analyst to get comprehensive company insights and career guidance." :
               userMode === 'investor' ?
                "Start a conversation with our AI investment analyst to get detailed financial analysis and market insights." :
                "Start a conversation with our AI analyst to get comprehensive company insights and strategic recommendations."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => onQuickStart && onQuickStart(
                  userMode === 'job-seeker' ? "Company Culture" :
                  userMode === 'investor' ? "Financial Performance" :
                  "Financial Analysis"
                )}
                className="px-8 py-4 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <Zap className="w-5 h-5" />
                {userMode === 'job-seeker' ? "Start Career Research" :
                 userMode === 'investor' ? "Start Investment Analysis" :
                 "Start Company Analysis"}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500 font-semibold rounded-xl transition-all duration-300">
                View Sample Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="text-center group">
    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
      <Icon className="w-8 h-8 text-blue-500" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

// Simple MetricCard component for the analysis view
const MetricCard = ({ label, value, trend, icon: Icon }) => (
  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <Icon className="w-4 h-4 text-blue-500" />
      </div>
    </div>
    <div className="flex items-end justify-between">
      <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
      {trend && (
        <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
          <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />
          <span className="text-xs font-semibold text-green-600 dark:text-green-400">{trend}</span>
        </div>
      )}
    </div>
  </div>
);

// Simple SwotSection component for the analysis view
const SwotSection = ({ type, items, color, icon = "•" }) => (
  <div className={`p-4 rounded-xl border-2 ${color} backdrop-blur-sm`}>
    <div className="flex items-center gap-2 mb-3">
      <span className="text-base">{icon}</span>
      <h4 className="text-sm font-bold uppercase tracking-wide opacity-90">{type}</h4>
    </div>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-sm flex items-start gap-2">
          <span className="w-1.5 h-1.5 bg-current rounded-full mt-2 opacity-60 " />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default RightPanel;