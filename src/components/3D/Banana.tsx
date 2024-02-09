import * as THREE from 'three'
import {Outlines, useGLTF} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {forwardRef} from "react"
import { Group } from "three"

type GLTFResult = GLTF & {
  nodes: {
    banana_one_mat: THREE.Mesh
  }
  materials: {
    ['color chart']: THREE.MeshBasicMaterial
  }
}

type Props = JSX.IntrinsicElements['group']

const Banana = forwardRef<Group, Props>((props: Props, ref) => {
  const { nodes, materials } = useGLTF('/3DModels/banana.glb') as GLTFResult

  const mat = new THREE.MeshBasicMaterial()
  mat.map = materials['color chart'].map
  return (
      <group ref={ref} {...props} dispose={null}>
          <mesh geometry={nodes.banana_one_mat.geometry} position={[0, 1.6, 0]} material={mat} scale={0.5}>
              <Outlines/>
          </mesh>
          <group position={[0, 1.25, 0.25]} rotation={[0, Math.PI, 0]} scale={0.5}>
              {props.children}
          </group>
      </group>
  )
})

export default Banana

useGLTF.preload('/3DModels/banana.glb')
