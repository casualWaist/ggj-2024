import * as THREE from 'three'
import {forwardRef} from 'react'
import {Outlines, useGLTF} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {Group, Object3DEventMap} from "three";

type GLTFResult = GLTF & {
  nodes: {
    cabbage: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

type Props = JSX.IntrinsicElements['group']

const Cabbage = forwardRef<Group<Object3DEventMap>, Props>((props: Props, ref) => {
  const { nodes, materials } = useGLTF('/Cabbage.glb') as GLTFResult
  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh geometry={nodes.cabbage.geometry} material={materials['Material.001']} rotation={[0, -1.199, 0]}>
        <Outlines />
      </mesh>
    </group>
  )
})
export default Cabbage

useGLTF.preload('/Cabbage.glb')
