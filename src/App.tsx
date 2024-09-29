import { Canvas } from '@react-three/fiber'
import { OrbitControls, KeyboardControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Trampoline from './Trampoline.tsx'
import Girl from './Girl.tsx'

export default function App() {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['KeyW'] },
        { name: 'backward', keys: ['KeyS'] },
        { name: 'leftward', keys: ['KeyA'] },
        { name: 'rightward', keys: ['KeyD'] },
        { name: 'jump', keys: ['Space'] },
      ]}
    >
      <Canvas camera={{ position: [0, 2, 4] }}>
        <OrbitControls />
        <Physics debug={true}>
          <Trampoline />
          <Girl />
        </Physics>
      </Canvas>
    </KeyboardControls>
  )
}
