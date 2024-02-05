import * as THREE from 'three'
import {Outlines, useGLTF} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {forwardRef} from "react"
import {Group, Object3DEventMap} from "three"

type GLTFResult = GLTF & {
  nodes: {
    knife: THREE.Mesh
  }
  materials: {['Material.001']: THREE.MeshStandardMaterial}
}

type Props = JSX.IntrinsicElements['group']

const Knife = forwardRef<Group<Object3DEventMap>, Props>((props: JSX.IntrinsicElements['group'], ref) => {
  const { nodes, materials } = useGLTF('/3DModels/Knife.glb') as GLTFResult
  const mat = new THREE.MeshBasicMaterial()
    mat.map = materials['Material.001'].map
  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh geometry={nodes.knife.geometry} material={mat}>
        <Outlines />
      </mesh>
      <group position={[0, 0.75, 1]} rotation={[0, Math.PI, 0]} scale={0.5}>
        {props.children}
      </group>
    </group>
  )
})
export default Knife

useGLTF.preload('/3DModels/Knife.glb')
