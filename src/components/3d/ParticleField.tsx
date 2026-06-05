"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 200, color = "#00d4ff" }: { count?: number; color?: string }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      spd[i] = 0.002 + Math.random() * 0.005;
    }
    return [pos, spd];
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y += 0.0005;
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points ref={mesh} geometry={geo}>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleField({
  color = "#00d4ff",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Particles count={300} color={color} />
      </Canvas>
    </div>
  );
}
