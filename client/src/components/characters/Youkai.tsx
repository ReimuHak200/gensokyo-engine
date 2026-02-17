import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Youkai(props: any) {
  const mesh = useRef<THREE.Mesh>(null!)
  
  // Use useMemo so these values persist across re-renders!
  const { speed, offset, rotationSpeed } = useMemo(() => ({
      speed: Math.random() * 2 + 1,
      offset: Math.random() * 10,
      rotationSpeed: { x: Math.random() * 0.02, y: Math.random() * 0.02 }
  }), [])
  
  useFrame((state) => {
    if (!mesh.current) return
    
    // Float up and down (Smooth Sine Wave)
    const t = state.clock.elapsedTime
    mesh.current.position.y = props.position[1] + Math.sin(t * speed + offset) * 0.5
    
    // Rotate chaotically but smoothly
    mesh.current.rotation.x += rotationSpeed.x
    mesh.current.rotation.y += rotationSpeed.y
  })

  return (
    <mesh ref={mesh} {...props} onClick={(e) => {
      e.stopPropagation() // Prevent clicking through to ground
      props.onClick && props.onClick()
    }}>
      {/* Simple Shape: Icosahedron (looks like a geometric spirit) */}
      <icosahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color={props.color || "purple"} emissive={props.color || "purple"} emissiveIntensity={0.5} wireframe />
    </mesh>
  )
}
