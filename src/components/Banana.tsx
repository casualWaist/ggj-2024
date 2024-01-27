import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {forwardRef} from "react";
import { Group, Object3DEventMap } from "three"

type GLTFResult = GLTF & {
  nodes: {
    banana_one_mat: THREE.Mesh
  }
  materials: {
    ['color chart']: THREE.MeshStandardMaterial
  }
}

type Props = JSX.IntrinsicElements['group']

export const Banana = forwardRef<Group<Object3DEventMap>, Props>((props: Props, ref) => {
  const { nodes, materials } = useGLTF('/banana.glb') as GLTFResult
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.banana_one_mat.geometry} material={materials['color chart']} />
    </group>
  )
})

export default Banana

useGLTF.preload('/banana.glb')
