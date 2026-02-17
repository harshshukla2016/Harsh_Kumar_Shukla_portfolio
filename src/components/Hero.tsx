import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import profileImg from '../assets/profile_transparent.png';
import resumePdf from '../assets/Harsh_Kumar_Shukla_Resume_fresher.pdf';

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

function RotatingShape() {
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
                color="#7000ff"
                wireframe
                transparent
                opacity={0.3}
                emissive="#7000ff"
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

const Hero = () => {
    return (
        <section id="hero" className="relative w-full h-screen flex items-center overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                    <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#00f3ff" />
                    <InteractiveStarField />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <RotatingShape />
                    </Float>
                </Canvas>
            </div>

            {/* Image Container - Absolute Left on Desktop, resized to ~80% */}
            {/* Image Container - Absolute Left on Desktop, resized to ~80% */}
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

                {/* Text Content - Right Aligned (using ml-auto) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 md:ml-auto text-center md:text-left mt-8 md:mt-0 order-1 md:order-none pointer-events-auto"
                >
                    <h2 className="text-lg md:text-2xl text-primary font-mono tracking-wider mb-2 md:mb-4">HELLO, I AM</h2>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-4 md:mb-6 text-gradient neon-text-cyan leading-tight">
                        Harsh Kumar<br />Shukla
                    </h1>
                    <h3 className="text-xl md:text-3xl text-gray-300 font-light mb-6 md:mb-8">
                        SAP SD Consultant & <span className="text-secondary font-semibold block sm:inline">Software Engineer</span>
                    </h3>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                        <a
                            href="#contact"
                            className="px-6 py-3 rounded-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 neon-glow font-bold tracking-wide text-sm md:text-base"
                        >
                            CONTACT ME
                        </a>
                        <a
                            href={resumePdf}
                            download="Harsh_Kumar_Shukla_Resume.pdf"
                            className="px-6 py-3 rounded-full bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-black transition-all duration-300 neon-glow font-bold tracking-wide text-sm md:text-base"
                        >
                            GET RESUME
                        </a>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
                <a href="#about" className="text-gray-400 hover:text-primary transition-colors">
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </a>
            </div>
            {/* Smooth transition to About section */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-surface pointer-events-none z-10"></div>
        </section>
    );
};

export default Hero;
