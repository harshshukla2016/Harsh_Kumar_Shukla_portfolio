import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';

const commands = {
    help: "Available commands: about, projects, skills, contact, clear, exit",
    about: "Harsh Kumar Shukla | SAP SD Consultant & Software Engineer. Passionate about AI/ML and full-stack dev.",
    projects: "Check out my projects section for Industrial Palletisation, Robotic Arm Jogging, and more.",
    skills: "Proficient in Python, React.js, SAP SD, C++, Java, and more.",
    contact: "Email: harshshukla2016@gmail.com | LinkedIn: https://linkedin.com/in/harsh-kumar-shukla-a42aa4138",
    clear: "Clearing terminal...",
    exit: "Closing terminal..."
};

const Terminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>(['Welcome to HarshOS v1.0. Type "help" to get started.']);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isOpen, history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if (!cmd) return;

        if (cmd === 'clear') {
            setHistory([]);
        } else if (cmd === 'exit') {
            setIsOpen(false);
            setHistory(['Welcome to HarshOS v1.0. Type "help" to get started.']);
        } else if (commands[cmd as keyof typeof commands]) {
            setHistory([...history, `> ${input}`, commands[cmd as keyof typeof commands]]);
        } else {
            setHistory([...history, `> ${input}`, `Command not found: ${cmd}. Type "help" for list.`]);
        }

        setInput('');
    };

    return (
        <>
            {/* Minimal Trigger Button (Desktop Only) */}
            <div className="fixed bottom-6 left-6 z-40 hidden md:block">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-3 bg-black/80 text-green-400 border border-green-500/30 rounded-full hover:bg-green-500/10 transition-all shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                    title="Open Terminal (Ctrl+K)"
                >
                    <TerminalIcon size={24} />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)} // Close on backdrop click
                    >
                        <div
                            className="w-full max-w-2xl bg-[#0c0c0c] border border-gray-800 rounded-lg shadow-2xl overflow-hidden font-mono text-sm"
                            onClick={e => e.stopPropagation()} // Prevent close on modal click
                        >
                            {/* Terminal Header */}
                            <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
                                <div className="flex items-center gap-2">
                                    <TerminalIcon size={14} className="text-gray-400" />
                                    <span className="text-gray-400">HarshOS -- -zsh</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Minus size={14} className="text-gray-500 hover:text-white cursor-pointer" onClick={() => setIsOpen(false)} />
                                    <Square size={12} className="text-gray-500 hover:text-white cursor-pointer" />
                                    <X size={14} className="text-gray-500 hover:text-red-500 cursor-pointer" onClick={() => setIsOpen(false)} />
                                </div>
                            </div>

                            {/* Terminal Body */}
                            <div className="p-4 h-80 overflow-y-auto text-green-400" onClick={() => inputRef.current?.focus()}>
                                {history.map((line, i) => (
                                    <div key={i} className="mb-1 break-words">{line}</div>
                                ))}

                                <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
                                    <span className="text-blue-400">➜</span>
                                    <span className="text-cyan-400">~</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="bg-transparent border-none outline-none flex-1 text-gray-100"
                                        autoFocus
                                    />
                                </form>
                                <div ref={bottomRef} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Terminal;
