import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Heart, X, IndianRupee } from 'lucide-react';

const Support = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handlePayment = (amount: number) => {
        // UPI Deep Link Logic
        // TODO: Replace 'your-upi-id@okicici' with your actual UPI ID (VPA)
        const vpa = '9569808478@upi';
        const name = 'Harsh Kumar Shukla';
        const transactionNote = 'Portfolio Support';

        const upiUrl = `upi://pay?pa=${vpa}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

        // Open the UPI link
        window.location.href = upiUrl;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-2xl glass mb-2 w-64"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-white font-bold text-sm flex items-center gap-2">
                                <Coffee size={16} className="text-yellow-400" /> Buy me a coffee?
                            </h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => handlePayment(50)}
                                className="flex items-center justify-center gap-1 p-2 bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/50 rounded-lg text-gray-300 hover:text-green-400 transition-all"
                            >
                                <span className="text-xs">☕ Chat</span>
                                <span className="font-bold">₹50</span>
                            </button>
                            <button
                                onClick={() => handlePayment(200)}
                                className="flex items-center justify-center gap-1 p-2 bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500/50 rounded-lg text-gray-300 hover:text-yellow-400 transition-all"
                            >
                                <span className="text-xs">🍱 Lunch</span>
                                <span className="font-bold">₹200</span>
                            </button>
                            <button
                                onClick={() => handlePayment(500)}
                                className="flex items-center justify-center gap-1 p-2 bg-white/5 hover:bg-pink-500/20 border border-white/10 hover:border-pink-500/50 rounded-lg text-gray-300 hover:text-pink-400 transition-all"
                            >
                                <span className="text-xs">🚀 Project</span>
                                <span className="font-bold">₹500</span>
                            </button>
                            <button
                                onClick={() => handlePayment(1000)}
                                className="flex items-center justify-center gap-1 p-2 bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 rounded-lg text-gray-300 hover:text-purple-400 transition-all"
                            >
                                <span className="text-xs">💎 Sponsor</span>
                                <span className="font-bold">₹1k</span>
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-3 text-center leading-tight">
                            *Opens UPI apps on mobile.<br />Make sure you have GPay/PhonePe installed.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex items-center justify-center w-12 h-12 bg-gray-900 border border-secondary/30 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:bg-secondary/10 hover:scale-110 transition-all duration-300"
                title="Support My Work"
            >
                <div className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-secondary text-sm font-bold bg-black/80 px-2 py-1 rounded border border-gray-800 pointer-events-none">
                    Support / UPI
                </div>
                <Heart size={24} className={`text-secondary ${isOpen ? 'fill-secondary' : ''}`} />
            </button>
        </div>
    );
};

export default Support;
