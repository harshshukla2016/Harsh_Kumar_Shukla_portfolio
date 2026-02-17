import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Heart, Command } from 'lucide-react';

const Support = () => {
    return (
        <a
            href="https://www.buymeacoffee.com/harshshukla"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-12 h-12 bg-gray-900 border border-secondary/30 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:bg-secondary/10 hover:scale-110 transition-all duration-300"
            title="Support My Work"
        >
            <div className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-secondary text-sm font-bold bg-black/80 px-2 py-1 rounded border border-gray-800 pointer-events-none">
                Buy Me a Coffee
            </div>
            <Coffee size={24} className="text-secondary" />
        </a>
    );
};

export default Support;
