// utils/transformLLMData.js
export const transformLLMData = (llmResponse, userMode = 'general') => {
  // If the response already has dashboardData, use that as base
  const baseData = llmResponse.dashboardData || llmResponse;
  
  return {
    companyName: baseData.companyName || baseData.company_name || "Company",
    ticker: baseData.ticker || baseData.stock_symbol || "",
    sentiment: baseData.sentiment || "Neutral",
    summary: baseData.summary || baseData.executive_summary || "No summary available.",
    
    // Financial data
    financials: baseData.financials || {
      revenue: baseData.revenue || "$0B",
      growth: baseData.growth || "+0%",
      margin: baseData.margin || "0%",
      cashFlow: baseData.cashFlow || "$0B"
    },
    
    // SWOT analysis
    swot: baseData.swot || {
      strengths: baseData.strengths || ["No strengths data"],
      weaknesses: baseData.weaknesses || ["No weaknesses data"],
      opportunities: baseData.opportunities || ["No opportunities data"],
      threats: baseData.threats || ["No threats data"]
    },
    
    // Competitors
    competitors: baseData.competitors || baseData.competition || [],
    
    // User mode specific data
    userMode: userMode,
    
    // Job seeker specific data
    ...(userMode === 'job-seeker' && {
      salaryRange: baseData.salaryRange || baseData.avg_salary || "$0K",
      cultureScore: baseData.cultureScore || "0/5",
      remoteWork: baseData.remoteWork || "0%",
      hiringStatus: baseData.hiringStatus || baseData.hiring_status || "Unknown",
      
      // Open positions
      openPositions: baseData.openPositions || baseData.jobs?.map(job => ({
        title: job.title || job.position,
        location: job.location,
        salary: job.salary || job.compensation,
        type: job.type || job.employment_type,
        description: job.description,
        skills: job.skills || job.technologies,
        posted: job.posted || job.posted_date,
        level: job.level || "Mid"
      })) || [],
      
      // Culture and benefits
      cultureHighlights: baseData.cultureHighlights || baseData.culture?.highlights || ["No culture data"],
      benefits: baseData.benefits || baseData.perks || ["No benefits data"],
      
      // Interview process
      interviewProcess: baseData.interviewProcess || baseData.hiring_process?.map((step, index) => ({
        step: step.step || index + 1,
        title: step.title || step.stage,
        duration: step.duration || step.timeline,
        description: step.description
      })) || [],
      
      // Career growth
      careerGrowth: baseData.careerGrowth || {
        promotionSpeed: baseData.promotion_speed || 0,
        skillDevelopment: baseData.skill_development || 0,
        mentorship: baseData.mentorship || 0,
        internalMobility: baseData.internal_mobility || 0
      },
      
      // Assessment
      assessment: baseData.assessment || {
        technicalRoles: baseData.technical_roles || "Unknown",
        nonTechnicalRoles: baseData.non_technical_roles || "Unknown",
        remoteWork: baseData.remote_work_assessment || "0%",
        workLifeBalance: baseData.work_life_balance || "Unknown",
        salaryCompetitiveness: baseData.salary_competitiveness || "Unknown",
        careerAdvancement: baseData.career_advancement || "Unknown"
      },
      
      // Employee reviews
      employeeReviews: baseData.employeeReviews || baseData.reviews?.map(review => ({
        rating: review.rating,
        comment: review.comment,
        role: review.role || review.position,
        tenure: review.tenure || review.experience
      })) || []
    }),
    
    // Investor specific data
    ...(userMode === 'investor' && {
      peRatio: baseData.peRatio || baseData.pe_ratio || "0",
      marketCap: baseData.marketCap || baseData.market_cap || "$0",
      dividendYield: baseData.dividendYield || baseData.dividend_yield || "0%",
      stockPerformance: baseData.stockPerformance || baseData.stock_performance || "0%"
    })
  };
};