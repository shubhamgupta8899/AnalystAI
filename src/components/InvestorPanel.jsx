import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Globe, 
  ShieldCheck,
  BarChart3,
  Target,
  Clock,
  Building2,
  Zap,
  Users,
  Award
} from 'lucide-react';

const InvestorPanel = ({ analysis, onReset }) => {
  if (!analysis) {
    return (
      <div className="flex flex-1 flex-col bg-gradient-to-br from-purple-50 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/10 overflow-hidden">
        <InvestorEmptyState />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-br from-purple-50 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/10 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-right-4 duration-500">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg border border-purple-200 dark:border-purple-800 font-bold text-2xl text-white">
                {analysis.ticker?.[0] || analysis.companyName?.[0] || "C"}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
                  {analysis.companyName}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-mono bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-lg text-xs font-medium">
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
                    {analysis.sentiment || 'Neutral'} Outlook
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={onReset} 
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-200 text-sm font-medium"
            >
              <Clock className="w-4 h-4" /> 
              <span className="hidden sm:inline">New Analysis</span>
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
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
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Financial Metrics */}
          <div className="xl:col-span-2 space-y-6">
            {/* Financial Performance */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                Financial Performance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                  label="Revenue" 
                  value={analysis.financials?.revenue || "$385B"} 
                  trend="+12.5%"
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
                  icon={TrendingUp}
                />
                <MetricCard 
                  label="Market Cap" 
                  value="$2.1T"
                  icon={Globe}
                />
              </div>
            </div>

            {/* Investment Summary */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Investment Summary
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
                {analysis.summary || "Strong financial performance with consistent revenue growth and market leadership position."}
              </p>
              <div className="flex flex-wrap gap-2">
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
              </div>
            </div>
          </div>

          {/* Right Column - Risk & Analysis */}
          <div className="xl:col-span-1 space-y-6">
            {/* Risk Assessment */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                Risk Assessment
              </h3>
              <div className="space-y-4">
                <RiskItem 
                  title="Market Risk" 
                  level="Low" 
                  color="green" 
                />
                <RiskItem 
                  title="Competition Risk" 
                  level="Medium" 
                  color="yellow" 
                />
                <RiskItem 
                  title="Regulatory Risk" 
                  level="Low" 
                  color="green" 
                />
                <RiskItem 
                  title="Technology Risk" 
                  level="Medium" 
                  color="yellow" 
                />
              </div>
            </div>

            {/* Investment Recommendation */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Recommendation
              </h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  BUY
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Strong long-term growth potential with moderate risk
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InvestorEmptyState = () => (
  <div className="flex-1 overflow-y-auto">
    <div className="max-w-4xl mx-auto p-8 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6 mx-auto">
        <TrendingUp className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-br from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 bg-clip-text text-transparent mb-4">
        Investment Intelligence
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        AI-powered insights for smarter investment decisions and portfolio growth
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <FeatureCard
          icon={DollarSign}
          title="Financial Analysis"
          description="Detailed financial metrics and performance trends"
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Risk Assessment"
          description="Comprehensive risk analysis and mitigation"
        />
        <FeatureCard
          icon={Target}
          title="Market Insights"
          description="Industry trends and competitive positioning"
        />
      </div>
    </div>
  </div>
);

const MetricCard = ({ label, value, trend, icon: Icon }) => (
  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
      <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
        <Icon className="w-4 h-4 text-purple-500" />
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

const RiskItem = ({ title, level, color }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-600 dark:text-gray-300">{title}</span>
    <span className={`text-sm font-semibold px-2 py-1 rounded ${
      color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
      color === 'yellow' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    }`}>
      {level}
    </span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

export default InvestorPanel;