"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function AtomNode({ position, color, size = 0.15 }: { position: [number, number, number]; color: string; size?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.5;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  );
}

function BondLine({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <line geometry={geo} {...({} as any)}>
      <lineBasicMaterial color={color} opacity={0.4} transparent />
    </line>
  );
}

function CoreOrb({ color, speed = 1 }: { color: string; speed?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh scale={0.75}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

function OrbitingAtoms({ color, count = 6, radius = 1.8 }: { color: string; count?: number; radius?: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.4;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });
  const positions: [number, number, number][] = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return [Math.cos(angle) * radius, Math.sin(angle * 0.5) * 0.4, Math.sin(angle) * radius];
      }),
    [count, radius]
  );
  return (
    <group ref={group}>
      {positions.map((pos, i) => (
        <AtomNode key={i} position={pos} color={color} size={0.08 + (i % 3) * 0.04} />
      ))}
      {positions.map((pos, i) => (
        <BondLine key={`b${i}`} start={pos} end={positions[(i + 1) % positions.length]} color={color} />
      ))}
    </group>
  );
}

function RingSystem({ color }: { color: string }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ring.current) {
      ring.current.rotation.x = state.clock.elapsedTime * 0.15;
      ring.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });
  return (
    <mesh ref={ring}>
      <torusGeometry args={[2.2, 0.015, 8, 80]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.5} />
    </mesh>
  );
}

interface MoleculeOrbProps {
  color?: string;
  size?: number;
  interactive?: boolean;
}

export default function MoleculeOrb({ color = "#00d4ff", size = 300, interactive = false }: MoleculeOrbProps) {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color={color} intensity={2} />
        <pointLight position={[-10, -10, -10]} color={color} intensity={0.5} />
        <CoreOrb color={color} />
        <OrbitingAtoms color={color} count={8} radius={1.8} />
        <RingSystem color={color} />
        <Stars radius={10} depth={5} count={300} factor={1} saturation={0} fade speed={0.5} />
        {interactive && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  );
}
