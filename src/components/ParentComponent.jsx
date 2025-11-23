// ParentComponent.jsx
import React, { useState, useEffect } from 'react';
import JobSeekerPanel from './JobSeekerPanel';
import { Loader2 } from 'lucide-react';

// Define the transformation function
const transformLLMData = (llmResponse) => {
  // ... the function body as provided
};

const ParentComponent = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example function to fetch data from LLM (replace with actual API call)
  const getLLMData = async (query) => {
    try {
      // Simulate an API call
      const response = await fetch('/api/llm', {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching LLM data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const llmResponse = await getLLMData("Microsoft careers");
        const transformedData = transformLLMData(llmResponse);
        setAnalysisData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load career data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReset = () => {
    setAnalysisData(null);
    setError(null);
    // Optionally, refetch data or let the user search again
  };

  const handleQuickStart = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      const llmResponse = await getLLMData(searchTerm);
      const transformedData = transformLLMData(llmResponse);
      setAnalysisData(transformedData);
    } catch (error) {
      console.error('Error in quick start:', error);
      setError(`Failed to search for "${searchTerm}". Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Responsive loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/20 to-teal-50/10 dark:from-green-900/20 dark:via-emerald-900/10 dark:to-teal-900/5 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-green-500 animate-spin mx-auto mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Analyzing Career Data
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Gathering latest insights from LLM...
          </p>
        </div>
      </div>
    );
  }

  // Responsive error state
  if (error && !analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/20 to-teal-50/10 dark:from-green-900/20 dark:via-emerald-900/10 dark:to-teal-900/5 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Unable to Load Data
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
            {error}
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <JobSeekerPanel 
        analysis={analysisData} 
        onReset={handleReset} 
        onQuickStart={handleQuickStart}
        isLoading={loading && analysisData} // For partial loading states
      />
    </div>
  );
};

export default ParentComponent;