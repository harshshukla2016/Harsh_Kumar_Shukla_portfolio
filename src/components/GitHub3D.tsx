import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Bar = ({ position, height, color }: { position: [number, number, number], height: number, color: string }) => {
    return (
        <mesh position={position}>
            <boxGeometry args={[0.2, height, 0.2]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
    );
};

const ContributionScene = () => {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    });

    // Generate random mock contribution data
    const bars = [];
    for (let x = -2; x <= 2; x += 0.4) {
        for (let z = -2; z <= 2; z += 0.4) {
            const h = Math.random() * 2 + 0.1;
            const intensity = h / 2.1;
            const color = `rgb(${Math.floor(0 * intensity)}, ${Math.floor(243 * intensity)}, ${Math.floor(255 * intensity)})`;
            bars.push(<Bar key={`${x}-${z}`} position={[x, h / 2, z]} height={h} color={color} />);
        }
    }

    return (
        <group ref={groupRef}>
            {bars}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[5, 5]} />
                <meshStandardMaterial color="#111" transparent opacity={0.5} />
            </mesh>
        </group>
    );
};

const GitHub3D = () => {
    return (
        <div className="w-full h-[300px] bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
            <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ContributionScene />
                </Float>
            </Canvas>
            <div className="absolute bottom-4 left-4 flex flex-col">
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest">Git Visualization</span>
                <span className="text-xs text-white/40 font-mono">Live Contribution Mesh</span>
            </div>
        </div>
    );
};

export default GitHub3D;
