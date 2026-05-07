import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const DataNebula = () => {
    const pointsRef = useRef<THREE.Points>(null!);
    const lineRef = useRef<THREE.LineSegments>(null!);

    // Generate static data points for the "Neural Network"
    const { positions, linePositions } = useMemo(() => {
        const count = 40;
        const pos = new Float32Array(count * 3);
        const linePos = [];

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 4;
            const y = (Math.random() - 0.5) * 4;
            const z = (Math.random() - 0.5) * 4;
            pos.set([x, y, z], i * 3);
        }

        // Connect nearby points
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = Math.sqrt(
                    Math.pow(pos[i * 3] - pos[j * 3], 2) +
                    Math.pow(pos[i * 3 + 1] - pos[j * 3 + 1], 2) +
                    Math.pow(pos[i * 3 + 2] - pos[j * 3 + 2], 2)
                );
                if (dist < 1.2) {
                    linePos.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
                    linePos.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
                }
            }
        }

        return { positions: pos, linePositions: new Float32Array(linePos) };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        pointsRef.current.rotation.y = time * 0.1;
        lineRef.current.rotation.y = time * 0.1;
    });

    return (
        <group>
            {/* Core Neural Sphere */}
            <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
                <MeshDistortMaterial
                    color="#00f3ff"
                    emissive="#00f3ff"
                    emissiveIntensity={2}
                    speed={2}
                    distort={0.4}
                    radius={0.5}
                />
            </Sphere>

            {/* Neural Nodes */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <PointMaterial
                    transparent
                    color="#00f3ff"
                    size={0.15}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Neural Connections */}
            <lineSegments ref={lineRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#00f3ff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
            </lineSegments>
        </group>
    );
};

const GitHub3D = () => {
    return (
        <div className="w-full h-[350px] bg-black/40 rounded-3xl border border-white/5 overflow-hidden relative group">
            <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                    <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">Neural Sync Active</span>
                </div>
                <h4 className="text-lg text-white font-display font-bold">Activity Nebula v3.0</h4>
                <p className="text-[10px] text-white/40 font-mono">Synthesizing GitHub contributions into spatial nodes...</p>
            </div>
            
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <DataNebula />
                </Float>
            </Canvas>

            <div className="absolute bottom-6 right-6">
                <span className="text-[10px] text-primary/40 font-mono uppercase tracking-widest border border-primary/20 px-3 py-1 rounded-full">
                    Interactive Neural Mesh
                </span>
            </div>
        </div>
    );
};

export default GitHub3D;
