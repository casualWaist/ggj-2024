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
import Title from "./components/Title.tsx"
import Story from "./components/Story.tsx"
import Result from "./components/Result.tsx"

function App() {

    const [ gameState ] = useContext(GameContext)


    return <>

        { gameState.section === 'pregame' ? <Title /> : null }

        { gameState.section === 'story' ? <Story /> : null }

        { gameState.section === 'game' ? <Plinko/> : null}

        { ['play', 'end'].includes(gameState.section) ?
            <Result
                result0={gameState.chosen[0]}
                result1={gameState.chosen[1]}
                result2={gameState.chosen[2]}
                result3={gameState.chosen[3]}
                result4={gameState.chosen[4]}
                result5={gameState.chosen[5]}
                result6={gameState.chosen[6]}
                result7={gameState.chosen[7]}
                result8={gameState.chosen[8]}
                result9={gameState.chosen[9]}
            />
            : null }

        <color attach="background" args={['hotpink']} />
        <ambientLight />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
    </>
}

export default App
