"use client"

import { Canvas } from "@react-three/fiber"
import { Float } from "@react-three/drei"

function Particles() {
  return (
    <group>
      {Array.from({ length: 32 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.02} rotationIntensity={0.8} floatIntensity={1.3}>
          <mesh position={[
            Math.sin(i) * 3,
            Math.cos(i * 1.3) * 1.8,
            -Math.random() * 3
          ]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color={i % 2 ? "#22d3ee" : "#a855f7"} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function ParticleBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ pointerEvents: "none" }}>
        <ambientLight intensity={1.5} />
        <Particles />
      </Canvas>
    </div>
  )
}
