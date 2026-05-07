import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Bar = ({ position, height, color }: { position: [number, number, number], height: number, color: string }) => {
    return (
        <mesh position={position}>
            <boxGeometry args={[0.25, height, 0.25]} />
            <meshStandardMaterial 
                color={color} 
                emissive={color} 
                emissiveIntensity={0.2} 
                roughness={0.3}
                metalness={0.8}
            />
        </mesh>
    );
};

const ContributionGrid = () => {
    const groupRef = useRef<THREE.Group>(null!);

    // GitHub Green Palette
    const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

    const rows = 7; // Days of week
    const cols = 15; // Weeks

    const bars = useMemo(() => {
        const temp = [];
        
        for (let x = 0; x < cols; x++) {
            for (let z = 0; z < rows; z++) {
                const level = Math.floor(Math.random() * 5); // Mock intensity
                const height = level === 0 ? 0.05 : level * 0.4;
                const color = colors[level];
                
                temp.push(
                    <Bar 
                        key={`${x}-${z}`} 
                        position={[x * 0.35 - (cols * 0.35) / 2, height / 2, z * 0.35 - (rows * 0.35) / 2]} 
                        height={height} 
                        color={color} 
                    />
                );
            }
        }
        return temp;
    }, []);

    return (
        <group ref={groupRef}>
            {bars}
            
            {/* Grid Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[6, 3]} />
                <meshStandardMaterial color="#111" transparent opacity={0.8} />
            </mesh>

            {/* Axis Labels */}
            <Text
                position={[-(cols * 0.35) / 2 - 0.5, 0, 0]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                fontSize={0.2}
                color="#666"
            >
                DAYS
            </Text>
            <Text
                position={[0, 0, (rows * 0.35) / 2 + 0.5]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.2}
                color="#666"
            >
                WEEKS (COMMIT VELOCITY)
            </Text>
        </group>
    );
};

const GitHub3D = () => {
    return (
        <div className="w-full h-[350px] bg-black/40 rounded-2xl border border-white/10 overflow-hidden relative group">
            <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">Data Visualization</span>
                <h4 className="text-sm text-white font-display font-bold">Contribution City v2.0</h4>
            </div>
            
            <Canvas camera={{ position: [4, 4, 4], fov: 40 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#39d353" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
                
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <ContributionGrid />
                </Float>
                
                <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
            </Canvas>

            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map(l => (
                        <div key={l} className="w-2 h-2 rounded-sm" style={{ backgroundColor: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'][l] }}></div>
                    ))}
                </div>
                <span className="text-[10px] text-gray-500 font-mono uppercase">Activity Legend</span>
            </div>
        </div>
    );
};

export default GitHub3D;
