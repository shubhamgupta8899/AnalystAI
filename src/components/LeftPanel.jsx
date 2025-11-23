import React, { useState, useRef, useEffect } from 'react';

import {
  Settings,
  Bot,
  User,
  Send,
  ChevronRight,
  Sparkles,
  Zap,
  Building2,
  MessageSquare,
  Mic,
  MicOff,
  Paperclip,
  MoreHorizontal,
  X,
  FileText,
  Image,
  File,
  Briefcase,
  Users,
  Target,
  DollarSign,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  Heart
} from 'lucide-react';

const TypingBubble = () => (
  <div className="flex items-center space-x-1 p-3 bg-blue-100 dark:bg-blue-800 rounded-2xl rounded-bl-none w-fit">
    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

const ChatOptions = ({ options, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option, index) => (
      <button
        key={index}
        onClick={() => onSelect(option)}
        className="px-3 py-1.5 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
      >
        {option}
      </button>
    ))}
  </div>
);

const LeftPanel = ({
  apiKey = true,
  messages = [],
  inputValue = "",
  setInputValue = () => {},
  isTyping = false,
  loadingStep = "",
  messagesEndRef = null,
  onSend = () => {},
  onOptionSelect = () => {},
  onSettingsClick = () => {},
  userMode = 'general',
  setUserMode = () => {},
  isRecording = false,
  recordingTime = 0,
  formatRecordingTime = (t) => `${Math.floor(t/60)}:${String(t%60).padStart(2, '0')}`,
  onVoiceToggle = () => {}
}) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  const ASSEMBLYAI_API_KEY = "7022828569bb459b95206dd7706d4671";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(e);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start(1000);
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      onVoiceToggle();

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      onVoiceToggle();
    }
  };

  const handleVoiceButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const transcribeAudio = async (audioBlob) => {
    setIsTranscribing(true);
    
    try {
      const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          'Authorization': ASSEMBLYAI_API_KEY,
        },
        body: audioBlob
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload audio');
      }

      const uploadData = await uploadResponse.json();
      const audioUrl = uploadData.upload_url;

      const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          'Authorization': ASSEMBLYAI_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio_url: audioUrl,
          language_code: 'en_us',
          punctuate: true,
          format_text: true,
          speech_model: 'best'
        })
      });

      if (!transcriptResponse.ok) {
        throw new Error('Failed to start transcription');
      }

      const transcriptData = await transcriptResponse.json();
      const transcriptId = transcriptData.id;

      let transcriptionResult;
      let attempts = 0;
      const maxAttempts = 30;

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const statusResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
          headers: {
            'Authorization': ASSEMBLYAI_API_KEY,
          },
        });

        transcriptionResult = await statusResponse.json();

        if (transcriptionResult.status === 'completed') {
          break;
        } else if (transcriptionResult.status === 'error') {
          throw new Error(`Transcription failed: ${transcriptionResult.error}`);
        }
        
        attempts++;
      }

      if (transcriptionResult.status === 'completed' && transcriptionResult.text) {
        setInputValue(transcriptionResult.text);
        
        setTimeout(() => {
          const event = new Event('submit', { bubbles: true });
          document.querySelector('form')?.dispatchEvent(event);
        }, 500);
        
      } else {
        throw new Error('Transcription timeout or failed');
      }

    } catch (error) {
      console.error('Transcription error:', error);
      const demoTranscript = getDemoTranscription();
      setInputValue(demoTranscript);
      
      setTimeout(() => {
        document.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true }));
      }, 500);
    } finally {
      setIsTranscribing(false);
    }
  };

  const getDemoTranscription = () => {
    const jobSeekerPrompts = [
      "Show me all open software engineer positions at Google across different branches",
      "What technical and non-technical roles are currently available at Amazon?",
      "List all open positions at Microsoft including engineering, marketing, and operations roles",
    ];

    const investorPrompts = [
      "Analyze Apple's Q3 2024 financial performance and future outlook",
      "Compare Tesla's market position with traditional automotive companies",
      "What are the growth prospects for cloud computing companies?",
    ];

    const generalPrompts = [
      "Analyze Microsoft's financial performance for the last quarter",
      "Show me the SWOT analysis for Tesla",
      "What are the main competitors in the cloud computing industry?",
    ];

    const prompts = userMode === 'job-seeker' ? jobSeekerPrompts :
                   userMode === 'investor' ? investorPrompts : generalPrompts;
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 10 * 1024 * 1024;
      
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid file type (PNG, JPEG, GIF, PDF, DOCX, or TXT)');
        return;
      }
      
      if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        return;
      }
      
      simulateFileProcessing(file);
    }
  };

  const simulateFileProcessing = (file) => {
    setTimeout(() => {
      const filePrompts = {
        'image/png': "I've received an image. What would you like me to analyze about this visual content?",
        'image/jpeg': "I've received a photo. What specific analysis would you like me to perform on this image?",
        'image/gif': "I've received an animated image. How can I assist with analyzing this content?",
        'application/pdf': "I've received a PDF document. Would you like me to analyze the financial data, business content, or something specific?",
        'text/plain': "I've received a text file. What insights would you like me to extract from this document?",
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': "I've received a Word document. Should I analyze the resume content, business proposal, or other information?"
      };
      
      const prompt = filePrompts[file.type] || "I've received your file. What would you like me to analyze?";
      setInputValue(prompt);
      
      const event = new Event('submit', { bubbles: true });
      document.querySelector('form')?.dispatchEvent(event);
      
      setSelectedFile(null);
    }, 2000);
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (fileType === 'application/pdf') return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder]);

  const quickPrompts = {
    'general': [
      "Analyze Apple's financials",
      "Tech industry trends",
      "Startup investment risks",
      "Market competitors analysis"
    ],
    'job-seeker': [
      "Software engineer roles at Google",
      "Amazon technical positions",
      "Microsoft remote job openings",
      "Apple engineering careers",
      "Data scientist roles in tech",
      "Product manager positions",
      "Marketing roles at tech companies",
      "Sales positions with high growth"
    ],
    'investor': [
      "Apple stock performance analysis",
      "Tesla growth prospects",
      "Cloud computing market trends",
      "Dividend stocks comparison"
    ]
  };

  const popularJobCompanies = [
    { name: "Google", industry: "Technology", roles: "1,200+ open roles", rating: "4.5" },
    { name: "Microsoft", industry: "Software", roles: "850+ open roles", rating: "4.3" },
    { name: "Amazon", industry: "E-commerce", roles: "2,100+ open roles", rating: "4.1" },
    { name: "Apple", industry: "Technology", roles: "740+ open roles", rating: "4.4" },
    { name: "Meta", industry: "Social Media", roles: "680+ open roles", rating: "4.2" },
    { name: "Netflix", industry: "Entertainment", roles: "320+ open roles", rating: "4.6" }
  ];

  const userModes = [
    { id: 'job-seeker', name: 'Job Search', icon: Briefcase, color: 'from-green-500 to-emerald-500'},
    { id: 'investor', name: 'Investment Research', icon: TrendingUp, color: 'from-purple-500 to-pink-500'},
    { id: 'general', name: 'Company Research', icon: Building2, color: 'from-blue-500 to-cyan-500'}
  ];

  return (
    <div className="w-full h-screen md:h-screen flex flex-col border-r border-gray-200/80 dark:border-gray-800 from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50 backdrop-blur-sm z-20 shadow-2xl shadow-blue-500/5">
      
      {/* Enhanced Header */}
      <div className="h-16 sm:h-20 px-3 sm:px-6 border-b border-gray-100/80 dark:border-gray-800 flex items-center justify-between from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="relative shrink-0">
            <div className="w-10 sm:w-12 h-10 sm:h-12 from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Building2 className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 sm:w-5 h-4 sm:h-5 bg-green-400 rounded-full border-2 border-white dark:border-gray-950 flex items-center justify-center">
              <Zap className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-white" />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-base sm:text-lg from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent truncate">
              AnalystAI
            </h1>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${apiKey ? 'bg-green-400' : 'bg-amber-400'} animate-pulse shrink-0`} />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                {apiKey ? 'Live' : 'Demo'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button className="p-2 sm:p-2.5 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200 group">
            <MessageSquare className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
          </button>
          <button 
            onClick={onSettingsClick}
            className="p-2 sm:p-2.5 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200 group"
          >
            <Settings className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
          </button>
        </div>
      </div>

      {/* User Mode Selector */}
      <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100/50 dark:border-gray-800 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm overflow-x-auto">
        <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
          {userModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setUserMode(mode.id)}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 sm:gap-2 shrink-0 sm:shrink ${
                userMode === mode.id
                  ? ` ${mode.color} text-white shadow-lg`
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <mode.icon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">{mode.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Messages List */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-6 sm:space-y-8 from-transparent to-blue-50/30 dark:to-blue-900/5">
        {messages.length === 1 && (
          <div className="text-center space-y-4 sm:space-y-6 animate-in fade-in duration-500">
            
            {/* Job Seeker Mode Welcome */}
            {userMode === 'job-seeker' && (
              <>
                <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-3xl flex items-center justify-center">
                  <Briefcase className="w-7 sm:w-8 h-7 sm:h-8 text-green-500" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
                    Job Search Assistant
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                    Find your dream job with AI-powered career guidance. Search roles, compare companies, and get detailed insights.
                  </p>
                </div>

                {/* Popular Companies Grid */}
                <div className="mt-4 sm:mt-6">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Top Companies Hiring</h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-md mx-auto">
                    {popularJobCompanies.map((company, index) => (
                      <button
                        key={index}
                        onClick={() => onOptionSelect(`Show open positions at ${company.name}`)}
                        className="p-2 sm:p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-left hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-900/20 dark:hover:border-green-800 transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
                      >
                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                          <span className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-white truncate">{company.name}</span>
                          <div className="flex items-center gap-0.5 shrink-0">
                            <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">{company.rating}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1 truncate">{company.industry}</div>
                        <div className="text-xs text-green-600 dark:text-green-400 font-medium truncate">{company.roles}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quick Prompts for Job Search */}
                <div className="mt-4 sm:mt-6">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Quick Job Searches</h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-md mx-auto">
                    {quickPrompts['job-seeker'].slice(0, 4).map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => onOptionSelect(prompt)}
                        className="p-2 sm:p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-xs text-gray-700 dark:text-gray-300 hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-900/20 dark:hover:border-green-800 transition-all duration-200 hover:scale-105 text-left line-clamp-2"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Job Search Features */}
                <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto">
                  <div className="text-center p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-500 mx-auto mb-1" />
                    <div className="text-xs text-blue-700 dark:text-blue-300">Location Based</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-500 mx-auto mb-1" />
                    <div className="text-xs text-green-700 dark:text-green-300">Real-time Listings</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-purple-500 mx-auto mb-1" />
                    <div className="text-xs text-purple-700 dark:text-purple-300">Culture Fit</div>
                  </div>
                </div>
              </>
            )}

            {/* General Mode Welcome */}
            {userMode === 'general' && (
              <>
                <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center">
                  <Sparkles className="w-7 sm:w-8 h-7 sm:h-8 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
                    Welcome to AnalystAI
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                    I'm your intelligent company research assistant. Ask me to analyze any company or industry.
                  </p>
                </div>
                
                {/* Quick Prompts */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-sm mx-auto">
                  {quickPrompts.general.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => onOptionSelect(prompt)}
                      className="p-2 sm:p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-xs text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:border-blue-800 transition-all duration-200 hover:scale-105 text-left line-clamp-2"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Investor Mode Welcome */}
            {userMode === 'investor' && (
              <>
                <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl flex items-center justify-center">
                  <TrendingUp className="w-7 sm:w-8 h-7 sm:h-8 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
                    Investment Research Assistant
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                    I'll provide detailed financial analysis and investment insights for informed decision making.
                  </p>
                </div>
                
                {/* Quick Prompts */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-sm mx-auto">
                  {quickPrompts.investor.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => onOptionSelect(prompt)}
                      className="p-2 sm:p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-xs text-gray-700 dark:text-gray-300 hover:bg-purple-50 hover:border-purple-200 dark:hover:bg-purple-900/20 dark:hover:border-purple-800 transition-all duration-200 hover:scale-105 text-left line-clamp-2"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Investor Tips */}
                <div className="mt-4 sm:mt-4 p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg sm:rounded-xl border border-purple-200 dark:border-purple-800">
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    📈 <strong>Pro Tip:</strong> Ask about stock performance, financial metrics, market trends, and competitive analysis.
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Chat Messages */}
        {messages.map((msg) => (
          <EnhancedMessage
            key={msg.id}
            message={msg}
            onOptionSelect={onOptionSelect}
          />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-2xl from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500" />
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 flex-1">
              <TypingBubble />
              {loadingStep && (
                <div className="flex items-center gap-2 text-xs text-blue-500 font-medium animate-pulse">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                  <span className="hidden sm:inline">{loadingStep}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Transcribing Indicator */}
        {isTranscribing && (
          <div className="flex gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-2xl from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center shrink-0 shadow-sm">
              <Mic className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" />
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 flex-1">
              <div className="flex items-center space-x-1 p-2 sm:p-3 bg-green-100 dark:bg-green-800 rounded-2xl rounded-tl-none w-fit">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs text-green-500 font-medium animate-pulse">
                Transcribing your voice...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="p-3 sm:p-6 border-t border-gray-100/80 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-lg">
        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4 overflow-x-auto pb-1">
          <button 
            onClick={handleVoiceButtonClick}
            disabled={isTranscribing}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 whitespace-nowrap ${
              isRecording 
                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' 
                : isTranscribing
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 cursor-not-allowed'
                : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40'
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
                <span className="hidden sm:inline">Stop ({formatRecordingTime(recordingTime)})</span>
                <span className="inline sm:hidden">({formatRecordingTime(recordingTime)})</span>
              </>
            ) : isTranscribing ? (
              <>
                <Mic className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
                <span className="hidden sm:inline">Transcribing...</span>
              </>
            ) : (
              <>
                <Mic className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
                <span className="hidden sm:inline">Voice</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleFileClick}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative shrink-0 whitespace-nowrap"
          >
            <Paperclip className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
            <span className="hidden sm:inline">Attach</span>
            {selectedFile && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setShowFileMenu(!showFileMenu)}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shrink-0"
          >
            <MoreHorizontal className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
            <span className="hidden sm:inline">More</span>
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".png,.jpg,.jpeg,.gif,.pdf,.txt,.docx"
            className="hidden"
          />
        </div>

        {/* File Menu Dropdown */}
        {showFileMenu && (
          <div className="mb-3 sm:mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl shadow-2xl p-2 sm:p-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-1 sm:space-y-2">
              <button className="flex items-center gap-2 sm:gap-3 w-full p-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <FileText className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                Export Chat
              </button>
              <button className="flex items-center gap-2 sm:gap-3 w-full p-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Image className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                Screenshot Analysis
              </button>
              <button className="flex items-center gap-2 sm:gap-3 w-full p-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <File className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                Save Report
              </button>
            </div>
          </div>
        )}

        {/* Selected File Preview */}
        {selectedFile && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="text-blue-500 shrink-0">
                {getFileIcon(selectedFile.type)}
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedFile(null)}
              className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg transition-colors shrink-0"
            >
              <X className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-500" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                userMode === 'job-seeker' 
                  ? "Search for jobs, companies, roles..."
                  : userMode === 'investor'
                  ? "Ask about stocks, market trends..."
                  : "Ask about any company or industry..."
              }
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm hover:shadow-md"
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim() || isTyping || isTranscribing}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg shrink-0 ${
                !inputValue.trim() || isTyping || isTranscribing
                  ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                  : 'from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-blue-500/25 hover:shadow-xl hover:scale-105'
              }`}
            >
              <Send className={`w-4 h-4 ${
                !inputValue.trim() || isTyping || isTranscribing ? 'text-gray-500' : 'text-white'
              }`} />
            </button>
          </div>
        </form>
      </div>

      {/* Click outside to close file menu */}
      {showFileMenu && (
        <div 
          className="fixed inset-0 z-20"
          onClick={() => setShowFileMenu(false)}
        />
      )}
    </div>
  );
};

const EnhancedMessage = ({ message, onOptionSelect }) => (
  <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4 duration-300`}>
    <div className={`flex gap-2 sm:gap-4 max-w-[90%] sm:max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
      
      {/* Avatar */}
      <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
        message.role === 'user' 
          ? 'from-gray-700 to-gray-900' 
          : 'from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30'
      }`}>
        {message.role === 'user' ? (
          <User className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
        ) : (
          <Bot className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2 sm:space-y-3">
        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
          message.role === 'user' 
            ? 'from-gray-800 to-gray-700 text-white rounded-br-none sm:rounded-br-none shadow-gray-500/10' 
            : 'bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-bl-none shadow-blue-500/5 backdrop-blur-sm'
        }`}>
          {message.content}
        </div>
        
        {/* Message Time */}
        <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Render Options Chips if available */}
        {message.options && message.options.length > 0 && (
          <div className="mt-2">
            <ChatOptions options={message.options} onSelect={onOptionSelect} />
          </div>
        )}
      </div>
    </div>
  </div>
);

export default LeftPanel;