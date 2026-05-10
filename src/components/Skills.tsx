import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolio } from '../context/PortfolioContext';

const SkillStar = ({ name, proficiency, position, color }: any) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        meshRef.current.position.y += Math.sin(t + position[0]) * 0.002;
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <mesh ref={meshRef}>
                    <icosahedronGeometry args={[proficiency / 10, 1]} />
                    <meshStandardMaterial 
                        color={color} 
                        emissive={color} 
                        emissiveIntensity={2} 
                        wireframe 
                        transparent 
                        opacity={0.6} 
                    />
                </mesh>
            </Float>
            <Text
                position={[0, -0.8, 0]}
                fontSize={0.25}
                color="white"
                anchorX="center"
            >
                {name}
            </Text>
        </group>
    );
};

const SkillConstellation = () => {
    const { data, theme } = usePortfolio();
    
    const themeColors: Record<string, string> = {
        cyan: "#00f3ff",
        magenta: "#ff00ff",
        amber: "#f59e0b",
        emerald: "#10b981",
        ruby: "#ef4444"
    };
    const currentColor = themeColors[theme] || themeColors.cyan;

    const allSkills = useMemo(() => {
        if (!data || !data.skills) return [];

        const parse = (str: any) => {
            if (typeof str !== 'string') return [];
            return str.split(',').filter(Boolean).map((s: string) => ({ name: s.trim(), prof: 8 }));
        };

        const skills = [
            ...parse(data.skills.frontend),
            ...parse(data.skills.backend),
            ...parse(data.skills.sap),
        ];

        return skills.map((s, i) => ({
            ...s,
            position: [
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 4
            ] as [number, number, number]
        }));
    }, [data.skills]);

    return (
        <div className="h-[500px] md:h-[600px] w-full relative bg-black/40 rounded-[3rem] border border-white/5 overflow-hidden group shadow-2xl">
            <React.Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-primary font-mono text-xs animate-pulse">Initializing Constellation...</div>}>
                <Canvas camera={{ position: [0, 0, 12] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color={currentColor} />
                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                    <Sparkles count={150} scale={10} size={2} speed={0.5} color={currentColor} />
                    
                    {allSkills.map((skill, i) => (
                        <SkillStar 
                            key={`${theme}-${i}`} 
                            name={skill.name} 
                            proficiency={skill.prof} 
                            position={skill.position} 
                            color={currentColor} 
                        />
                    ))}
                </Canvas>
            </React.Suspense>
            
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_black_70%)] opacity-60"></div>
            <div className="absolute bottom-8 left-8">
                <p className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.3em] mb-1">Navigation Active</p>
                <p className="text-white/20 text-[9px] font-mono uppercase">Drag to explore the knowledge nebula</p>
            </div>
        </div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-black relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="text-[10px] text-primary/20 mb-2 font-mono">NEURAL_LINK_ESTABLISHED_V1.0</div>
                    <h2 className="text-4xl font-display font-bold mb-4 text-gradient">Skill Constellation</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="text-white/40 max-w-xl mx-auto text-sm font-light leading-relaxed font-mono uppercase tracking-widest">
                        Interactive Neural Mapping of Technical Expertise
                    </p>
                </motion.div>

                <SkillConstellation />
            </div>
        </section>
    );
};

export default Skills;
