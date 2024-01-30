import * as THREE from 'three'
import {Outlines, useGLTF} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {forwardRef} from "react"
import {Group, Object3DEventMap} from "three"

type GLTFResult = GLTF & {
  nodes: {
    fishlegs: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}
type Props = JSX.IntrinsicElements['group']

const FishWithLegs = forwardRef<Group<Object3DEventMap>, Props>((props: JSX.IntrinsicElements['group'], ref) => {
  const { nodes, materials } = useGLTF('/3DModels/Fishwithlegs.glb') as GLTFResult
  const mat = new THREE.MeshBasicMaterial()
  mat.map = materials['Material.001'].map
  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh geometry={nodes.fishlegs.geometry} material={mat} rotation={[Math.PI / 2, 0, 0]}>
        <Outlines />
      </mesh>
    </group>
  )
})
export default FishWithLegs

useGLTF.preload('/3DModels/Fishwithlegs.glb')
