// hooks/useSession.js
import { useState, useEffect } from 'react';

export const useSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const savedSession = localStorage.getItem('companyAnalyzerSession');
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    } else {
      const newSession = {
        id: generateSessionId(),
        startTime: new Date().toISOString(),
        messageCount: 0,
        userMode: 'general',
        lastActivity: new Date().toISOString(),
        deviceInfo: getDeviceInfo()
      };
      setSession(newSession);
      localStorage.setItem('companyAnalyzerSession', JSON.stringify(newSession));
    }
  }, []);

  const updateSession = (updates) => {
    setSession(prev => {
      const updated = {
        ...prev,
        ...updates,
        lastActivity: new Date().toISOString()
      };
      localStorage.setItem('companyAnalyzerSession', JSON.stringify(updated));
      return updated;
    });
  };

  const clearSession = () => {
    localStorage.removeItem('companyAnalyzerSession');
    localStorage.removeItem('companyAnalyzerMessages');
    const newSession = {
      id: generateSessionId(),
      startTime: new Date().toISOString(),
      messageCount: 0,
      userMode: 'general',
      lastActivity: new Date().toISOString(),
      deviceInfo: getDeviceInfo()
    };
    setSession(newSession);
    localStorage.setItem('companyAnalyzerSession', JSON.stringify(newSession));
    return newSession;
  };

  return { session, updateSession, clearSession };
};

const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getDeviceInfo = () => {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${window.screen.width}x${window.screen.height}`
  };
};