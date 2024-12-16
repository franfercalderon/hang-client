import Swal from "sweetalert2";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import DatePickerContainer from "../DatePickerContainer/DatePickerContainer";
import { useEffect, useState } from "react";
import useSlots from "../../hooks/useSlots";
import TimePicker from "../TimePicker/TimePicker";
import MainInput from "../MainInput/MainInput";
import Loader from '../Loader/Loader'

export default function CreateHangContainer(){ 

    //STATE
    const [ isLoading, setIsLoading ] = useState( false )
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
    const [ location, setLocation ] = useState('')
    const [ slot, setSlot ] = useState()
    const [ spots, setSpots ] = useState( 0 )
    const [ selectedDate , setSelectedDate ] = useState( null )
    const [ title, setTitle ] = useState('')

    //HOOKS
    const { convertTimeToTimestamp, postScheduledSlot } = useSlots()

    //FUNCTIONS
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

    const handleStartTime = ( e ) => {
        const { value, name } = e.target
        setStartTime(( prevValue ) => ({...prevValue, [ name ]: value }))
    }

    const handleEndTime = ( e ) => {
        const { value, name } = e.target
        setEndTime(( prevValue ) => ({...prevValue, [ name ]: value }))
    }

    const handleLocationInput = ( e ) => {
        const { value } = e.target
        setLocation( value )
    }

    const handleSpots = ( e, operation ) => {
        e.preventDefault()
        const updatedSpots = spots + operation
        setSpots( updatedSpots < 0 ? 0 : updatedSpots )

    }

    const handleTitle = ( e ) => {
        e.preventDefault()
        setTitle( e.target.value )
    }

    const handleSave = async () => {

        try {
            if ( slot.starts > slot.ends ){
                throw new Error ('Start hour must be before end hour')
            } else {
                setIsLoading( true )
                const scheduledHang = {
                    title,
                    starts: slot.starts,
                    ends: slot.ends,
                    location,
                    spots
                }
                await postScheduledSlot( scheduledHang )
                setIsLoading( false )

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
        if( startTime.ampm !== '' && startTime.hour !== '' && startTime.minute !== '' && endTime.hour !== '' && endTime.minute !== '' && endTime.ampm !== '' && selectedDate ){
            const startTimestamp = convertTimeToTimestamp( startTime, selectedDate )
            const endTimestamp = convertTimeToTimestamp( endTime, selectedDate  )
            setSlot({
                starts: startTimestamp,
                ends: endTimestamp
            })
        } else {
            setSlot( null )
        }

    }, [ startTime, endTime, convertTimeToTimestamp, selectedDate ])

    return(
        <div className="main-view-body">
            {
                isLoading ?
                <Loader/>
                :
                <>
                    <div className="section-container">
                        <div className="mt-2">
                            <MainInput handleChange={ handleTitle } value={ title } label={'Title'} optional={ true }/> 
                        </div>
                        <DatePickerContainer selectedDate={ selectedDate } setSelectedDate={ setSelectedDate } />
                        <div className="times-container">
                            <div className="inner-container" onClick={ () => setShowStartPicker( true )} >
                                <p>From</p>
                                <div className="time-display rounded">
                                    <p>{ `${ startTime.hour } : ${ startTime.minute } ${ startTime.ampm.toUpperCase() }`}</p>
                                </div>
                            </div>
                            <div className="inner-container" onClick={ () => setShowEndPicker( true )}>
                                <p>To</p>
                                <div className="time-display rounded">
                                    <p>{`${ endTime.hour } : ${ endTime.minute } ${ endTime.ampm.toUpperCase() }`}</p>
                                </div>
                            </div>
                        </div>
                        {
                            showStartPicker &&
                            <TimePicker handleClose={ handleClosePickers } handleChange={ handleStartTime } action={'start'} value={ startTime }/>
                        }
                        {
                            showEndPicker &&
                            <TimePicker handleClose={ handleClosePickers } handleChange={ handleEndTime } action={'end'} value={ endTime }/>
                        }
                        <div className="location-container">
                            <MainInput handleChange={ handleLocationInput } value={ location } label={'Location'} />
                        </div>
                        <div className="seats-container mt-2">
                            <label htmlFor="seats">Spots?<span>{` (other than you)`}</span></label>
                            <div className="seats-inner main-input">
                                <button onClick={ ( e ) => handleSpots( e, -1 )} className="pointer">-</button>
                                <p>{ spots }</p>
                                <button onClick={ ( e ) => handleSpots( e, +1 )} className="pointer">+</button>
                            </div>
                        </div>
                    </div>
                    <div className="section-container">
                        <BtnPrimary action={ handleSave } displayText={'Create Hang'} submit={ false } enabled={ slot && spots > 0 && location !== '' ? true : false }/>
                    </div>
                </>
            }
        </div>
    )
}