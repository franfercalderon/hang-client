import { useEffect, useState } from "react";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function Assistant(){

    //STATE
    const [ inputValue, setInputValue ] = useState('')
    const [ enableSubmit, setEnableSubmit ] = useState( false  )

    //FUNCTION
    const handleChange = ( e ) => {
        const { value } = e.target
        setInputValue( value )
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault()
    }

    //EFFECT
    useEffect(() => {
        setEnableSubmit( inputValue.length > 0 ? true : false )
    }, [ inputValue ])


    return(
        <div className="view-container">
            <TopBarNav navigation={''} title={'Assistant'}/>
            <div className="main-view-body">
            </div>
            <div className="main-bottombar chat">
                <div className="section-container">
                    <div className="inner">
                        <form>
                            <input type="text" value={ inputValue } onChange={ handleChange }/>
                            <div className="chat-submit-container" onClick={ handleSubmit }>
                                <button className= {`pointer chat-submit ${ enableSubmit ? 'enabled' : ''}`} type="submit" onClick={ handleSubmit } disabled={ ! enableSubmit }>
                                    <img src="/images/sendIcon.svg" alt='send'/>  
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}