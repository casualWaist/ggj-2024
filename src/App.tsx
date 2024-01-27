import { extend, MaterialNode, useFrame } from "@react-three/fiber"
import {forwardRef, useContext, useImperativeHandle, useRef} from "react"
import {GameContext} from "./components/CaptureWrapper.tsx"
import * as THREE from "three"
// @ts-expect-error/vite import problem
import vertex from './shaders/vertex.glsl'
// @ts-expect-error/vite import problem
import fragment from './shaders/fragment.glsl'
import {PerspectiveCamera, shaderMaterial} from "@react-three/drei"
import Plinko from "./components/Plinko.tsx";
import AniCube from "./components/AnimationEx.tsx";
import Title from "./components/Title.tsx";

const MarchReps = shaderMaterial({
        time: 0,
        // this ternary is necessary because SSR
        resolution: typeof window !== 'undefined' ? new THREE.Vector2(window.innerWidth, window.innerHeight) : new THREE.Vector2(1, 1),
    },
    vertex,
    fragment,
)

type Props = THREE.ShaderMaterial & { time?: number, resolution?: THREE.Vector2 }
extend({ MarchReps })
declare module "@react-three/fiber" {
    interface ThreeElements {
        marchReps: MaterialNode<Props, typeof MarchReps>;
    }
}

const Shader = forwardRef(({ ...props }: Props, ref) => {
    const localRef = useRef<THREE.ShaderMaterial & {time: number, resolution?: THREE.Vector2}>(null!)

    useImperativeHandle(ref, () => localRef.current)

    useFrame((_, delta) => (localRef.current.time += delta))
    return <marchReps key={MarchReps.key} ref={localRef} {...props} attach='material' />
})
Shader.displayName = 'Shader'

function App() {

    const [ gameState, _setGameState ] = useContext(GameContext)

    return <>
        <mesh position={[0, 1, 0]}>
            <planeGeometry args={[1, 1, 1, 1]}/>
            {/* @ts-expect-error/it's complicated */}
            <Shader time={0}/>
        </mesh>

        { gameState === 'pregame' ? <Title /> : null }

        { gameState === 'game' ? <Plinko/> : null}

        { gameState === 'end' ? <AniCube/> : null }

        <color attach="background" args={['hotpink']} />
        <ambientLight />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
    </>
}

export default App
