import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, Minimize2, Maximize2 } from 'lucide-react';

const songs = [
    {
        title: "Lofi Coding Beats",
        artist: "Chillhop Music",
        // Using a reliable MP3 URL for demo purposes. In production, use local assets or a proper CDN.
        url: "https://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3"
    },
    {
        title: "Cyberpunk City",
        artist: "Synthwave",
        url: "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/win.ogg"
    }
];

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [isMinimized, setIsMinimized] = useState(true);
    const [currentSong, setCurrentSong] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSong]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextSong = () => {
        setCurrentSong((prev) => (prev + 1) % songs.length);
        setIsPlaying(true);
    };

    return (
        <div className="fixed bottom-6 left-4 md:left-24 z-50 flex items-center gap-4">
            <audio
                ref={audioRef}
                src={songs[currentSong].url}
                onEnded={nextSong}
                loop={false}
            />

            <AnimatePresence>
                {!isMinimized && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-full flex items-center pr-4 overflow-hidden shadow-xl"
                    >
                        {/* Song Info */}
                        <div className="px-4 py-2 min-w-[120px]">
                            <p className="text-xs text-secondary font-bold whitespace-nowrap">{songs[currentSong].title}</p>
                            <p className="text-[10px] text-gray-400 whitespace-nowrap">{songs[currentSong].artist}</p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                            <button onClick={togglePlay} className="p-1 hover:text-primary transition-colors">
                                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                            </button>

                            <button onClick={() => setIsMuted(!isMuted)} className="p-1 hover:text-primary transition-colors">
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>

                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={(e) => {
                                    setVolume(parseFloat(e.target.value));
                                    setIsMuted(false);
                                }}
                                className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsMinimized(!isMinimized)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 ${isPlaying ? 'bg-secondary/20 text-secondary animate-pulse-slow' : 'bg-gray-900 border border-gray-700 text-gray-400'}`}
            >
                {isMinimized ? <Music size={20} /> : <Minimize2 size={20} />}
            </motion.button>
        </div>
    );
};

export default MusicPlayer;
