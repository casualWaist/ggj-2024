import {useContext, useEffect, useRef, useState} from "react"
import {useThree} from "@react-three/fiber"
import * as THREE from "three"
import {GameContext} from "./CaptureWrapper.tsx"
import WaffleHouseExt from "./3D/WaffleHouseExt.tsx"
import gsap from "gsap"
import Murph from "./3D/Murph.tsx"
import MurphsRide from "./AnimationWrappers/MurphsRide.tsx"
import Verb from "./Verb.tsx"
import Noun from "./Noun.tsx"

export default function Result() {
    const [ gameState, setGameState ] = useContext(GameContext)
    const camera = useThree((state) => state.camera as THREE.PerspectiveCamera)
    const whRef = useRef<THREE.Group>(null!)

    const advance = () => { setGameState((prevState) => {
        return { ...prevState, storyIndex: prevState.storyIndex + 1 }
    } ) }
    const finish = () => { setGameState({section: 'end'}) }

    useEffect(() => {
        const ctx = gsap.context(() => {
            switch (gameState.storyIndex) {
                case 0:
                    console.log('result 0')
                    camera.position.set(110, 110, 55)
                    camera.rotation.set(1.3181, 0.5987, -1.1412)
                    const tl0 = gsap.timeline()
                    tl0.to(camera.position, {x: 110, y: 10, z: 55, duration: 3})
                    tl0.to(camera.position, { duration: 3, onComplete: () => { advance() }})
                    break
                case 1:
                    console.log('result 1')
                    camera.position.set(-3.310, 32.704, 47.069)
                    camera.rotation.set( -0.4615, -0.6347, -0.2867)
                    const tl1 = gsap.timeline()
                    tl1.to(camera.position, {x: 4, y: 32.704, z: 47.069, duration: 6.5})
                    tl1.to(camera.position, { duration: 1, onComplete: () => { advance() }})
                    break
                case 2:
                    camera.position.set(41.069, 15.995, -11.151)
                    camera.rotation.set(-2.9204, 0.3972, 3.0548)
                    const tl2 = gsap.timeline()
                    tl2.to(camera.position, {x: 40.069, y: 15.995, z: -10.151, duration: 4})
                    tl2.to(camera.position, { duration: 1, onComplete: () => { advance() }})
                    break
                case 3:
                    camera.position.set(-14.121, 13.639, 11.079)
                    camera.rotation.set(-0.1873, -0.8511, -0.2483)
                    const tl3 = gsap.timeline()
                    tl3.to(camera.rotation, {y: -1.8311, duration: 1, delay: 2})
                    tl3.to(camera.position, {y: 12, z: 11.479, duration: 4}, '<')
                    tl3.to(camera.position, { duration: 1, onComplete: () => { advance() }})
                    break
                case 4:
                    camera.position.set(-14.704, 9.978, -2.595)
                    camera.rotation.set(-3.0684, -0.7459, -3.0919)
                    const tl4 = gsap.timeline()
                    tl4.to(camera.position, {z: -1.595, duration: 3})
                    tl4.to(camera.position, { duration: 2, onComplete: () => { advance() }})
                    break
                case 5:
                    camera.position.set(-13.306, 15.056, 9.51)
                    camera.rotation.set(-1.6227, -0.9755, -1.6335)
                    const tl5 = gsap.timeline()
                    tl5.to(camera, {fov: 90, duration: 3, onUpdate: () => { camera.updateProjectionMatrix() }})
                    tl5.to(camera.position, { duration: 2, onComplete: () => { advance() }})
                    break
                case 6:
                    camera.position.set(-8.371, 9.563, 3.769)
                    camera.rotation.set(-2.9410, -0.7640, -3.0018)
                    camera.fov = 90
                    camera.updateProjectionMatrix()
                    const tl6 = gsap.timeline()
                    tl6.to(camera.rotation, {x: -3.5, duration: 3})
                    tl6.to(camera.position, { duration: 2, onComplete: () => { advance() }})
                    break
                case 7:
                    camera.position.set(-14.323, 14.581, 8.908)
                    camera.rotation.set(-0.6245, -1.0171, -0.5500)
                    camera.fov = 75
                    camera.updateProjectionMatrix()
                    const tl7 = gsap.timeline()
                    tl7.to(camera.position, {y: 19.581, duration: 0.1, delay: 2})
                    tl7.to(camera.position, {y: 14.581, duration: 0.1})
                    tl7.to(camera.position, { duration: 2, onComplete: () => { advance() }})
                    break
                case 8:
                    camera.position.set(24.419, 14.267, 53.902)
                    camera.rotation.set(-0.1908, 0.6508, 0.1165)
                    camera.fov = 60
                    camera.updateProjectionMatrix()
                    const tl8 = gsap.timeline()
                    tl8.to(camera, {fov: 80, duration: 3, delay: 1, onUpdate: () => { camera.updateProjectionMatrix() }})
                    tl8.to(camera.position, { duration: 1, onComplete: () => { advance() }})
                    break
                case 9:
                    camera.position.set(-12.491, 12.667, 37.620)
                    camera.rotation.set(-0.3619, -0.6321, -0.2200)
                    const tl9 = gsap.timeline()
                    tl9.to(camera.position, {x: 13.2913, y: 14.0414, z: 57.290, duration: 4, delay: 1})
                    tl9.to(camera.rotation, {y: Math.PI * 0.75, duration: 1})
                    tl9.to(camera.position, { duration: 2, onComplete: () => { finish() }})
            }
        })
        return () => ctx.kill(false)
    }, [gameState])

    return <>
        { gameState.storyIndex === 0 ? <Result0 result={gameState.chosen[0]} /> : null }
        { gameState.storyIndex === 1 ? <Result1 result={gameState.chosen[1]} /> : null }
        { gameState.storyIndex === 2 ? <Result2 result={gameState.chosen} /> : null }
        { gameState.storyIndex === 3 ? <Result3 result={gameState.chosen} /> : null }
        { gameState.storyIndex === 4 ? <Result4 result={gameState.chosen} /> : null }
        { gameState.storyIndex === 5 ? <Result5 result={gameState.chosen} /> : null }
        { gameState.storyIndex === 6 ? <Result6 result={gameState.chosen} /> : null }
        { gameState.storyIndex === 7 ? <Result7 result={gameState.chosen} /> : null }
        { gameState.storyIndex === 8 ? <Result8 result={gameState.chosen} /> : null }
        { gameState.storyIndex === 9 ? <Result9 result={gameState.chosen} /> : null }
        <WaffleHouseExt ref={whRef}/>
    </>
}

