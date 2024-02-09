import {forwardRef, ReactNode} from "react"
import {Group} from "three"
import Walk from "./AnimationWrappers/Walk.tsx"
import Roll from "./AnimationWrappers/Roll.tsx"
import Shake from "./AnimationWrappers/Shake.tsx";
import SoundFX from "./SoundFX.tsx";
import Jump from "./AnimationWrappers/Jump.tsx";

type Props = {
    go: boolean
    verb: string
    children: ReactNode
} & JSX.IntrinsicElements['group']

const Verb = forwardRef<Group, Props>(
    ({go, verb, children, ...props}: Props, ref) => {
    switch (verb){
        case 'Walk':
            return <Walk go={go} stepTime={0.4} ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Walk>
        case 'Roll':
            return <Roll go={go} ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Roll>
        case 'Cartwheel':
            return <Roll go={go} axis="z" ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Roll>
        case 'Spin':
            return <Roll go={go} axis="y" ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Roll>
        case 'Twirl':
            return <Roll go={go} repeat={false} duration={2} axis="y" ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Roll>
        case 'Kick':
            return <Roll go={go} angle={-Math.PI * 0.5} duration={1} axis="x" ret ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Roll>
        case 'Fart':
            return <Shake go={go} repeat={false} duration={4} violence={4} ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Shake>
        case 'Sing':
            return <Shake go={go} violence={0.5} duration={3} ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Shake>
        case 'Shriek':
            return <Shake go={go} violence={10} duration={1} ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Shake>
        case 'Hop':
            return <Jump go={go} ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Jump>
        case 'Jump':
            return <Jump go={go} height={4} angle={Math.PI * 0.125} ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Jump>
        case 'Maim':
            return <Roll go={go} angle={Math.PI * 0.5} duration={0.1} axis="z" ret ref={ref} {...props}>
                <Shake go={go}>
                    {children}
                </Shake>
                <SoundFX go={go} sound={verb}/>
            </Roll>
        case 'Smooch':
            return <Roll go={go} angle={-Math.PI * 0.25} repeat={false} duration={1} ret ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Roll>
        case 'Slink':
            return <Walk go={go} stepTime={2} ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Walk>
        case 'Think':
            return <Roll go={go} angle={Math.PI * 0.125} ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Roll>

        default:
            return <Walk go={go} stepTime={0.5} ref={ref} {...props}>
                { children }
                <SoundFX go={go} sound={verb} />
            </Walk>
    }
})

export default Verb
