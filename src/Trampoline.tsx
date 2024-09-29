import { useControls } from 'leva'
import { RigidBody } from '@react-three/rapier'

export default function Trampoline() {
  const { color } = useControls('Trampoline', {
    color: { value: 'lightblue', label: 'Color' },
  })

  return (
    <RigidBody type={'fixed'} restitution={1} colliders={'hull'}>
      <mesh position-y={-0.005}>
        <cylinderGeometry args={[2, 2, 0.01, 6]}></cylinderGeometry>
        <meshBasicMaterial color={color}></meshBasicMaterial>
      </mesh>
    </RigidBody>
  )
}