/*
    under the sign position = [88.36, 0.757, 59.979]
    parking spot position = [35, 0.757, 21.129]
    rounding corner position = [20.885, 0.757, 34.31]
    out of door position = [0.618, 0.757, 33.895]
    inside position = [0.204, 1.605, 24.915]
    murphy stool position = [-5.296, 7.527, 6.662]
    mLeft stool position = [-5.304, 7.527, 13.450]
    mRight stool position = [-5.372, 7.527, 0.34]
    murphy meal position = [-10.268, 8.691, 6.481]
    mLeft meal position = [-10.273, 8.691, 13.55]
    ride off position = [-495.579, 0.757, 697.208]
*/

function Result0({ result }: { result: string[]}) {
    console.log(result)
    const murphRef = useRef<THREE.Group>(null!)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(murphRef.current.position, {x: 105, z: 53, duration: 1, delay: 3.25})
            tl.to(murphRef.current.rotation, {y: -Math.PI * 0.5, duration: 1, delay: 0.5})
            })
        return () => ctx.kill(false)
    }, [])

    return <Murph ref={murphRef} position={[138, 3, 30]} rotation={[0, -Math.PI * 0.375, 0]}/>
}

type MurphsRideRef = {
    rideHeight: () => number
} & THREE.Group

function Result1({ result }: { result: string[]}) {
    const [ go, setGo ] = useState(false)
    const baseRef = useRef(0)
    const murphRef = useRef<THREE.Group>(null!)
    const rideRef = useRef<MurphsRideRef>(null!)
    const verbRef = useRef<THREE.Group & {group: THREE.Group}>(null!)

    useEffect(() => {
        baseRef.current = rideRef.current.rideHeight()
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(verbRef.current.group.rotation, {y: Math.PI * 0.5, duration: 1, delay: 2.5})
            tl.to(verbRef.current.group.position, {y: 4, x: 2, duration: 0.5})
            tl.to(verbRef.current.group.position, {y: -baseRef.current, x: 4, duration: 0.5, onComplete: () => { setGo(true) }})
            tl.to(verbRef.current.group.position, {x: 12, z: -6, duration: 0.75})
            tl.to(verbRef.current.group.rotation, {y: 0, duration: 0.75}, '<')
            tl.to(verbRef.current.group.position, {z: 30, duration: 2})
        })
        return () => ctx.kill(false)
    }, [])

    return <MurphsRide ref={rideRef} ride={result[1]}>
        <Verb ref={verbRef} verb={result[2]} go={go}>
            <Murph ref={murphRef}/>
        </Verb>
    </MurphsRide>
}

function Result2({ result }: { result: string[][]}) {
    const [ go, setGo ] = useState(false)
    const murphRef = useRef<THREE.Group>(null!)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(murphRef.current.position, {x: 0.204, y: 1.605, z: 24.915, duration: 1, onComplete: () => { setGo(true) }})
        })
        return () => ctx.kill(false)
    }, [])

    return <>
        <Verb go={go} verb={result[2][0]}>
            <Verb verb={result[2][1]} go={go}>
                <Murph ref={murphRef} position={[0.618, 0.757, 33.895]} rotation={[0, Math.PI, 0]}/>
            </Verb>
        </Verb>
        <Noun noun={result[1][1]} position={[35, 0.757, 21.129]} rotation={[0, -Math.PI * 0.5, Math.PI * 0.125]}/>
    </>
}

