"use client";
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Data ───────────────────────────────────── */
const BENEFITS = [
  {
    id: 0,
    label: "Angiogenesis",
    desc: "Formation of new blood vessels studied in preclinical animal models.",
    pos: [2.3, 0.8, 0.3] as [number, number, number],
    color: "#3b82f6",
  },
  {
    id: 1,
    label: "Tissue Repair",
    desc: "Cellular repair mechanisms investigated in controlled in vitro environments.",
    pos: [-2.1, 0.6, 0.2] as [number, number, number],
    color: "#3b82f6",
  },
  {
    id: 2,
    label: "Actin Regulation",
    desc: "TB-500 actin-binding domain Ac-LKKTETQ studied for sequestration activity.",
    pos: [0.3, 2.4, -0.6] as [number, number, number],
    color: "#a78bfa",
  },
  {
    id: 3,
    label: "Cell Migration",
    desc: "Directed cell motility and PINCH-ILK-parvin complex interactions.",
    pos: [-0.4, -2.3, 0.5] as [number, number, number],
    color: "#a78bfa",
  },
  {
    id: 4,
    label: "Neuropeptide",
    desc: "Interactions with dopamine, serotonin, and nitric oxide pathways.",
    pos: [1.7, -1.4, -0.9] as [number, number, number],
    color: "#3b82f6",
  },
  {
    id: 5,
    label: "Wound Healing",
    desc: "Preclinical wound closure and re-epithelialization model studies.",
    pos: [-1.6, -0.9, 1.5] as [number, number, number],
    color: "#a78bfa",
  },
  {
    id: 6,
    label: "GI Research",
    desc: "Gastric mucosal protection and cytoprotective mechanism models.",
    pos: [0.9, 1.4, 2.2] as [number, number, number],
    color: "#3b82f6",
  },
  {
    id: 7,
    label: "Cardiac Models",
    desc: "Cardiomyocyte studies and cardiac fibrosis research applications.",
    pos: [-1.2, 1.7, 1.7] as [number, number, number],
    color: "#a78bfa",
  },
];

/* ─── Connection line ─────────────────────────── */
function ConnectionLine({
  from,
  to,
  color,
  bright,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  bright: boolean;
}) {
  const points = useMemo(() => [new THREE.Vector3(...from), new THREE.Vector3(...to)], [from, to]);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const mat = useRef<THREE.LineBasicMaterial>(null);

  useFrame((state) => {
    if (!mat.current) return;
    if (bright) {
      mat.current.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2.5) * 0.3;
    } else {
      mat.current.opacity = THREE.MathUtils.lerp(mat.current.opacity, 0.12, 0.04);
    }
  });

  return (
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    <line geometry={geo} {...({} as any)}>
      <lineBasicMaterial ref={mat} color={color} opacity={bright ? 0.6 : 0.12} transparent />
    </line>
  );
}

/* ─── Benefit node ─────────────────────────────── */
function BenefitNode({
  benefit,
  hovered,
  onHover,
}: {
  benefit: (typeof BENEFITS)[0];
  hovered: boolean;
  onHover: (id: number | null) => void;
}) {
  const mesh  = useRef<THREE.Mesh>(null);
  const glow  = useRef<THREE.Mesh>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (!mesh.current || !glowMat.current) return;
    const targetScale = hovered ? 1.6 : 1;
    mesh.current.scale.setScalar(
      THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, 0.12)
    );
    glowMat.current.opacity = THREE.MathUtils.lerp(
      glowMat.current.opacity,
      hovered ? 0.22 : 0,
      0.1
    );
  });

  return (
    <group position={benefit.pos}>
      {/* Glow halo */}
      <mesh ref={glow} scale={2.8}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshBasicMaterial ref={glowMat} color={benefit.color} transparent opacity={0} />
      </mesh>

      {/* Main node */}
      <mesh
        ref={mesh}
        onPointerEnter={() => onHover(benefit.id)}
        onPointerLeave={() => onHover(null)}
      >
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial
          color={benefit.color}
          emissive={benefit.color}
          emissiveIntensity={hovered ? 0.9 : 0.35}
          roughness={0.15}
          metalness={0.35}
        />
      </mesh>

      {/* Always-visible small label */}
      {!hovered && (
        <Html
          center
          distanceFactor={9}
          position={[0, 0.28, 0]}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "10px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            {benefit.label}
          </div>
        </Html>
      )}

      {/* Hover tooltip */}
      {hovered && (
        <Html
          center
          distanceFactor={6}
          position={[0.4, 0.1, 0]}
          style={{ pointerEvents: "none", zIndex: 10 }}
        >
          <div
            style={{
              background: "rgba(8,8,16,0.92)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "12px 16px",
              width: "170px",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: "system-ui, sans-serif",
                marginBottom: "5px",
              }}
            >
              {benefit.label}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "11px",
                lineHeight: 1.5,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {benefit.desc}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

/* ─── Central compound orb ────────────────────── */
function CenterCore() {
  const inner = useRef<THREE.Mesh>(null);
  const outer = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (inner.current) {
      inner.current.rotation.y = t * 0.35;
      inner.current.rotation.x = t * 0.18;
    }
    if (outer.current) {
      outer.current.rotation.x = t * 0.22;
      outer.current.rotation.z = t * 0.14;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.25}>
      {/* Solid core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.48, 2]} />
        <meshStandardMaterial
          color="#1d4ed8"
          emissive="#2563eb"
          emissiveIntensity={0.6}
          roughness={0.08}
          metalness={0.6}
        />
      </mesh>
      {/* Wireframe shell */}
      <mesh ref={outer} scale={1.38}>
        <icosahedronGeometry args={[0.48, 1]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.25}
          wireframe
          transparent
          opacity={0.32}
        />
      </mesh>
      {/* Outer pulsing ring */}
      <mesh scale={1.9}>
        <torusGeometry args={[0.48, 0.008, 8, 64]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

/* ─── Main scene ──────────────────────────────── */
function Scene() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.07;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.035) * 0.07;
  });

  return (
    <group ref={group}>
      <CenterCore />

      {BENEFITS.map((b) => (
        <group key={b.id}>
          <ConnectionLine
            from={[0, 0, 0]}
            to={b.pos}
            color={b.color}
            bright={hoveredId === b.id}
          />
          <BenefitNode benefit={b} hovered={hoveredId === b.id} onHover={setHoveredId} />
        </group>
      ))}
    </group>
  );
}

/* ─── Export ──────────────────────────────────── */
export default function PeptideGraph({ height = 580 }: { height?: number }) {
  return (
    <div style={{ width: "100%", height }} className="cursor-crosshair">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.08} />
        <pointLight position={[6,  6,  6]}  color="#3b82f6" intensity={4} />
        <pointLight position={[-5, -4, -5]} color="#7c3aed" intensity={2} />
        <pointLight position={[0,  2,  5]}  color="#ffffff"  intensity={0.8} />
        <Scene />
      </Canvas>
    </div>
  );
}
