import {useContext, useRef} from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import Banana from "./3D/Banana"
import Fish from "./3D/Fish"
import FishWithLegs from "./3D/Fishwithlegs"
import Knife from "./3D/Knife"
import Cabbage from "./3D/Cabbage"
import Soda from "./3D/Soda.tsx"
import Fries from "./3D/Fries.tsx"
import Burger from "./3D/Burger.tsx"
import FlyAcross from "./AnimationWrappers/FlyAcross.tsx"
import Shake from "./AnimationWrappers/Shake.tsx"
import {GameContext} from "./CaptureWrapper.tsx"

export default function Result() {
    const [ gameState, setGameState ] = useContext(GameContext)

    const advance = () => { setGameState((prevState) => {
        return { ...prevState, storyIndex: prevState.storyIndex + 1 }
    } ) }
    const finish = () => { setGameState({section: 'end'}) }

    return <>
        { gameState.storyIndex === 0 ? <Result0 result={gameState.chosen[0]} done={advance}/> : null }
        { gameState.storyIndex === 1 ? <Result1 result={gameState.chosen[1]} done={advance}/> : null }
        { gameState.storyIndex === 2 ? <Result2 result={gameState.chosen[2]} done={advance}/> : null }
        { gameState.storyIndex === 3 ? <Result3 result={gameState.chosen[3]} done={advance}/> : null }
        { gameState.storyIndex === 4 ? <Result4 result={gameState.chosen[4]} done={advance}/> : null }
        { gameState.storyIndex === 5 ? <Result5 result={gameState.chosen[5]} done={advance}/> : null }
        { gameState.storyIndex === 6 ? <Result6 result={gameState.chosen[6]} done={advance}/> : null }
        { gameState.storyIndex === 7 ? <Result7 result={gameState.chosen[7]} done={advance}/> : null }
        { gameState.storyIndex === 8 ? <Result8 result={gameState.chosen[8]} done={advance}/> : null }
        { gameState.storyIndex === 9 ? <Result9 result={gameState.chosen[9]} done={finish}/> : null }
    </>
}

function Result0({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const burgerRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta,) => {
        burgerRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Burger ref={burgerRef} position={[0, 3, 0]}/>
    </FlyAcross>
}

function Result1({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const burgerRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta) => {
        burgerRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Burger ref={burgerRef} position={[0, 3, 0]}/>
    </FlyAcross>
}

function Result2({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const friesRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta) => {
        friesRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Shake>
            <Fries ref={friesRef} position={[4, 2, 0]}/>
        </Shake>
    </FlyAcross>
}

function Result3({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const sodaRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta) => {
        sodaRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Soda ref={sodaRef} position={[0, 3, 0]}/>
    </FlyAcross>
}

function Result4({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const cabbageRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta) => {
        cabbageRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Cabbage ref={cabbageRef} position={[-3, -3, 0]}/>
    </FlyAcross>
}

function Result5({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const fishRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta) => {
        fishRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Fish ref={fishRef} position={[5, 0, 0]}/>
    </FlyAcross>
}

function Result6({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const bananaRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta) => {
        bananaRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Banana ref={bananaRef} position={[2, 2, 0]}/>
    </FlyAcross>
}

function Result7({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const fishLegsRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta) => {
        fishLegsRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <FishWithLegs ref={fishLegsRef} position={[4, -2, 0]}/>
    </FlyAcross>
}

function Result8({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const knifeRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta) => {
        knifeRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Knife ref={knifeRef} position={[0, -4, 0]}/>
    </FlyAcross>
}

function Result9({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const knifeRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta) => {
        knifeRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Knife ref={knifeRef} position={[0, -4, 0]}/>
    </FlyAcross>
}
