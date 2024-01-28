/*
    This is the main file for the project.
    useContext is getting the gameState from CaptureWrapper.tsx
    it uses conditionals to render different components based on the game state
    It also has some basic scene setup for lighting and camera
*/

import { useContext} from "react"
import {GameContext} from "./components/CaptureWrapper.tsx"
import {PerspectiveCamera} from "@react-three/drei"
import Plinko from "./components/Plinko.tsx"
import AniCube from "./components/Result.tsx"
import Title from "./components/Title.tsx"
import Story from "./components/Story.tsx"

function App() {

    const [ gameState ] = useContext(GameContext)


    return <>


        { gameState[0] === 'pregame' ? <Title /> : null }

        { gameState[0] === 'story' ? <Story /> : null }

        { gameState[0] === 'game' ? <Plinko/> : null}

        { gameState[0] === 'end' ? <AniCube/> : null }

        <color attach="background" args={['hotpink']} />
        <ambientLight />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
    </>
}

export default App
