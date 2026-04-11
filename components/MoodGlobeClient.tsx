"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Sphere, Environment } from "@react-three/drei"

function GlobeCore() {
  return (
    <Float speed={1.1} rotationIntensity={0.6} floatIntensity={1.1}>
      <group>
        <Sphere args={[1.1, 64, 64]}>
          <meshStandardMaterial color="#0f172a" roughness={0.35} metalness={0.25} />
        </Sphere>
        <mesh>
          <sphereGeometry args={[1.15, 64, 64]} />
          <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.35} />
        </mesh>
      </group>
    </Float>
  )
}

export default function MoodGlobeClient() {
  return (
    <div className="h-[380px] rounded-3xl border border-white/10 bg-slate-950/70">
      <Canvas camera={{ position: [0, 0, 3.4], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 3, 2]} intensity={2.5} />
        <GlobeCore />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
