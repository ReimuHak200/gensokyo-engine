import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Youkai(props: any) {
  const mesh = useRef<THREE.Mesh>(null!)
  const speed = Math.random() * 2 + 1
  const offset = Math.random() * 10
  
  useFrame((state) => {
    if (!mesh.current) return
    
    // Float up and down
    mesh.current.position.y = 1 + Math.sin(state.clock.elapsedTime * speed + offset) * 0.5
    
    // Rotate chaotically
    mesh.current.rotation.x += 0.01 * speed
    mesh.current.rotation.y += 0.02 * speed
  })

  return (
    <mesh ref={mesh} {...props}>
      {/* Simple Shape: Icosahedron (looks like a geometric spirit) */}
      <icosahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color={props.color || "purple"} emissive={props.color || "purple"} emissiveIntensity={0.5} wireframe />
    </mesh>
  )
}
