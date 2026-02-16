import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Reimu(props: any) {
  const group = useRef<THREE.Group>(null!)
  const broomRef = useRef<THREE.Group>(null!)
  
  // State for sweeping animation
  const [direction, setDirection] = useState(1) // 1 = moving right, -1 = moving left
  
  useFrame((state, delta) => {
    if (!group.current) return

    // 1. Walking Motion (Back and Forth)
    // Limits: z position between 2 and 6 (along the path)
    const speed = 1.5 * delta
    group.current.position.z += speed * direction

    if (group.current.position.z > 6) {
      setDirection(-1)
      group.current.rotation.y = Math.PI // Face shrine
    } else if (group.current.position.z < 2) {
      setDirection(1)
      group.current.rotation.y = 0 // Face gate
    }

    // 2. Bobbing (Walking bounce)
    group.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.05

    // 3. Sweeping Action (Rotate broom)
    if (broomRef.current) {
        broomRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 5) * 0.5
    }
  })

  return (
    <group ref={group} {...props}>
      {/* --- Body --- */}
      
      {/* Head */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#ffe0bd" /> {/* Skin */}
      </mesh>
      
      {/* Hair (Black, long) */}
      <mesh position={[0, 1.45, -0.1]}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      
      {/* Big Red Ribbon */}
      <mesh position={[0, 1.7, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.6, 0.2, 0.1]} />
          <meshStandardMaterial color="red" />
      </mesh>

      {/* Torso (White top) */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 0.6, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Skirt (Red) */}
      <mesh position={[0, 0.4, 0]}>
         <coneGeometry args={[0.4, 0.8, 16]} />
         <meshStandardMaterial color="red" />
      </mesh>

      {/* --- Broom --- */}
      <group ref={broomRef} position={[0.3, 0.8, 0.3]} rotation={[0, 0, Math.PI / 4]}>
          {/* Handle */}
          <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 1.5]} />
              <meshStandardMaterial color="#8e44ad" /> {/* Bamboo? */}
          </mesh>
          {/* Bristles */}
          <mesh position={[0, -0.3, 0]}>
              <coneGeometry args={[0.15, 0.4, 8]} />
              <meshStandardMaterial color="#f1c40f" />
          </mesh>
      </group>

    </group>
  )
}
