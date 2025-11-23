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
  Calendar,
  Search,
  Zap,
  ArrowRight,
  Globe,
  UserCheck,
  Lightbulb,
  Rocket,
  BookOpen,
  ShieldCheck,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  Loader2
} from 'lucide-react';

const JobSeekerPanel = ({ analysis, onReset, onQuickStart, isLoading = false }) => {
  if (!analysis && !isLoading) {
    return (
      <div className="flex flex-1 flex-col min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/20 to-teal-50/10 dark:from-green-900/20 dark:via-emerald-900/10 dark:to-teal-900/5 overflow-hidden">
        <JobSeekerEmptyState onQuickStart={onQuickStart} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/20 to-teal-50/10 dark:from-green-900/20 dark:via-emerald-900/10 dark:to-teal-900/5 overflow-hidden">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-gradient-to-br from-green-50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10 overflow-hidden">
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
                  {analysis.companyName || "Company Analysis"}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-mono bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg text-xs font-medium">
                    Careers
                  </span>
                  <span className="hidden sm:inline text-gray-400">•</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {analysis.hiringStatus || analysis.hiring?.status || 'Active Hiring'}
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
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                {analysis.rating || analysis.companyRating || "4.2"}/5
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-gray-500">Avg Salary</span>
              </div>
              <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                ${analysis.salaryRange || analysis.averageSalary || "125K"}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-xs font-medium text-gray-500">Culture</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                {analysis.cultureScore || "Great"}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium text-gray-500">Locations</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                {analysis.locations?.length || analysis.globalPresence || "Global"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Job Details */}
          <div className="xl:col-span-2 space-y-6">
            {/* Open Positions */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-green-500" />
                Open Positions & Roles
              </h3>
              <div className="space-y-4">
                {analysis.openPositions?.length > 0 ? (
                  analysis.openPositions.map((position, index) => (
                    <JobCard key={index} job={position} />
                  ))
                ) : analysis.jobs?.length > 0 ? (
                  analysis.jobs.map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No open positions data available from LLM</p>
                  </div>
                )}
              </div>
            </div>

            {/* Company Culture & Benefits */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Company Culture & Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Culture Highlights
                  </h4>
                  <ul className="space-y-3">
                    {analysis.cultureHighlights?.map((highlight, index) => (
                      <CultureItem key={index} text={highlight} />
                    )) || analysis.culture?.highlights?.map((highlight, index) => (
                      <CultureItem key={index} text={highlight} />
                    )) || (
                      <li className="text-sm text-gray-500 dark:text-gray-400 italic">
                        No culture data available
                      </li>
                    )}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-500" />
                    Benefits & Perks
                  </h4>
                  <ul className="space-y-3">
                    {analysis.benefits?.map((benefit, index) => (
                      <CultureItem key={index} text={benefit} />
                    )) || analysis.compensation?.benefits?.map((benefit, index) => (
                      <CultureItem key={index} text={benefit} />
                    )) || (
                      <li className="text-sm text-gray-500 dark:text-gray-400 italic">
                        No benefits data available
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Interview Process */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-500" />
                Interview Process
              </h3>
              <div className="space-y-4">
                {analysis.interviewProcess?.length > 0 ? (
                  analysis.interviewProcess.map((step, index) => (
                    <ProcessStep 
                      key={index}
                      step={step.step || index + 1}
                      title={step.title}
                      duration={step.duration}
                      description={step.description}
                    />
                  ))
                ) : analysis.hiring?.process?.length > 0 ? (
                  analysis.hiring.process.map((step, index) => (
                    <ProcessStep 
                      key={index}
                      step={index + 1}
                      title={step.stage}
                      duration={step.timeline}
                      description={step.description}
                    />
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    <UserCheck className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No interview process data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Career Assessment */}
          <div className="xl:col-span-1 space-y-6">
            {/* Career Growth */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Career Growth
              </h3>
              <div className="space-y-4">
                <GrowthMetric 
                  label="Promotion Speed" 
                  value={analysis.careerGrowth?.promotionSpeed || analysis.growth?.promotionSpeed || 4.2} 
                  max={5}
                  description={analysis.careerGrowth?.promotionDescription || "Based on company data"}
                />
                <GrowthMetric 
                  label="Skill Development" 
                  value={analysis.careerGrowth?.skillDevelopment || analysis.growth?.learning || 4.5} 
                  max={5}
                  description={analysis.careerGrowth?.skillDescription || "Training and development opportunities"}
                />
                <GrowthMetric 
                  label="Mentorship" 
                  value={analysis.careerGrowth?.mentorship || analysis.culture?.mentorship || 4.0} 
                  max={5}
                  description={analysis.careerGrowth?.mentorshipDescription || "Mentorship program availability"}
                />
                <GrowthMetric 
                  label="Internal Mobility" 
                  value={analysis.careerGrowth?.internalMobility || analysis.growth?.internalMobility || 4.3} 
                  max={5}
                  description={analysis.careerGrowth?.mobilityDescription || "Internal promotion rates"}
                />
              </div>
            </div>

            {/* Quick Assessment */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Quick Assessment
              </h3>
              <div className="space-y-4">
                <AssessmentItem 
                  title="Technical Roles" 
                  value={analysis.assessment?.technicalRoles || "High"} 
                  color="green" 
                />
                <AssessmentItem 
                  title="Non-Technical Roles" 
                  value={analysis.assessment?.nonTechnicalRoles || "Medium"} 
                  color="blue" 
                />
                <AssessmentItem 
                  title="Remote Work" 
                  value={analysis.assessment?.remoteWork || analysis.workModel?.remote || "80%"} 
                  color="purple" 
                />
                <AssessmentItem 
                  title="Work-Life Balance" 
                  value={analysis.assessment?.workLifeBalance || analysis.culture?.workLifeBalance || "Great"} 
                  color="green" 
                />
                <AssessmentItem 
                  title="Salary Competitiveness" 
                  value={analysis.assessment?.salaryCompetitiveness || analysis.compensation?.competitiveness || "High"} 
                  color="green" 
                />
                <AssessmentItem 
                  title="Career Advancement" 
                  value={analysis.assessment?.careerAdvancement || analysis.growth?.advancement || "Excellent"} 
                  color="green" 
                />
              </div>
            </div>

            {/* Employee Reviews */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Employee Reviews
              </h3>
              <div className="space-y-4">
                {analysis.employeeReviews?.length > 0 ? (
                  analysis.employeeReviews.slice(0, 2).map((review, index) => (
                    <ReviewCard 
                      key={index}
                      rating={review.rating}
                      comment={review.comment}
                      role={review.role}
                      tenure={review.tenure}
                    />
                  ))
                ) : analysis.reviews?.length > 0 ? (
                  analysis.reviews.slice(0, 2).map((review, index) => (
                    <ReviewCard 
                      key={index}
                      rating={review.rating}
                      comment={review.comment}
                      role={review.position}
                      tenure={review.experience}
                    />
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No review data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobSeekerEmptyState = ({ onQuickStart }) => {
  const quickActions = [
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
      icon: DollarSign,
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
      title: "Interview Prep",
      description: "Get insights into hiring process and interviews",
      icon: UserCheck,
      color: "from-purple-500 to-pink-600",
      examples: ["Interview rounds", "Technical tests", "Culture fit"]
    }
  ];

  const popularCompanies = [
    { name: "Google", industry: "Technology" },
    { name: "Microsoft", industry: "Software" },
    { name: "Amazon", industry: "E-commerce" },
    { name: "Apple", industry: "Technology" },
    { name: "Netflix", industry: "Entertainment" },
    { name: "Salesforce", industry: "CRM" },
    { name: "Tesla", industry: "Automotive" },
    { name: "Meta", industry: "Social Media" }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl mb-4 mx-auto">
              <Briefcase className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-br from-gray-900 to-green-600 dark:from-white dark:to-green-400 bg-clip-text text-transparent mb-4">
            Career Intelligence
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ask me about any company's career opportunities, culture, and hiring process
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8 lg:mb-12">
            What would you like to know about companies?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => onQuickStart && onQuickStart(action.title)}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
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
            Try asking about these companies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            {popularCompanies.map((company, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => onQuickStart && onQuickStart(company.name)}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">
                    {company.name[0]}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate">
                  {company.name}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate block">
                  {company.industry}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8 lg:p-12 shadow-sm">
            <Search className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Explore Career Opportunities?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Ask me about any company's job openings, culture, salaries, or interview process. 
              I'll provide real-time insights from comprehensive data analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => onQuickStart && onQuickStart("Tell me about")}
                className="px-8 py-4 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <Zap className="w-5 h-5" />
                Start Company Research
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex-1 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-16 h-16 text-green-500 animate-spin mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Analyzing Company Data
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        Fetching latest career insights from LLM...
      </p>
    </div>
  </div>
);

// Supporting Components (same as before but with LLM data fallbacks)
const JobCard = ({ job }) => (
  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-300 hover:border-green-300 dark:hover:border-green-600">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
          {job.title || job.position || "Position"}
        </h4>
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            {job.location || "Location not specified"}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4" />
            {job.salary || job.compensation || "Salary not specified"}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            {job.type || job.employmentType || "Full-time"}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {job.description || "No description available"}
        </p>
        <div className="flex flex-wrap gap-2">
          {job.skills?.map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
              {skill}
            </span>
          )) || job.requirements?.slice(0, 3).map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
              {skill}
            </span>
          )) || (
            <span className="text-xs text-gray-500 dark:text-gray-400 italic">
              No skills specified
            </span>
          )}
        </div>
      </div>
      <div className="flex sm:flex-col gap-2 sm:items-end">
        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {job.posted || "Recently"}
        </span>
        <button className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-200">
          Apply Now
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

const CultureItem = ({ text }) => (
  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
    <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
    {text}
  </li>
);

const ProcessStep = ({ step, title, duration, description }) => (
  <div className="flex items-start gap-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
      {step}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-1">
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {duration}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
);

const GrowthMetric = ({ label, value, max = 5, description }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}/5</span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

const AssessmentItem = ({ title, value, color }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-600 dark:text-gray-300">{title}</span>
    <span className={`text-xs font-semibold px-2 py-1 rounded ${
      color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
      color === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
    }`}>
      {value}
    </span>
  </div>
);

const ReviewCard = ({ rating, comment, role, tenure }) => (
  <div className="bg-gray-50 dark:bg-gray-800/60 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-2 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
        />
      ))}
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 italic">"{comment}"</p>
    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
      <span>{role}</span>
      <span>{tenure}</span>
    </div>
  </div>
);

export default JobSeekerPanel;