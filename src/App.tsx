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

    const [ gameState, _setGameState ] = useContext(GameContext)


    return <>
        

        { gameState === 'pregame' ? <Title /> : null }

        { gameState === 'story' ? <Story /> : null }

        { gameState === 'story' ? <Story /> : null }

        { gameState === 'game' ? <Plinko/> : null}

        { gameState === 'end' ? <AniCube/> : null }

        <color attach="background" args={['hotpink']} />
        <ambientLight />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
    </>
}

export default App
