"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"

function Orb() {
  return (
    <Float speed={2} rotationIntensity={1.1} floatIntensity={1.2}>
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.7} />
      </mesh>
    </Float>
  )
}

export default function Avatar3D() {
  return (
    <div className="absolute inset-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <ambientLight intensity={1.3} />
        <directionalLight position={[2, 2, 2]} intensity={2} />
        <Orb />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
