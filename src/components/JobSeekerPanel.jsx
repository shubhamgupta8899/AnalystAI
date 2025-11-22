import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Users, 
  Star, 
  Heart, 
  Clock,
  GraduationCap,
  Target,
  TrendingUp,
  Shield,
  Coffee,
  Building2,
  Award,
  Calendar
} from 'lucide-react';

const JobSeekerPanel = ({ analysis, onReset }) => {
  if (!analysis) {
    return (
      <div className="flex flex-1 flex-col bg-gradient-to-br from-green-50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10 overflow-hidden">
        <JobSeekerEmptyState />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-br from-green-50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-right-4 duration-500">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg border border-green-200 dark:border-green-800 font-bold text-2xl text-white">
                {analysis.companyName?.[0] || "C"}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
                  {analysis.companyName}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-mono bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg text-xs font-medium">
                    Careers
                  </span>
                  <span className="hidden sm:inline text-gray-400">•</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {analysis.hiringStatus || 'Active Hiring'}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={onReset} 
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-200 text-sm font-medium"
            >
              <Clock className="w-4 h-4" /> 
              <span className="hidden sm:inline">New Search</span>
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-medium text-gray-500">Rating</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">4.2/5</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
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
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Job Details */}
          <div className="xl:col-span-2 space-y-6">
            {/* Open Positions */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-green-500" />
                Open Positions & Roles
              </h3>
              <div className="space-y-4">
                {analysis.openPositions?.map((position, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{position.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {position.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      position.level === 'Senior' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                        : position.level === 'Mid'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {position.level}
                    </span>
                  </div>
                )) || (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No specific positions data available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Company Culture & Benefits */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Company Culture & Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Culture Highlights
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">• Collaborative environment</li>
                    <li className="flex items-center gap-2">• Innovation-focused</li>
                    <li className="flex items-center gap-2">• Work-life balance</li>
                    <li className="flex items-center gap-2">• Diversity & inclusion</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-500" />
                    Benefits & Perks
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">• Health insurance</li>
                    <li className="flex items-center gap-2">• Remote work options</li>
                    <li className="flex items-center gap-2">• Learning budget</li>
                    <li className="flex items-center gap-2">• Stock options</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Career Assessment */}
          <div className="xl:col-span-1 space-y-6">
            {/* Career Growth */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Career Growth
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Promotion Speed</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Fast</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Skill Development</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Excellent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Mentorship</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Available</span>
                </div>
              </div>
            </div>

            {/* Quick Assessment */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Quick Assessment
              </h3>
              <div className="space-y-4">
                <AssessmentItem 
                  title="Technical Roles" 
                  value="High" 
                  color="green" 
                />
                <AssessmentItem 
                  title="Non-Technical Roles" 
                  value="Medium" 
                  color="blue" 
                />
                <AssessmentItem 
                  title="Remote Work" 
                  value="80%" 
                  color="purple" 
                />
                <AssessmentItem 
                  title="Work-Life Balance" 
                  value="Great" 
                  color="green" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobSeekerEmptyState = () => (
  <div className="flex-1 overflow-y-auto">
    <div className="max-w-4xl mx-auto p-8 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6 mx-auto">
        <Briefcase className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-br from-gray-900 to-green-600 dark:from-white dark:to-green-400 bg-clip-text text-transparent mb-4">
        Career Intelligence
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        AI-powered insights for smarter career moves and job opportunities
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <FeatureCard
          icon={DollarSign}
          title="Salary Insights"
          description="Compare compensation and benefits across roles"
        />
        <FeatureCard
          icon={Heart}
          title="Culture Fit"
          description="Understand company culture and work environment"
        />
        <FeatureCard
          icon={TrendingUp}
          title="Career Growth"
          description="Identify growth opportunities and career paths"
        />
      </div>
    </div>
  </div>
);

const AssessmentItem = ({ title, value, color }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-600 dark:text-gray-300">{title}</span>
    <span className={`text-sm font-semibold px-2 py-1 rounded ${
      color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
      color === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
    }`}>
      {value}
    </span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

export default JobSeekerPanel;