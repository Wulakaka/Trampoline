import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Trampoline from './Trampoline.tsx'

export default function App() {
  return (
    <Canvas>
      <OrbitControls />
      <Trampoline />
      <ambientLight intensity={0.1} />
    </Canvas>
  )
}
