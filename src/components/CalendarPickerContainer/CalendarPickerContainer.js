import { useEffect, useState } from "react"
import useSlots from "../../hooks/useSlots"
import Loader from "../Loader/Loader"
import DayContainer from "../DayContainer/DayContainer"
import BtnPrimary from "../BtnPrimary/BtnPrimary"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import TimePickerNew from "../TimePickerNew/TimePickerNew"

export default function CalendarPickerContainer() {

    //STATE
    const [ isLoading, setIsLoading ] = useState( false )
    const [ selectedDays, setSelectedDays ] = useState( [] )
    const [ enableSaveBtn, setEnableSaveBtn ] = useState( false )
    const [ showStartPicker, setShowStartPicker ] = useState( false )
    const [ showEndPicker, setShowEndPicker ] = useState( false )
    const [ startTime, setStartTime ] = useState({
        hour: 6,
        minute:0,
        ampm: 'pm'
    })
    const [ endTime, setEndTime ] = useState({
        hour: 7,
        minute:0,
        ampm: 'pm'
    })

    //HOOKS
    const { postFixedSlot, validateTimes } = useSlots()

    //ROUTER
    const navigate = useNavigate()

    //FUNCTIONS
    const handleSelectDay = ( selectedDay ) => {
        if ( selectedDays.includes( selectedDay )){
            const updatedArray = selectedDays.filter(( day ) => day !== selectedDay )
            setSelectedDays(updatedArray)
        } else {
            setSelectedDays(( prevValue ) => [...prevValue, selectedDay ])
        }
    }

    const handleStartTime = ( origin, value ) => {
        setStartTime(( prevValue ) => ({...prevValue, [ origin ]: value }))
    }

    const handleEndTime = ( origin, value ) => {

        setEndTime(( prevValue ) => ({...prevValue, [ origin ]: value }))
    }

    const resetTimes = () => {
        setStartTime({
            hour: 6,
            minute: 0,
            ampm: 'pm'
        })
        setEndTime({
            hour: 7,
            minute:0,
            ampm: 'pm'
        })
    }

    const handleCloseTimePickers = ( start, end ) => {
        setShowStartPicker( start )
        setShowEndPicker( end )
    }

    const handleSaveSlot = async () => {
        try {
            const slot = {
                days: selectedDays,
                startTime,
                endTime
            }
            setIsLoading( true )
            if( validateTimes( slot ) ){
                await postFixedSlot( slot )
                navigate('/settings/calendar')

            } else {
                throw new Error('Start date must be before End date')
            }
            
        } catch ( error ) {
            setIsLoading( false )

            Swal.fire({
                title: 'Oops!',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'Ok',
                buttonsStyling: false,
                customClass: {
                    popup: 'hang-alert-container round-div div-shadow',
                    icon: 'alert-icon',
                    confirmButton: 'confirm-btn btn order2',
                    denyButton: 'deny-btn btn order1',
                }
            })
        }
    }

    //EFFECTS
    useEffect(() => {
        if( startTime.hour !== '' && startTime.minute !== '' && startTime.ampm !== '' && endTime.hour !== '' && endTime.minute !== '' && endTime.ampm !== '' && selectedDays.length > 0 ){
            setEnableSaveBtn( true )
        } else {
            setEnableSaveBtn( false )
        }
    }, [ startTime, endTime, selectedDays ])

    return(
        <div className="section-container settings-calendar">
        {
            isLoading ?
            <Loader/>
            :

            <>
            
                <>  
                    <p className="mt-2">These will repeat weekle unless you delete them</p>
                    <div className="weekdays-container">
                        <DayContainer initial={'S'} day={'sunday'} selected={ false } selectedDays={ selectedDays } active={ false } handleSelectDay={ handleSelectDay }/>
                        <DayContainer initial={'m'} day={'monday'} selected={ false } selectedDays={ selectedDays } active={ true } handleSelectDay={ handleSelectDay }/>
                        <DayContainer initial={'t'} day={'tuesday'} selected={ false } selectedDays={ selectedDays } active={ false } handleSelectDay={ handleSelectDay }/>
                        <DayContainer initial={'w'} day={'wednesday'} selected={ false } selectedDays={ selectedDays } active={ false } handleSelectDay={ handleSelectDay }/>
                        <DayContainer initial={'t'} day={'thursday'} selected={ false } selectedDays={ selectedDays } active={ false } handleSelectDay={ handleSelectDay }/>
                        <DayContainer initial={'f'} day={'friday'} selected={ false } selectedDays={ selectedDays } active={ false } handleSelectDay={ handleSelectDay }/>
                        <DayContainer initial={'S'} day={'saturday'} selected={ false } selectedDays={ selectedDays } active={ false } handleSelectDay={ handleSelectDay }/>
                    </div>
                    <div className="times-container">
                        <div className="inner-container" onClick={ () => setShowStartPicker( true )} >
                            <p>From</p>
                            <div className="time-display rounded">
                                <p>{`${ startTime.hour } : ${ startTime.minute.toString().padStart(2, "0" ) } ${ startTime.ampm.toUpperCase() }`}</p>
                            </div>
                        </div>
                        <div className="inner-container" onClick={ () => setShowEndPicker( true )}>
                            <p>To</p>
                            <div className="time-display rounded">
                                <p>{`${ endTime.hour } : ${ endTime.minute.toString().padStart(2, "0" ) } ${ endTime.ampm.toUpperCase() }`}</p>
                            </div>
                        </div>
                    </div>
                </>
                {
                    showStartPicker &&
                    <TimePickerNew handleClose={ handleCloseTimePickers } handleChange={ handleStartTime } action={'start'} value={ startTime }/>
                }
                {
                    showEndPicker &&
                    <TimePickerNew handleClose={ handleCloseTimePickers } handleChange={ handleEndTime } action={'end'} value={ endTime }/>
                }
                { 
                    <BtnPrimary action={ handleSaveSlot } displayText={'Save Date'} submit={ false } enabled={ enableSaveBtn }/>
                }
            </>
        }
        </div>
    )
}