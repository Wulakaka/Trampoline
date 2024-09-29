import { useControls } from 'leva'

export default function Trampoline() {
  const { color } = useControls('Trampoline', {
    color: { value: 'lightblue', label: 'Color' },
  })

  return (
    <mesh>
      <cylinderGeometry args={[2, 2, 0.01, 6]}></cylinderGeometry>
      <meshBasicMaterial color={color}></meshBasicMaterial>
    </mesh>
  )
}
