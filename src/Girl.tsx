import { useControls } from 'leva'

export default function Girl() {
  const { hatColor, headColor, dressColor, socksColor } = useControls('Girl', {
    hatColor: { value: '#35acc1', label: 'Color' },
    headColor: { value: '#35c18c', label: 'Color' },
    dressColor: { value: '#f85454', label: 'Dress Color' },
    socksColor: { value: '#35c18c', label: 'Socks Color' },
  })

  return (
    <group>
      <group position-y={1} rotation-z={0.5} rotation-x={0.1}>
        <mesh position={[0, 0.3, 0]}>
          <coneGeometry args={[0.15, 0.4, 32]}></coneGeometry>
          <meshBasicMaterial color={hatColor}></meshBasicMaterial>
        </mesh>
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]}></sphereGeometry>
          <meshBasicMaterial color={headColor}></meshBasicMaterial>
        </mesh>
      </group>

      <mesh position-y={0.5}>
        <cylinderGeometry args={[0.1, 0.4, 0.6, 32]}></cylinderGeometry>
        <meshBasicMaterial color={dressColor}></meshBasicMaterial>
      </mesh>
      <mesh position-y={0.1} position-z={0.1}>
        <cylinderGeometry args={[0.06, 0.05, 0.2, 32]}></cylinderGeometry>
        <meshBasicMaterial color={socksColor}></meshBasicMaterial>
      </mesh>
      <mesh position-y={0.1} position-z={-0.1}>
        <cylinderGeometry args={[0.06, 0.05, 0.2, 32]}></cylinderGeometry>
        <meshBasicMaterial color={socksColor}></meshBasicMaterial>
      </mesh>
    </group>
  )
}
