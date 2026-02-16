import { useRef } from 'react'
import * as THREE from 'three'

// Torii Gate Component
// Scale: ~4m tall
export default function Torii(props: any) {
  const group = useRef<THREE.Group>(null!)
  const vermilion = '#e74c3c' // Typical shrine red
  const black = '#222'

  return (
    <group ref={group} {...props}>
      {/* Left Pillar */}
      <mesh position={[-1.5, 2, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 4, 16]} />
        <meshStandardMaterial color={vermilion} />
      </mesh>
      {/* Right Pillar */}
      <mesh position={[1.5, 2, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 4, 16]} />
        <meshStandardMaterial color={vermilion} />
      </mesh>
      
      {/* Top Beam (Kasagi) - Curved slightly? No, keeping it simple box for now */}
      <mesh position={[0, 3.8, 0]}>
        <boxGeometry args={[4.2, 0.3, 0.4]} />
        <meshStandardMaterial color={vermilion} />
      </mesh>
      {/* Top Beam Cap (Black) */}
       <mesh position={[0, 3.96, 0]}>
        <boxGeometry args={[4.3, 0.05, 0.42]} />
        <meshStandardMaterial color={black} />
      </mesh>

      {/* Secondary Beam (Nuki) */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[3.6, 0.2, 0.3]} />
        <meshStandardMaterial color={vermilion} />
      </mesh>
      
      {/* Name Plaque (Gaku) */}
      <mesh position={[0, 3.4, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.1]} />
        <meshStandardMaterial color={black} />
      </mesh>
    </group>
  )
}
