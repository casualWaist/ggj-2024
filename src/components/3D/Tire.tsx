/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ../../WebStormProjects/ggj-2024/public/3DModels/Tire.glb -F -t -O -b -o ../../WebStormProjects/ggj-2024/src/components/3D/Tire.tsx
*/

import * as THREE from 'three'
import { forwardRef } from 'react'
import { useGLTF, Outlines } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    tire: THREE.Mesh
  }
  materials: {
    tire: THREE.MeshStandardMaterial
  }
}

type Props = JSX.IntrinsicElements['group']

const Tire = forwardRef<THREE.Group, Props>((props: Props, ref) => {
  const { nodes, materials } = useGLTF('/3DModels/Tire.glb') as GLTFResult

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.tire.geometry} position={[0.125, 0, 0]} rotation={[0, Math.PI * 0.5, 0]}>
        <Outlines />
        <meshBasicMaterial map={materials.tire.map} />
      </mesh>
      <group position={[0, 2.5, 2.5]} rotation={[0, Math.PI, 0]} scale={0.5}>
          {props.children}
      </group>
    </group>
  )
})
export default Tire

useGLTF.preload('/3DModels/Tire.glb')
