import { useEffect, useState } from "react"

export default function ViewContainer ({ className = '', children }) {

    //STATE
    const [ viewHeight, setViewHeight ] = useState( window.innerHeight )

    //EFFECTS
    useEffect(() => {

        const updateViewHeight = () => {
            setViewHeight( window.innerHeight )
        }

        updateViewHeight()

        window.addEventListener( 'resize', updateViewHeight )
    }, [] )

    return(
        <div className={`view-container ${ className }`} style={{ height: `${ viewHeight }px`}}>
            { children }
        </div>
    )
}