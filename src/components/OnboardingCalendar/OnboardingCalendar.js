import { useEffect, useState } from "react"
import DayContainer from "../DayContainer/DayContainer"
import BtnPrimary from "../BtnPrimary/BtnPrimary"
import BtnSecondary from "../BtnSecondary/BtnSecondary"
import Swal from "sweetalert2"
import useSlots from "../../hooks/useSlots"
import Loader from "../Loader/Loader"
import TimePickerNew from "../TimePickerNew/TimePickerNew"

export default function OnboardingCalendar({ handleOnboardingStage }) { 

    //STATE
    const [ isLoading, setIsLoading ] = useState( false )
    const [ savedSlots, setSavedSlots ] = useState( [] )
    const [ selectedDays, setSelectedDays ] = useState( [] )
    const [ enableSaveBtn, setEnableSaveBtn ] = useState( false )
    const [ showStartPicker, setShowStartPicker ] = useState( false )
    const [ showEndPicker, setShowEndPicker ] = useState( false )
    const [ startTime, setStartTime ] = useState({
        hour: 6,
        minute: 0,
        ampm: 'pm'
    })
    const [ endTime, setEndTime ] = useState({
        hour: 7,
        minute:0,
        ampm: 'pm'
    })

    //HOOKS
    const { postFixedSlot, validateTimes } = useSlots()

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
                setSavedSlots(( prevValue ) => [...prevValue, slot ])
                resetTimes()
                setSelectedDays([])
                setIsLoading( false )

            } else {
                throw new Error('Start time must be before end end')
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
        if( selectedDays.length > 0 ){
            setEnableSaveBtn( true )
        } else {
            setEnableSaveBtn( false )
        }
    }, [ startTime, endTime, selectedDays ])

    return(
        <>
            {
                isLoading ?
                <Loader/>
                :
                <>
                    <>  
                        <p className="mb-1 fw-500">Choose Your Available Days</p>
                        <p className="mb-2 op-08">Select the days when you'd typically be free to meet friends:</p>
                        <div className="weekdays-container mt-2">
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
                                <div className="time-display rounded pointer">
                                    <p>{`${ startTime.hour } : ${ startTime.minute.toString().padStart(2, "0" ) } ${ startTime.ampm.toUpperCase() }`}</p>
                                </div>
                            </div>
                            <div className="inner-container" onClick={ () => setShowEndPicker( true )}>
                                <p>To</p>
                                <div className="time-display rounded pointer">
                                    <p>{`${ endTime.hour } : ${ endTime.minute.toString().padStart(2, "0" )  } ${ endTime.ampm.toUpperCase() }`}</p>
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
                    <>
                        <BtnPrimary action={ handleSaveSlot } displayText={'Save Date'} submit={ false } enabled={ enableSaveBtn }/>
                        <p className="mt text-center fs-0 op-09">{`We'll combine this with your calendar to find the perfect meeting times`}</p>
                    </>
                    <div className="bottom-container">
                        {
                            savedSlots.length < 1 ?
                            <>
                                <BtnSecondary action={ handleOnboardingStage } displayText={ 'Skip' } enabled={ true } submit={ false }/>
                                <div className="centered">
                                    <p className="mt text-center fs-09 op-08 w-9">{`You can always adjust your availability later in Settings → My Calendar`}</p>

                                </div>
                            </>
                            :
                            <>  
                                <BtnPrimary action={ handleOnboardingStage } displayText={ 'Continue' } enabled={ true } submit={ false }/>
                                <div className="centered">
                                    <p className="mt text-center fs-09 op-08 w-9">Your date has been saved, you can add more or continue</p>

                                </div>
                            </>

                        }
                    </div>
                </>
            }
        </>
    )
}