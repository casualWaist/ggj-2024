import * as THREE from 'three'
import {Outlines, useGLTF} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {forwardRef} from "react";
import { Group, Object3DEventMap } from "three"

type GLTFResult = GLTF & {
  nodes: {
    banana_one_mat: THREE.Mesh
  }
  materials: {
    ['color chart']: THREE.MeshBasicMaterial
  }
}

type Props = JSX.IntrinsicElements['group']

export const Banana = forwardRef<Group<Object3DEventMap>, Props>((props: Props, ref) => {
  const { nodes, materials } = useGLTF('/3DModels/banana.glb') as GLTFResult

  const mat = new THREE.MeshBasicMaterial()
  mat.map = materials['color chart'].map
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.banana_one_mat.geometry} material={mat}>
        <Outlines />
      </mesh>
    </group>
  )
})

export default Banana

useGLTF.preload('/3DModels/banana.glb')
