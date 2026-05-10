import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Bot, Sparkles, User, Mic, MicOff, Loader2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// We'll reuse the AI service logic but adapt it for chat
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

const ChatBot = () => {
    const { data, setTheme } = usePortfolio();
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
        { text: "Hi! I'm Harsh's AI navigator. Ask me anything about his work, skills, or even ask me to show you a specific section!", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // Voice Recognition Setup
    const startListening = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            handleSend(null, transcript);
        };

        recognition.start();
    };

    const handleSend = async (e: React.FormEvent | null, voiceInput?: string) => {
        if (e) e.preventDefault();
        const userMsg = voiceInput || input.trim();
        if (!userMsg) return;

        setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
        setInput("");
        setIsTyping(true);

        // Navigation & Theme check
        const lowerMsg = userMsg.toLowerCase();
        
        // Voice Command Shortcuts (Jarvis Mode)
        if (lowerMsg.includes('go to projects')) { window.location.hash = '#projects'; }
        if (lowerMsg.includes('switch theme') || lowerMsg.includes('change theme')) { 
            const themes = ['cyan', 'emerald', 'amber', 'magenta'];
            const currentIdx = themes.indexOf(data.theme || 'cyan');
            setTheme(themes[(currentIdx + 1) % themes.length]);
        }

        if (lowerMsg.includes('sap')) setTheme('amber');
        if (lowerMsg.includes('ai') || lowerMsg.includes('machine learning')) setTheme('magenta');
        if (lowerMsg.includes('frontend') || lowerMsg.includes('react')) setTheme('cyan');
        if (lowerMsg.includes('backend') || lowerMsg.includes('node')) setTheme('emerald');

        if (lowerMsg.includes('show me projects') || lowerMsg.includes('go to projects')) {
            window.location.hash = 'projects';
            setMessages(prev => [...prev, { text: "Launching the Simulation Room now... 🚀", isBot: true }]);
            setIsTyping(false);
            return;
        }
        if (lowerMsg.includes('contact') || lowerMsg.includes('hire')) {
            window.location.hash = 'contact';
        }

        try {
            const portfolioContext = `
            You are "Harsh AI", the personal assistant for Harsh Kumar Shukla's 3D portfolio. 
            CONTEXT:
            - Role: SAP SD Consultant at Cognizant.
            - Education: MCA (AI/ML) from Amity University.
            - Skills: Python, React.js, SAP SD, AWS, AI/ML, C++, Java.
            - Projects: Industrial Palletisation System, 3D Memory Game, and many more on GitHub (harshshukla2016).
            - Personality: Professional, high-tech, slightly futuristic, helpful.
            - Instructions: Keep responses concise (under 3 sentences). If someone asks to "show" a section, tell them to use keywords like "show me projects".
            `;

            const prompt = `${portfolioContext}\nUser asks: ${userMsg}`;
            
            // Call AI (Preferring Groq for speed if available)
            let botReply = "";
            if (GROQ_API_KEY) {
                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                    body: JSON.stringify({
                        model: "llama-3.3-70b-versatile",
                        messages: [{ role: "user", content: prompt }],
                        max_tokens: 150
                    }),
                });
                const resData = await response.json();
                botReply = resData.choices[0].message.content;
            } else if (GEMINI_API_KEY) {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
                });
                const resData = await response.json();
                botReply = resData.candidates[0].content.parts[0].text;
            } else {
                botReply = "I'm offline right now (API keys missing), but Harsh is awesome! Email him at harshshukla2016@gmail.com.";
            }

            setMessages(prev => [...prev, { text: botReply, isBot: true }]);
            
            // AI Lead Categorization (New Automation)
            const lowerMsg = userMsg.toLowerCase();
            const isRecruiter = lowerMsg.includes('hiring') || lowerMsg.includes('job') || lowerMsg.includes('role') || lowerMsg.includes('recruiter') || lowerMsg.includes('interview');
            
            if (isRecruiter) {
                const leads = JSON.parse(localStorage.getItem('recruiter_leads') || '[]');
                const newLead = {
                    id: Date.now(),
                    timestamp: new Date().toISOString(),
                    message: userMsg,
                    intent: 'Recruiter/Hiring',
                    status: 'Hot'
                };
                localStorage.setItem('recruiter_leads', JSON.stringify([newLead, ...leads].slice(0, 50)));
                console.log('🚀 Hot Lead Captured:', newLead);
            }

            // AI Theme Switching (Dynamic UI Control)
            if (lowerMsg.includes('theme') || lowerMsg.includes('color') || lowerMsg.includes('aura') || lowerMsg.includes('mode')) {
                if (lowerMsg.includes('cyan') || lowerMsg.includes('cyber') || lowerMsg.includes('blue')) {
                    setTheme('cyan');
                    console.log('🌌 Aura Synced: Cyber Mode');
                } else if (lowerMsg.includes('emerald') || lowerMsg.includes('matrix') || lowerMsg.includes('green')) {
                    setTheme('emerald');
                    console.log('🌌 Aura Synced: Matrix Mode');
                } else if (lowerMsg.includes('amber') || lowerMsg.includes('solar') || lowerMsg.includes('gold') || lowerMsg.includes('yellow')) {
                    setTheme('amber');
                    console.log('🌌 Aura Synced: Solar Mode');
                } else if (lowerMsg.includes('ruby') || lowerMsg.includes('red') || lowerMsg.includes('fire')) {
                    setTheme('ruby');
                    console.log('🌌 Aura Synced: Ruby Mode');
                }
            }

            // AI Voice Synthesis
            if (data.ai?.voice !== 'Disabled') {
                const utterance = new SpeechSynthesisUtterance(botReply);
                utterance.rate = 1.1;
                utterance.pitch = 0.9;
                window.speechSynthesis.speak(utterance);
            }

        } catch (error) {
            setMessages(prev => [...prev, { text: "My connection to the nebula is weak. Try again later!", isBot: true }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-black/90 backdrop-blur-xl border border-primary/30 w-[320px] md:w-[380px] h-[500px] rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.15)] flex flex-col overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="bg-primary/10 p-5 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Bot size={22} className="text-primary" />
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black animate-pulse"></span>
                                </div>
                                <div>
                                    <span className="font-display font-bold text-white text-sm block">Harsh AI Navigator</span>
                                    <span className="text-[10px] text-primary/60 font-mono tracking-widest uppercase">Systems Active</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
                            {messages.map((msg, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: msg.isBot ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={idx} 
                                    className={`flex gap-3 ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${msg.isBot ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-secondary/5 border-secondary/20 text-secondary'}`}>
                                        {msg.isBot ? <Bot size={14} /> : <User size={14} />}
                                    </div>
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.isBot ? 'bg-white/5 text-gray-300 rounded-tl-none border border-white/5' : 'bg-primary/20 text-white rounded-tr-none border border-primary/30'}`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center">
                                        <Loader2 size={14} className="text-primary animate-spin" />
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl rounded-tl-none border border-white/5">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-100"></span>
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-200"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={(e) => handleSend(e)} className="p-4 border-t border-white/10 flex gap-2 bg-black/40">
                            <button 
                                onClick={startListening}
                                className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-white/5 text-white/40 hover:text-primary hover:bg-primary/10'}`}
                            >
                                <Mic size={20} />
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend(null)}
                                placeholder="Command the system..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => handleSend(null)}
                                disabled={isTyping}
                                className="p-3 bg-primary text-black rounded-xl hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="p-5 bg-black border border-primary/50 text-primary rounded-full shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] transition-all pointer-events-auto group"
                >
                    <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
                </motion.button>
            )}
        </div>
    );
};

export default ChatBot;
