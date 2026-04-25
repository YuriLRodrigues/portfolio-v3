"use client";

import { useMemo, useRef } from "react";

import { usePortfolioPrimaryHex } from "@/components/home/use-portfolio-primary-hex";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Group, MeshStandardMaterial, TorusKnotGeometry } from "three";

function CodeTorusKnot() {
  const geo = useMemo(() => new TorusKnotGeometry(0.9, 0.28, 200, 32, 2, 3), []);
  const matRef = useRef<MeshStandardMaterial | null>(null);
  const group = useRef<Group>(null);
  const color = usePortfolioPrimaryHex();

  useFrame((_, delta) => {
    const m = matRef.current;
    const gr = group.current;
    if (m) {
      m.emissiveIntensity = 0.5 + 0.35 * Math.sin(performance.now() * 0.002);
    }
    if (gr) {
      gr.rotation.x += delta * 0.45;
      gr.rotation.y += delta * 0.62;
    }
  });

  return (
    <Float speed={1.75} floatIntensity={0.55} rotationIntensity={0.35}>
      <group ref={group}>
        <mesh geometry={geo} castShadow receiveShadow>
          <meshStandardMaterial ref={matRef} color={color} metalness={0.25} roughness={0.35} emissive={color} emissiveIntensity={0.55} wireframe />
        </mesh>
        <mesh position={[0, 0, 0.12]}>
          <icosahedronGeometry args={[0.5, 1]} />
          <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.2} roughness={0.2} metalness={0.6} distort={0.32} speed={2.2} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Cena 3D leve: nó toroidal em arame + ícosaedro com material distorcido (stack dev).
 */
export function Hero3D() {
  return (
    <div className="relative h-[min(50vh,420px)] w-full min-h-[220px] [contain:strict]">
      <Canvas
        className="h-full w-full"
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 2, 4]} intensity={1.1} castShadow />
        <pointLight position={[-2, 1, 2]} intensity={0.6} color="#aef" />
        <CodeTorusKnot />
      </Canvas>
    </div>
  );
}
