import { useRef } from 'react'
import * as THREE from 'three'

// Simple Shrine Hall (Honden)
export default function Honden(props: any) {
  const group = useRef<THREE.Group>(null!)
  
  const wood = '#d35400' // Darkish wood
  const tile = '#34495e' // Blue-grey roof tiles
  const stone = '#95a5a6' // Concrete/stone base
  const white = '#ecf0f1' // Plaster walls

  return (
    <group ref={group} {...props}>
      {/* Stone Foundation */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[5, 1, 4]} />
        <meshStandardMaterial color={stone} />
      </mesh>

      {/* Main Structure (Walls) */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4, 2, 3]} />
        <meshStandardMaterial color={wood} />
      </mesh>
      
      {/* Veranda (Engawa) - extended floor */}
      <mesh position={[0, 1.1, 1.8]}>
        <boxGeometry args={[4.2, 0.2, 1]} />
        <meshStandardMaterial color={wood} />
      </mesh>
      
      {/* Veranda Steps */}
      <mesh position={[0, 0.5, 2.5]}>
         <boxGeometry args={[2, 0.2, 0.5]} />
         <meshStandardMaterial color={stone} />
      </mesh>
       <mesh position={[0, 0.2, 2.8]}>
         <boxGeometry args={[2, 0.2, 0.5]} />
         <meshStandardMaterial color={stone} />
      </mesh>

      {/* Roof (Simplified Pyramid/Sloped) */}
      <group position={[0, 3.5, 0]}>
        {/* Main Roof Slope */}
        <mesh rotation={[0, Math.PI / 4, 0]}> 
          {/* Using a Cone for simplicity, scaled flat */}
          <coneGeometry args={[3.5, 2, 4]} />
          <meshStandardMaterial color={tile} flatShading={true} />
        </mesh>
        {/* Ridge Beam */}
        <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI/2]}>
           <cylinderGeometry args={[0.2, 0.2, 4.5, 8]} />
           <meshStandardMaterial color={'#2c3e50'} />
        </mesh>
      </group>

      {/* Offering Box (Saisenbako) - Very Important! */}
      <mesh position={[0, 1.4, 2]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.5]} />
        <meshStandardMaterial color={wood} />
        {/* Slats detail */}
        <mesh position={[0, 0.26, 0]}>
             <planeGeometry args={[0.7, 0.4]} />
             <meshStandardMaterial color={'#e67e22'} />
        </mesh>
      </mesh>
    </group>
  )
}
