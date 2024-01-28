/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ./public/Soda.glb -t
*/

import * as THREE from 'three'
import {Outlines, useGLTF} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {forwardRef} from "react";
import {Group, Object3DEventMap} from "three";

type GLTFResult = GLTF & {
  nodes: {
    soda: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

type Props = JSX.IntrinsicElements['group']
const Soda = forwardRef<Group<Object3DEventMap>, Props>((props: JSX.IntrinsicElements['group'], ref) => {
  const { nodes, materials } = useGLTF('/Soda.glb') as GLTFResult
  const mat = new THREE.MeshBasicMaterial()
    mat.map = materials['Material.001'].map
  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh geometry={nodes.soda.geometry} material={mat} position={[0, 0.65, 0]}>
        <Outlines />
      </mesh>
    </group>
  )
})
export default Soda

useGLTF.preload('/Soda.glb')