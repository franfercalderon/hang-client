import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export default function TimePicker({ handleClose, handleChange, action, value }){

    //STATE
    const [ enableButton, setEnableButton ] = useState( false )

    //EFFECTS
    useEffect(() => {
        setEnableButton( value.hour !== '' && value.minute !== '' && value.ampm !== '' ? true : false )

    }, [ value ])

    return(
        <div className="time-picker-main-container round-div div-shadow">
            <FontAwesomeIcon icon={ faXmark } className="close-btn" onClick={ ( e ) => handleClose( e, true )}/>
            <p>{`Select the ${action} time`}</p>
            <div className="select-container">
                <form>
                    <div className="hour-selector inner">
                        <label htmlFor="startHour">Hour</label>
                        <select
                            id="startHour"
                            name='hour'
                            value={ value.hour }
                            onChange={( e ) => handleChange( e )}
                            className="rounded"
                        >
                            <option value="">--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <div className="minute-selector inner">
                        <label htmlFor="startMinute">Minute</label>
                        <select
                            id="startMinute"
                            name='minute'
                            value={ value.minute }
                            onChange={( e ) => handleChange( e )}
                            className="rounded"
                        >
                            <option value="">--</option>
                            <option value="00">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                    </div>
                    <div className="ampm-selector inner">
                        <label htmlFor="startHour">AM/PM</label>
                        <select
                            id="ampm"
                            name='ampm'
                            value={ value.ampm }
                            onChange={( e ) => handleChange( e )}
                            className="rounded"
                        >
                            <option value="">--</option>
                            <option value="am">AM</option>
                            <option value="pm">PM</option>
                        </select>

                    </div>
                    <button className={`btn cta rounded ${ !enableButton ? 'disabled' : ''}`} type="submit" disabled={ !enableButton } onClick={ ( e ) => handleClose( e, false ) }>
                        OK
                    </button>
                </form>
            </div>

        </div>
    )
}