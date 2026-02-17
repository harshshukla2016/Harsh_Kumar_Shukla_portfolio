import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';

const responses = {
    default: "I'm Harsh's AI Assistant. Ask me about his projects, skills, or contact info!",
    hello: "Hi there! 👋 How can I help you today?",
    skills: "Harsh is proficient in Python, React.js, SAP SD, C++, and Java. He also knows Cloud (AWS) and AI/ML.",
    projects: "Check out the Projects section! Highlights include an Industrial Palletisation System and a 3D Memory Game.",
    contact: "You can reach Harsh at harshshukla2016@gmail.com or via the contact form below.",
    hire: "Harsh is open to new opportunities! Feel free to email him directly.",
    referral: "For referrals, please check the 'Referrals' section to see open positions at his network.",
    love: "Aw, thanks! ❤️ Harsh loves coding too."
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
        { text: "Hi! I'm Harsh's AI assistant. How can I help?", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
        setInput("");

        // Simple keyword matching for demo
        let botReply = responses.default;
        const lowerInput = userMsg.toLowerCase();

        if (lowerInput.includes('hello') || lowerInput.includes('hi')) botReply = responses.hello;
        else if (lowerInput.includes('skill') || lowerInput.includes('tech')) botReply = responses.skills;
        else if (lowerInput.includes('project') || lowerInput.includes('work')) botReply = responses.projects;
        else if (lowerInput.includes('contact') || lowerInput.includes('email')) botReply = responses.contact;
        else if (lowerInput.includes('hire') || lowerInput.includes('job')) botReply = responses.hire;
        else if (lowerInput.includes('referral')) botReply = responses.referral;
        else if (lowerInput.includes('love')) botReply = responses.love;

        // Simulate typing delay
        setTimeout(() => {
            setMessages(prev => [...prev, { text: botReply, isBot: true }]);
        }, 600);
    };

    return (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-gray-900 border border-secondary/30 w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="bg-secondary/10 p-4 border-b border-secondary/20 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Bot size={20} className="text-secondary" />
                                <span className="font-bold text-white text-sm">Harsh AI</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex gap-2 ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.isBot ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                                        {msg.isBot ? <Bot size={14} /> : <User size={14} />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${msg.isBot ? 'bg-gray-800 text-gray-200 rounded-tl-none' : 'bg-primary/10 text-white rounded-tr-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-3 border-t border-gray-800 flex gap-2 bg-gray-900">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-gray-800 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-secondary"
                            />
                            <button type="submit" className="p-2 bg-secondary text-black rounded-full hover:bg-secondary/80 transition-colors">
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-4 bg-secondary text-black rounded-full shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-110 transition-transform pointer-events-auto"
                >
                    <MessageSquare size={24} />
                </button>
            )}
        </div>
    );
};

export default ChatBot;
