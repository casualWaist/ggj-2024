/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ../../WebStormProjects/ggj-2024/public/3DModels/WaffleHouseExt.glb -F -t -O -b -o ../../WebStormProjects/ggj-2024/src/components/3D/WaffleHouseExt.tsx
*/

import * as THREE from 'three'
import { forwardRef } from 'react'
import {useGLTF, Outlines} from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube013: THREE.Mesh
    Cube013_1: THREE.Mesh
    Cube013_2: THREE.Mesh
    Cube013_3: THREE.Mesh
    Cube013_4: THREE.Mesh
  }
  materials: {
    ['murph color']: THREE.MeshStandardMaterial
    ['color chart']: THREE.MeshStandardMaterial
    floor: THREE.MeshStandardMaterial
    ['PARKING LOT']: THREE.MeshStandardMaterial
    ['awful house sign']: THREE.MeshStandardMaterial
  }
}

type Props = JSX.IntrinsicElements['group']

const WaffleHouseExt = forwardRef<THREE.Group, Props>((props: Props, ref) => {
  const { nodes, materials } = useGLTF('/3DModels/WaffleHouseExt.glb') as GLTFResult

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Cube013.geometry}>
        <Outlines />
        <meshBasicMaterial map={materials['murph color'].map} />
      </mesh>
      <mesh geometry={nodes.Cube013_1.geometry}>
        <meshBasicMaterial map={materials['color chart'].map} />
      </mesh>
      <mesh geometry={nodes.Cube013_2.geometry} material={materials.floor}/>
      <mesh geometry={nodes.Cube013_3.geometry} position={[0, -0.25, 0]}>
        <meshBasicMaterial map={materials['PARKING LOT'].map} />
      </mesh>
      <mesh geometry={nodes.Cube013_4.geometry} onClick={(e) => {
          console.log(e)}}>
        <Outlines />
        <meshBasicMaterial map={materials['awful house sign'].map}/>
      </mesh>
        <ambientLight intensity={10}/>
    </group>
  )
})
export default WaffleHouseExt

useGLTF.preload('/3DModels/WaffleHouseExt.glb')
