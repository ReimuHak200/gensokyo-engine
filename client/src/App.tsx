import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Sky } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useState, useRef } from 'react'
import Torii from './components/world/Torii'
import Honden from './components/world/Honden'
import Reimu from './components/characters/Reimu'
import Youkai from './components/characters/Youkai'
import HUD from './components/ui/HUD'
import { useGameStore } from './store'

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#2ecc71" />
    </mesh>
  )
}

function Path() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 5]} receiveShadow>
       <planeGeometry args={[2, 12]} />
       <meshStandardMaterial color="#95a5a6" />
    </mesh>
  )
}

function Lantern(props: any) {
    return (
        <group {...props}>
             {/* Base */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[0.4, 1, 0.4]} />
                <meshStandardMaterial color="#7f8c8d" />
            </mesh>
             {/* Light Box */}
            <mesh position={[0, 1.2, 0]}>
                <boxGeometry args={[0.5, 0.6, 0.5]} />
                <meshStandardMaterial color="#e67e22" emissive="#d35400" emissiveIntensity={0.5} />
            </mesh>
             {/* Roof */}
            <mesh position={[0, 1.6, 0]} rotation={[0, Math.PI/4, 0]}>
                <coneGeometry args={[0.6, 0.4, 4]} />
                <meshStandardMaterial color="#34495e" />
            </mesh>
        </group>
    )

}

function TimeSystem() {
    // Select stable tick function
    const tick = useGameStore((state) => state.tick)
    
    useEffect(() => {
        // Tick every 200ms (5 times per second)
        const interval = setInterval(() => {
             tick()
        }, 200) 
        return () => clearInterval(interval)
    }, [tick])

    return null
}


export default function App() {
  const { time, addFaith } = useGameStore()

  // Calculate Sun Position based on Time (0-24)
  // Noon (12) = [0, 10, 0] (High)
  // Sunset (18) = [10, 0, 0] (Low)
  const sunAngle = ((time - 6) / 12) * Math.PI // 6am to 6pm arc
  // Simple orbit:
  const sunX = Math.cos(sunAngle) * 50
  const sunY = Math.sin(sunAngle) * 50
  const sunZ = 10

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas shadows camera={{ position: [5, 5, 10], fov: 60 }}>
        <TimeSystem />
        <Sky sunPosition={[sunX, Math.max(sunY, -10), sunZ]} turbidity={0.1} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
        <ambientLight intensity={Math.max(0.1, sunY / 50)} />
        <directionalLight 
          position={[sunX, sunY, sunZ]} 
          intensity={Math.max(0, sunY / 25)} 
          castShadow 
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048}
        />
        
        {/* World Objects */}
        <Torii position={[0, 0, 8]} scale={[1.5, 1.5, 1.5]} />
        <Honden position={[0, 0, -2]} scale={[1.2, 1.2, 1.2]} rotation={[0, 0, 0]} />
        
        {/* Stone Path */}
        <Path />
        
        {/* --- Characters --- */}
        {/* Reimu Patrols */}
        <Reimu position={[0, 0, 4]} />
        
        {/* Youkai Ambush! Click to exorcise! */}
        <Youkai position={[-3, 2, 7]} color="hotpink" onClick={() => addFaith(10)} />
        <Youkai position={[3, 1.5, 7.5]} color="cyan" onClick={() => addFaith(15)} />
        <Youkai position={[0.5, 3, 5]} color="gold" onClick={() => addFaith(50)} />

        {/* Stone Lanterns lining the path */}
        <Lantern position={[-2, 0, 6]} />
        <Lantern position={[2, 0, 6]} />
        <Lantern position={[-2, 0, 3]} />
        <Lantern position={[2, 0, 3]} />

        <Ground />
        <OrbitControls maxPolarAngle={Math.PI / 2 - 0.1} /> {/* Prevent camera going underground */}
      </Canvas>
      <HUD />
    </div>
  )
}
