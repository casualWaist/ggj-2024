/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ../../WebStormProjects/ggj-2024/public/3DModels/Waffle.glb -F -t -O -b -o ../../WebStormProjects/ggj-2024/src/components/3D/Waffle.tsx
*/

import * as THREE from 'three'
import { forwardRef } from 'react'
import { useGLTF, Outlines } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

type Props = JSX.IntrinsicElements['group']

const Waffle = forwardRef<THREE.Group, Props>((props: Props, ref) => {
  const { nodes, materials } = useGLTF('/3DModels/waffle.glb') as GLTFResult

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry}>
        <Outlines />
        <meshBasicMaterial map={materials['Material.001'].map} />
      </mesh>
      <group position={[0, 0.25, 1.1]} rotation={[0, Math.PI, 0]} scale={0.5}>
        {props.children}
      </group>
    </group>
  )
})
export default Waffle

useGLTF.preload('/3DModels/waffle.glb')
