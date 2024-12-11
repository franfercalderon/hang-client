import { useEffect, useState } from "react"
import useSlots from "../../hooks/useSlots"
import Loader from "../Loader/Loader"
import DayContainer from "../DayContainer/DayContainer"
import TimePicker from "../TimePicker/TimePicker"
import BtnPrimary from "../BtnPrimary/BtnPrimary"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export default function CalendarPickerContainer() {

    //STATE
    const [ isLoading, setIsLoading ] = useState( false )
    const [ selectedDays, setSelectedDays ] = useState( [] )
    const [ enableSaveBtn, setEnableSaveBtn ] = useState( false )
    const [ showStartPicker, setShowStartPicker ] = useState( false )
    const [ showEndPicker, setShowEndPicker ] = useState( false )
    const [ startTime, setStartTime ] = useState({
        hour: '',
        minute:'',
        ampm: ''
    })
    const [ endTime, setEndTime ] = useState({
        hour: '',
        minute:'',
        ampm: ''
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

    const handleStartTime = ( e ) => {
        const { value, name } = e.target
        setStartTime(( prevValue ) => ({...prevValue, [ name ]: value }))
    }

    const handleEndTime = ( e ) => {
        const { value, name } = e.target
        setEndTime(( prevValue ) => ({...prevValue, [ name ]: value }))
    }

    const resetTimes = () => {
        setStartTime({
            hour: '',
            minute:'',
            ampm: ''
        })
        setEndTime({
            hour: '',
            minute:'',
            ampm: ''
        })
    }

    const handleClosePickers = ( e, deleteData, openEndTimer ) => {
        e.preventDefault()
        setShowEndPicker( false )
        setShowStartPicker( false )
        if ( openEndTimer){
            setShowEndPicker( true )
        }
        if( deleteData ){
            resetTimes()
        }
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
            {   !showEndPicker && !showStartPicker &&
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
                                <p>{`${ startTime.hour } : ${ startTime.minute } ${ startTime.ampm.toUpperCase() }`}</p>
                            </div>
                        </div>
                        <div className="inner-container" onClick={ () => setShowEndPicker( true )}>
                            <p>To</p>
                            <div className="time-display rounded">
                                <p>{`${ endTime.hour } : ${ endTime.minute } ${ endTime.ampm.toUpperCase() }`}</p>
                            </div>
                        </div>
                    </div>
                </>
                
            }
            {
                showStartPicker &&
                <TimePicker handleClose={ handleClosePickers } handleChange={ handleStartTime } action={'start'} value={ startTime }/>
            }
            {
                showEndPicker &&
                <TimePicker handleClose={ handleClosePickers } handleChange={ handleEndTime } action={'end'} value={ endTime }/>
            }
            { 
                !showEndPicker && !showStartPicker &&
                <BtnPrimary action={ handleSaveSlot } displayText={'Save Date'} submit={ false } enabled={ enableSaveBtn }/>
            }
            </>
        }
        </div>
    )
}