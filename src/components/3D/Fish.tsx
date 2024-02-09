import * as THREE from 'three'
import {Outlines, useGLTF} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {forwardRef} from "react";
import {Group, Object3DEventMap} from "three";

type GLTFResult = GLTF & {
  nodes: {
    fish: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

type Props = JSX.IntrinsicElements['group']

const Fish = forwardRef<Group<Object3DEventMap>, Props>((props: JSX.IntrinsicElements['group'], ref) => {
  const { nodes, materials } = useGLTF('/3DModels/Fish.glb') as GLTFResult
  const mat = new THREE.MeshBasicMaterial()
  mat.map = materials['Material.001'].map
  return (
      <group {...props} ref={ref} dispose={null}>
        <mesh geometry={nodes.fish.geometry} position={[0, 0.85, 0]} rotation={[Math.PI * 0.5, 0, 0]} material={mat}>
          <Outlines/>
        </mesh>
      </group>
  )
})
export default Fish

useGLTF.preload('/3DModels/Fish.glb')
