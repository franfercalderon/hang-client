import { faCheck, faPen, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import InlineAlert from "../InlineAlert/InlineAlert"
import useAlert from "../../hooks/useAlert"

export default function EditableInput ({ value, handleChange, name, label, editable, cancelChange, reset }){
    
    //STATE
    const [ showInput, setShowInput ] = useState( false )

    //HOOKS
    const { alertInfo } = useAlert()

    //FUNCTIONS
    const toggleEditable = () => {
        setShowInput( !showInput )
    }

    const handleCancel = ( name ) => {
        cancelChange( name )
        setShowInput( false )
    }

    useEffect(() => {
        if( reset ){
            setShowInput( false )
        }
    }, [ reset ])


    return(
        <div className="editable-input-container">
            <label>{label} </label>
            <div className="inner">
                <div className="text-container">
                    {
                        editable ? 
                        <>
                        {
                            !showInput ?
                            <p >{ value }</p>
                            :
                            <input  type="text" value={ value } onChange={ handleChange } name={ name } />
                        }
                        </>
                        :
                        <p className={`${ !editable ? 'disabled': 'disabled'}`}>{ value }</p>
                    }
                </div>
                <div className="btn-container">
                    {
                        editable ?
                        <>
                        {
                            !showInput ?
    
                            <FontAwesomeIcon icon={ faPen } onClick={ toggleEditable } className="gray"/>
                            :
                            <>
                                <FontAwesomeIcon icon={ faCheck } onClick={ toggleEditable }/>
                                <FontAwesomeIcon icon={ faXmark } onClick={ () => handleCancel( name ) } />
                            </>
                        }   
                        </>
                        :
                        <div className="inline-help centered pointer" onClick={ () => alertInfo('Your phone number cannot be updated as it is used as the primary identifier for your account authentication.') }>
                            <p>?</p>
                        </div>
                    }
                
                </div>
            </div>
        </div>
    )
}