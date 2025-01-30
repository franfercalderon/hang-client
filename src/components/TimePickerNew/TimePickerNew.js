import { faChevronDown, faChevronUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export default function TimePickerNew ({ handleClose, handleChange, action, value, btnEnabled }) {

    //STATE
    // const [ selectedTime, setSelectedTime ] = useState({
    //     hour: ''
    // })

    

    //REF
    const innerRef = useRef( null )

    //FUNCTIONS
    const handleHour = ( operation ) => {

        if( operation === 'adds'){
            if( value.hour > 0 && value.hour < 12 ){
                handleChange( 'hour', value.hour + 1 )
            } else if ( value.hour === 12 ){
                handleChange( 'hour', 1 )
            }
        } else if( operation === 'substracts' ){
            if( value.hour > 1 && value.hour <= 12 ){
                handleChange( 'hour', value.hour - 1 )
            } else if ( value.hour === 1 ){
                handleChange( 'hour', 12 )
            }
        }
    }

    const handleMinute = ( operation ) => {
        if( operation === 'adds'){
            if( value.minute >= 0 && value.minute < 45 ){
                handleChange( 'minute', value.minute + 15 )
            } else if ( value.minute === 45 ){
                handleChange( 'minute', 0 )
            }
        } else if( operation === 'substracts' ){
            if( value.minute > 0 && value.minute <= 45 ){
                handleChange( 'minute', value.minute - 15 )
            } else if ( value.minute === 0 ){
                handleChange( 'minute', 45 )
            }
        }
    }

    useEffect(() => {

        const handleOutsideClick = ( event ) => {
            if ( innerRef.current && !innerRef.current.contains( event.target )) {

                handleClose( false , false )
            }
        };

        document.addEventListener( "mousedown", handleOutsideClick) 

        return () => {
            document.removeEventListener( "mousedown", handleOutsideClick )
        }
    }, [ handleClose ]); 


    return(
        <div className="time-picker-main-div">
            <div className="inner rounded" ref={ innerRef }>
                <FontAwesomeIcon icon={ faXmark } className="close-btn" onClick={ ( e ) => handleClose( false, false  )}/>
                <div className="row w-100">
                    <p>{`Select the ${action} time`}</p>
                </div>
                <div className="row w-100 h-100 body-container">

                    <div className="column">
                        <div className="time-picker-action-btn" onClick={ () => handleHour( 'adds' ) }>
                            <FontAwesomeIcon icon={ faChevronUp }/>
                        </div>
                        <div className="focus-container">
                            <input type="number" 
                            value={ value.hour } 
                            name='hour' 
                            onChange={( e ) => handleChange( e )} />
                        </div>
                        <div className="time-picker-action-btn" onClick={ () => handleHour( 'substracts' ) }>
                            <FontAwesomeIcon icon={ faChevronDown }/>
                        </div>
                    </div>
                    <span>:</span>
                    <div className="column">
                        <div className="time-picker-action-btn" onClick={ () => handleMinute( 'adds' ) }>
                            <FontAwesomeIcon icon={ faChevronUp }/>
                        </div>
                        <div className="focus-container">
                            <input type="number" 
                            value={ value.minute.toString().padStart(2, "0" )}
                            name='minute' 
                            onChange={( e ) => handleChange( e )} />
                        </div>
                        <div className="time-picker-action-btn" onClick={ () => handleMinute( 'substracts' ) }>
                            <FontAwesomeIcon icon={ faChevronDown }/>
                        </div>
                    </div>
                    <div className="column ampm">
                        <div className="focus-container pointer" onClick={ () => handleChange( 'ampm', value.ampm === 'am' ? 'pm' : 'am' ) }>
                            <input type="text" 
                            value={ value.ampm.toUpperCase() }
                            className="pointer"
                            name='ampm' readOnly/>
                        </div>
                        <div className="focus-container disabled" onClick={ () => handleChange( 'ampm', value.ampm === 'am' ? 'pm' : 'am' ) }>
                            <p>{ value.ampm === 'am' ? 'PM' : 'AM'}</p>
                        </div>
                    </div>
                </div>
                <div className="footer-container">
                    <button className="btn cta round-div w-100" enabled={ btnEnabled } onClick={  () => handleClose( action === 'start' ? false : false, action === 'start' ? true : false ) }>
                        { `Confirm ${ action } time`}
                    </button>
                </div>
            </div>
        </div>
    )
}
