import { faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export default function HelpContainer(){

    //STATE
    const [ isOpen, setIsOpen ] = useState( false )

    //REF
    const innerRef = useRef()

    //FUNCTIONS

    //EFFECTS
    useEffect(() => {

        const handleOutsideClick = ( event ) => {
            if ( innerRef.current && !innerRef.current.contains( event.target )) {

                setIsOpen( false )
            }
        };

        document.addEventListener( "mousedown", handleOutsideClick) 

        return () => {
            document.removeEventListener( "mousedown", handleOutsideClick )
        }
    }, [ setIsOpen ]); 

    return (
        <>
            {
                !isOpen ?
                <div className="help-chat-floating-button div-shadow" onClick={ () => setIsOpen( true ) }>
                    <FontAwesomeIcon icon={ faQuestion }/>
                </div>
                :
                <div className="chat-modal">
                    <div className="help-chat-container round-div div-shadow" ref={ innerRef }>
                        <iframe 
                        src="https://studio.pickaxe.co/_embed/Hang_AI_Assistant_QRCDL?d=deployment-b55b601c-abbc-4904-a6d5-042187eb56e3"
                        style={{ 
                            width: "100%", 
                            height: "100%", 
                            maxWidth: "700px", 
                            borderRadius: "10px",
                            border: 'none',
                            borderBottom: 'none',
                        }} 
                        title="help-chat"
                        >
                        </iframe>
                    <div className="white-bar">
                    </div>
                    </div>
                    <div className="help-chat-floating-button div-shadow" onClick={ () => setIsOpen( false ) }>
                        <FontAwesomeIcon icon={ faXmark }/>
                    </div>
                </div>
            }
        </>
    )
}