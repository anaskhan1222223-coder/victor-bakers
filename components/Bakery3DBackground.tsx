"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type Position = [number, number, number];

function GoldenDonut({
  position,
  scale = 1,
  color = "#f59e0b",
}: {
  position: Position;
  scale?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.18;
      ref.current.rotation.y += delta * 0.26;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={1.2} floatIntensity={2.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.45, 24, 90]} />
        <meshStandardMaterial
          color={color}
          roughness={0.16}
          metalness={0.35}
        />
      </mesh>
    </Float>
  );
}

function CreamBlob({
  position,
  scale = 1,
  color = "#fde68a",
}: {
  position: Position;
  scale?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={0.34}
          speed={1.8}
          roughness={0.1}
          metalness={0.18}
        />
      </mesh>
    </Float>
  );
}

function MiniCake({ position }: { position: Position }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.7} floatIntensity={1.5}>
      <group ref={ref} position={position} scale={0.9}>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[1.25, 1.35, 0.75, 48]} />
          <meshStandardMaterial
            color="#f9a8d4"
            roughness={0.22}
            metalness={0.15}
          />
        </mesh>

        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.88, 0.98, 0.62, 48]} />
          <meshStandardMaterial
            color="#fff7ed"
            roughness={0.18}
            metalness={0.12}
          />
        </mesh>

        <mesh position={[0, 0.78, 0]}>
          <torusGeometry args={[0.62, 0.16, 20, 70]} />
          <meshStandardMaterial
            color="#f59e0b"
            roughness={0.15}
            metalness={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Bakery3DBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[6, 7, 5]} intensity={1.7} color="#fff7ed" />
        <pointLight position={[-7, -4, -6]} intensity={1.35} color="#fbbf24" />
        <pointLight position={[4, 3, -4]} intensity={0.9} color="#fb7185" />

        <GoldenDonut position={[-4.6, 1.7, -2.5]} scale={0.88} color="#f59e0b" />
        <GoldenDonut position={[4.35, -1.9, -3.2]} scale={1.06} color="#fb923c" />

        <CreamBlob position={[3.7, 2.25, -2.4]} scale={0.82} color="#fde68a" />
        <CreamBlob position={[-3.4, -2.25, -2.2]} scale={0.94} color="#fbcfe8" />

        <MiniCake position={[0.3, -2.5, -4.2]} />

        <Sparkles
          count={90}
          scale={[11, 7, 6]}
          size={2.1}
          speed={0.32}
          opacity={0.52}
          color="#fcd34d"
        />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-[#140d08]/80 via-[#140d08]/55 to-[#140d08]/90" />
    </div>
  );
}