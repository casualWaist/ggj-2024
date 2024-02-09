import {useEffect} from "react"

export default function SoundFX({go, sound}: {go: boolean, sound: string}) {
    const audio = new Audio(`/SFX/VerbSfx/${sound}.wav`)

    useEffect(() => {
        if (go) audio.play()
    }, [go])

    return null
}
