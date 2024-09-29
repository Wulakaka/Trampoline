import {
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
} from '@react-three/rapier'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'

export default function Girl() {
  const { hatColor, headColor, dressColor, socksColor } = useControls('Girl', {
    hatColor: { value: '#35acc1', label: 'Color' },
    headColor: { value: '#35c18c', label: 'Color' },
    dressColor: { value: 'hotpink', label: 'Dress Color' },
    socksColor: { value: '#35c18c', label: 'Socks Color' },
  })

  const headRef = useRef<THREE.Mesh>(null)
  const rigidBody = useRef<RapierRigidBody>(null)
  const { rapier, world } = useRapier()

  const [subscribeKeys, getKeys] = useKeyboardControls()

  useFrame((_, delta) => {
    if (!rigidBody.current) return
    const { forward, backward, leftward, rightward } = getKeys()
    const impulse = { x: 0, y: 0, z: 0 }
    const impulseStrength = 2 * delta
    if (forward) impulse.z -= impulseStrength
    if (backward) impulse.z += impulseStrength
    if (leftward) impulse.x -= impulseStrength
    if (rightward) impulse.x += impulseStrength
    rigidBody.current.applyImpulse(impulse, true)

    const position = rigidBody.current.translation()
    if (position.y < -5) {
      // 为什么 y 是 0，而不是 0.7？因为0.7是碰撞体的位置，而不是刚体的位置
      rigidBody.current.setTranslation({ x: 0, y: 0, z: 0 }, true)
      rigidBody.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true)
      // https://rapier.rs/javascript3d/classes/RigidBody.html#setLinvel
      // 线速度
      rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      // https://rapier.rs/javascript3d/classes/RigidBody.html#setAngvel
      // 角速度
      rigidBody.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
    }
  })

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump()
        }
      },
    )

    return () => {
      unsubscribeJump()
    }
  })

  function jump() {
    if (rigidBody.current && headRef.current) {
      const origin = rigidBody.current.translation()
      const direction = { x: 0, y: -1, z: 0 }
      const ray = new rapier.Ray(origin, direction)
      const hit = world.castRay(ray, 10, true)
      if (hit && hit.timeOfImpact < 0.15) {
        const headPosition = new THREE.Vector3()
        headRef.current?.localToWorld(headPosition)

        rigidBody.current.applyImpulseAtPoint(
          { x: 0, y: 1, z: 0 },
          headPosition,
          true,
        )
      }
    }
  }

  return (
    <RigidBody
      type={'dynamic'}
      colliders={false}
      restitution={0.5}
      ref={rigidBody}
    >
      <CylinderCollider
        args={[0.7, 0.3]}
        position={[0, 0.7, 0]}
      ></CylinderCollider>
      <group>
        <group position-y={1} rotation-x={-0.5} rotation-z={0.1}>
          <mesh position={[0, 0.3, 0]}>
            <coneGeometry args={[0.15, 0.4, 32]}></coneGeometry>
            <meshBasicMaterial color={hatColor}></meshBasicMaterial>
          </mesh>
          <mesh ref={headRef}>
            <sphereGeometry args={[0.2, 32, 32]}></sphereGeometry>
            <meshBasicMaterial color={headColor}></meshBasicMaterial>
          </mesh>
        </group>
        <mesh position-y={0.5}>
          <cylinderGeometry args={[0.1, 0.4, 0.6, 32]}></cylinderGeometry>
          <meshBasicMaterial color={dressColor}></meshBasicMaterial>
        </mesh>
        <mesh position-y={0.1} position-x={0.1}>
          <cylinderGeometry args={[0.06, 0.05, 0.2, 32]}></cylinderGeometry>
          <meshBasicMaterial color={socksColor}></meshBasicMaterial>
        </mesh>
        <mesh position-y={0.1} position-x={-0.1}>
          <cylinderGeometry args={[0.06, 0.05, 0.2, 32]}></cylinderGeometry>
          <meshBasicMaterial color={socksColor}></meshBasicMaterial>
        </mesh>
      </group>
    </RigidBody>
  )
}
