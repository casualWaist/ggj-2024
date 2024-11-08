/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ../../WebStormProjects/ggj-2024/public/3DModels/Rock.glb -F -t -O -b -o ../../WebStormProjects/ggj-2024/src/components/3D/Rock.tsx
*/

import * as THREE from 'three'
import { forwardRef } from 'react'
import { useGLTF, Outlines } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    rock: THREE.Mesh
  }
  materials: {
    tire: THREE.MeshStandardMaterial
  }
}

type Props = JSX.IntrinsicElements['group']

const Rock = forwardRef<THREE.Group, Props>((props: Props, ref) => {
  const { nodes, materials } = useGLTF('/3DModels/Rock.glb') as GLTFResult

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.rock.geometry}>
        <Outlines />
        <meshBasicMaterial map={materials.tire.map} />
      </mesh>
      <group position={[0, 1.5, 1.25]} rotation={[-Math.PI * 0.125, Math.PI, 0]} scale={0.5}>
          {props.children}
      </group>
    </group>
  )
})
export default Rock

useGLTF.preload('/3DModels/Rock.glb')