function Result3({ result }: { result: string[][]}) {
    const murphRef = useRef<THREE.Group>(null!)
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(murphRef.current.position, {x: -5.296, y: 2.527, z: 6.662, duration: 1})
            tl.to(murphRef.current.rotation, {y: -Math.PI * 0.5, duration: 1, delay: 0.5})
        })
        return () => ctx.kill(false)
    }, [])

    return <>
        <Murph ref={murphRef} position={[0.204, 1.605, 24.915]}/>
        <Noun noun={result[3][1]} position={[-5.304, 7.527, 13.450]}/>
        <Noun noun={result[1][1]} position={[35, 0.757, 21.129]} rotation={[0, -Math.PI * 0.5, Math.PI * 0.125]}/>
    </>
}

function Result4({ result }: { result: string[][]}) {
    const murphRef = useRef<THREE.Group>(null!)


    return <>
        <Murph ref={murphRef} position={[-5.296, 2.527, 6.662]} rotation={[0, -Math.PI * 0.5, 0]}/>
        <Noun noun={result[3][1]} position={[-5.304, 7.527, 13.450]}/>
        <Noun noun={result[1][1]} position={[35, 0.757, 21.129]} rotation={[0, -Math.PI * 0.5, Math.PI * 0.125]}/>
    </>
}

function Result5({ result }: { result: string[][]}) {
    const murphRef = useRef<THREE.Group>(null!)


    return <>
        <Murph ref={murphRef} position={[-5.296, 2.527, 6.662]} rotation={[0, -Math.PI * 0.5, 0]}/>
        <Noun noun={result[3][1]} position={[-5.304, 7.527, 13.450]}/>
        <Noun noun={result[1][1]} position={[35, 0.757, 21.129]} rotation={[0, -Math.PI * 0.5, Math.PI * 0.125]}/>
    </>
}

function Result6({ result }: { result: string[][]}) {
    const murphRef = useRef<THREE.Group>(null!)

    return <>
        <Murph ref={murphRef} position={[-5.296, 2.527, 6.662]} rotation={[0, -Math.PI * 0.5, 0]}/>
        <Noun noun={result[3][1]} position={[-5.304, 7.527, 13.450]}/>
        <Noun noun={result[1][1]} position={[35, 0.757, 21.129]} rotation={[0, -Math.PI * 0.5, Math.PI * 0.125]}/>
    </>
}

function Result7({ result }: { result: string[][]}) {
    const relRef = useRef<THREE.Group>(null!)
    const murphRef = useRef<THREE.Group>(null!)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(relRef.current.position, {y: 7.527, duration: 0.5, delay: 1.5})
        })
        return () => ctx.kill(false)
    }, [])

    return <>
        <Murph ref={murphRef} position={[-5.296, 2.527, 6.662]} rotation={[0, -Math.PI * 0.5, 0]}/>
        <Noun noun={result[3][1]} position={[-5.304, 7.527, 13.450]}/>
        <Noun ref={relRef} noun={result[7][2]} position={[-5.372, 47.527, 0.34]}/>
        <Noun noun={result[1][1]} position={[35, 0.757, 21.129]} rotation={[0, -Math.PI * 0.5, Math.PI * 0.125]}/>
    </>
}

function Result8({ result }: { result: string[][]}) {
    const patRef = useRef<THREE.Group>(null!)
    const relRef = useRef<THREE.Group>(null!)
    const murphRef = useRef<THREE.Group>(null!)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(patRef.current.position, {x: 100, duration: 4.5, delay: 1.5})
        })
        return () => ctx.kill(false)
    }, [])

    return <>
        <Noun ref={patRef} noun={result[3][1]} position={[-5.304, 7.527, 13.450]}/>
        <Murph ref={murphRef} position={[-5.296, 2.527, 6.662]} rotation={[0, -Math.PI * 0.5, 0]}/>
        <Noun ref={relRef} noun={result[7][2]} position={[-5.372, 47.527, 0.34]}/>
        <Noun noun={result[1][1]} position={[35, 0.757, 21.129]} rotation={[0, -Math.PI * 0.5, Math.PI * 0.125]}/>
    </>
}

function Result9({ result }: { result: string[][]}) {
    const rideRef = useRef<THREE.Group>(null!)
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(rideRef.current.position, {x: -495.579, y: 0.757, z: 697.208, duration: 4, delay: 5})
        })
        return () => ctx.kill(false)
    }, [])

    return <>
        <Noun ref={rideRef} noun={result[1][1]} position={[35, 0.757, 21.129]} rotation={[0, -Math.PI * 0.5, Math.PI * 0.125]}/>
    </>
}
