// Add to your existing useState declarations
const [session, setSession] = useState({
  id: null,
  startTime: null,
  messageCount: 0,
  userMode: 'general',
  lastActivity: null
});

// Initialize or restore session on component mount
useEffect(() => {
  const savedSession = localStorage.getItem('companyAnalyzerSession');
  const savedMessages = localStorage.getItem('companyAnalyzerMessages');
  
  if (savedSession) {
    const sessionData = JSON.parse(savedSession);
    setSession({
      ...sessionData,
      lastActivity: new Date().toISOString()
    });
  } else {
    // Create new session
    const newSession = {
      id: generateSessionId(),
      startTime: new Date().toISOString(),
      messageCount: 0,
      userMode: 'general',
      lastActivity: new Date().toISOString()
    };
    setSession(newSession);
    localStorage.setItem('companyAnalyzerSession', JSON.stringify(newSession));
  }

  if (savedMessages) {
    setMessages(JSON.parse(savedMessages));
  }
}, []);

// Save session and messages whenever they change
useEffect(() => {
  if (session.id) {
    localStorage.setItem('companyAnalyzerSession', JSON.stringify(session));
  }
}, [session]);

useEffect(() => {
  localStorage.setItem('companyAnalyzerMessages', JSON.stringify(messages));
  
  // Update session message count
  setSession(prev => ({
    ...prev,
    messageCount: messages.filter(msg => msg.role === 'user').length,
    lastActivity: new Date().toISOString()
  }));
}, [messages]);

// Update session when user mode changes
useEffect(() => {
  setSession(prev => ({
    ...prev,
    userMode: userMode,
    lastActivity: new Date().toISOString()
  }));
}, [userMode]);

// Helper function to generate session ID
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Function to clear session (for logout/reset)
const clearSession = () => {
  localStorage.removeItem('companyAnalyzerSession');
  localStorage.removeItem('companyAnalyzerMessages');
  
  const newSession = {
    id: generateSessionId(),
    startTime: new Date().toISOString(),
    messageCount: 0,
    userMode: 'general',
    lastActivity: new Date().toISOString()
  };
  
  setSession(newSession);
  setMessages([
    { id: 1, role: 'bot', content: "Hello! I'm your Company Intelligence Agent. Name a company to start research." }
  ]);
  setAnalysis(null);
  setConversationState({
    stage: 'IDLE',
    company: null,
    purpose: null
  });
  
  localStorage.setItem('companyAnalyzerSession', JSON.stringify(newSession));
};