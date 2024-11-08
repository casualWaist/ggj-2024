/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ../../WebStormProjects/ggj-2024/public/3DModels/Forklift.glb -F -t -O -b -o ../../WebStormProjects/ggj-2024/src/components/3D/Forklift.tsx
*/

import * as THREE from 'three'
import { forwardRef } from 'react'
import { useGLTF, Outlines } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube035: THREE.Mesh
    Cube035_1: THREE.Mesh
  }
  materials: {
    ['color chart']: THREE.MeshStandardMaterial
    tire: THREE.MeshStandardMaterial
  }
}

type Props = JSX.IntrinsicElements['group']

const Forklift = forwardRef<THREE.Group, Props>((props: Props, ref) => {
  const { nodes, materials } = useGLTF('/3DModels/Forklift.glb') as GLTFResult

  return (
    <group ref={ref} {...props} dispose={null}>
        <mesh geometry={nodes.Cube035.geometry} rotation={[0, Math.PI, 0]}>
          <Outlines />
          <meshBasicMaterial map={materials['color chart'].map} />
        </mesh>
        <mesh geometry={nodes.Cube035_1.geometry} rotation={[0, Math.PI, 0]} scale={0.25}>
          <Outlines />
          <meshBasicMaterial map={materials.tire.map} />
        </mesh>
      <group position={[0, 3, 2]} rotation={[0, Math.PI, 0]}>
          {props.children}
      </group>
    </group>
  )
})
export default Forklift

useGLTF.preload('/3DModels/Forklift.glb')
