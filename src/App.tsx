import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Trampoline from './Trampoline.tsx'
import Girl from './Girl.tsx'

export default function App() {
  return (
    <Canvas>
      <OrbitControls />
      <Trampoline />
      <Girl />
    </Canvas>
  )
}
