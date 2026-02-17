import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Heart, Command } from 'lucide-react';

const Support = () => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
            {/* Main Toggle Button */}
            <motion.div
                initial={{ width: 50 }}
                animate={{ width: isHovering ? 200 : 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                className="group relative flex items-center justify-end h-12 bg-gray-900 border border-secondary/30 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:bg-secondary/10 overflow-hidden cursor-pointer"
            >
                <div className="absolute left-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-secondary text-sm font-bold flex items-center gap-2">
                    <Heart size={16} className="fill-secondary" />
                    <span>Support My Work</span>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/20 text-secondary z-10 shrink-0">
                    <Coffee size={24} />
                </div>
            </motion.div>

            {/* Expanded Options (Visible on Hover/Click - Simplified for now as external link) */}
            {isHovering && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-16 right-0 bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-2xl glass w-56 space-y-3"
                >
                    <a
                        href="https://www.buymeacoffee.com/harshshukla"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors text-yellow-400 font-medium"
                    >
                        <div className="p-2 bg-yellow-400/20 rounded-md">
                            <Coffee size={18} />
                        </div>
                        <span>Buy Me a Coffee</span>
                    </a>

                    <div className="text-xs text-center text-gray-500 pt-2 border-t border-gray-800">
                        Thanks for your support! ❤️
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Support;
