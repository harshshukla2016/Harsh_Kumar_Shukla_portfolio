import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import profileImg from '../assets/profile_transparent.png';
import resumePdf from '../assets/Harsh_Kumar_Shukla_Resume_fresher.pdf';
import { usePortfolio } from '../context/PortfolioContext';

// Reusable geometry to avoid recreation
const particleGeometry = new THREE.OctahedronGeometry(0.2, 0);

const Explosion = ({ position, onComplete }: { position: THREE.Vector3, onComplete: () => void }) => {
    const group = useRef<THREE.Group>(null!);

    // Initialize particles once
    const particles = useRef<any[]>([]);
    if (particles.current.length === 0) {
        particles.current = [...Array(12)].map(() => ({
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.4, // Increased speed
                (Math.random() - 0.5) * 0.4,
                (Math.random() - 0.5) * 0.4
            ),
            color: Math.random() > 0.5 ? '#00f3ff' : '#ff00ff',
            scale: Math.random() * 0.5 + 0.5,
            rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0)
        }));
    }

    useFrame(() => {
        if (!group.current) return;
        let active = false;
        group.current.children.forEach((child, i) => {
            const p = particles.current[i];
            child.position.add(p.velocity); // No need to create new vector
            child.scale.multiplyScalar(0.92); // Faster fade
            child.rotation.x += 0.1;
            child.rotation.y += 0.1;
            if (child.scale.x > 0.01) active = true;
        });
        if (!active) onComplete();
    });

    return (
        <group ref={group} position={position}>
            {particles.current.map((p, i) => (
                <mesh key={i} rotation={p.rotation} scale={[p.scale, p.scale, p.scale]} geometry={particleGeometry}>
                    <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={2} toneMapped={false} transparent opacity={0.8} />
                </mesh>
            ))}
        </group>
    );
};

const InteractiveStarField = () => {
    const [explosions, setExplosions] = useState<{ id: number; position: THREE.Vector3 }[]>([]);

    const handleClick = (e: any) => {
        e.stopPropagation();
        setExplosions(prev => [...prev, { id: Date.now(), position: e.point }]);
    };

    const removeExplosion = (id: number) => {
        setExplosions(prev => prev.filter(e => e.id !== id));
    };

    return (
        <>
            <mesh onClick={handleClick} visible={false}>
                <planeGeometry args={[100, 100]} />
            </mesh>
            {explosions.map(ex => (
                <Explosion
                    key={ex.id}
                    position={ex.position}
                    onComplete={() => removeExplosion(ex.id)}
                />
            ))}
        </>
    );
};

function RotatingShape({ color }: { color: string }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={[2, 0, 0]}> {/* Moved to right to balance image on left */}
            <icosahedronGeometry args={[2.5, 0]} />
            <meshStandardMaterial
                color={color}
                wireframe
                transparent
                opacity={0.3}
                emissive={color}
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

const QRModal = ({ isOpen, onClose, data, color }: any) => {
    const { motion, AnimatePresence } = require('framer-motion');
    const { X, Download, Share2 } = require('lucide-react');
    
    // Generate QR link using a public API
    const profileUrl = window.location.href;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(profileUrl)}&color=${color.replace('#', '')}&bgcolor=000000`;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-surface border border-white/10 p-8 rounded-[2rem] max-w-sm w-full relative text-center shadow-2xl shadow-primary/20"
                        onClick={e => e.stopPropagation()}
                    >
                        <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                            <X size={24} />
                        </button>

                        <div className="mb-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                <Share2 className="text-primary" size={32} />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Network Link</h3>
                            <p className="text-white/40 text-xs font-mono mt-1 uppercase tracking-tighter">Scan to sync profile</p>
                        </div>

                        <div className="bg-black p-4 rounded-3xl border border-white/5 relative group">
                            <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all rounded-full"></div>
                            <img src={qrUrl} alt="Profile QR" className="w-full aspect-square relative z-10" />
                        </div>

                        <div className="mt-8 space-y-3">
                            <p className="text-[10px] text-white/30 font-mono leading-relaxed px-4">
                                This QR contains your secure uplink to Harsh's professional network, portfolio, and resume.
                            </p>
                            <div className="flex gap-2">
                                <button onClick={() => window.print()} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 border border-white/10">
                                    <Download size={14} /> SAVE CARD
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Hero = () => {
    const { data, theme } = usePortfolio();
    const [qrOpen, setQrOpen] = useState(false);
    
    const themeColors: Record<string, string> = {
        cyan: "#00f3ff",
        magenta: "#ff00ff",
        amber: "#f59e0b",
        emerald: "#10b981",
        ruby: "#ef4444"
    };

    const currentColor = themeColors[theme] || themeColors.cyan;

    return (
        <section id="hero" className="relative w-full h-screen flex items-center overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color={currentColor} />
                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                    <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color={currentColor} />
                    <InteractiveStarField />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <RotatingShape color={currentColor} />
                    </Float>
                </Canvas>
            </div>

            {/* Image Container */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="hidden md:flex md:absolute md:bottom-0 md:left-0 z-10 w-full md:w-[40%] h-[80%] items-end justify-start pointer-events-none"
            >
                <div className="relative w-full h-full flex items-end">
                    <img
                        src={profileImg}
                        alt="Harsh Kumar Shukla"
                        className="w-full h-full object-contain object-bottom opacity-90"
                    />
                </div>
            </motion.div>

            <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-start md:items-center h-full pointer-events-none pt-48 md:pt-0">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 md:ml-auto text-center md:text-left mt-8 md:mt-0 order-1 md:order-none pointer-events-auto"
                >
                    <h2 className="text-lg md:text-2xl text-primary font-mono tracking-widest mb-2 md:mb-4 uppercase">System Initialized</h2>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-4 md:mb-6 text-gradient leading-tight" dangerouslySetInnerHTML={{ __html: data.hero.mainHeadline.replace(' ', '<br />') }}>
                    </h1>
                    <h3 className="text-xl md:text-3xl text-gray-300 font-light mb-6 md:mb-8">
                        <span dangerouslySetInnerHTML={{ __html: data.hero.subHeadline.replace('&', '<span class="text-secondary font-semibold block sm:inline">&</span>') }}></span>
                    </h3>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                        <a
                            href="#contact"
                            className="px-8 py-4 rounded-xl bg-primary text-black font-bold tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                        >
                            INITIATE CONTACT
                        </a>
                        <button
                            onClick={() => setQrOpen(true)}
                            className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold tracking-widest text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            NETWORKING MODE
                        </button>
                    </div>
                </motion.div>
            </div>

            <QRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} data={data} color={currentColor} />

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
                <a href="#about" className="text-white/20 hover:text-primary transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </a>
            </div>
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-black pointer-events-none z-10"></div>
        </section>
    );
};

export default Hero;
