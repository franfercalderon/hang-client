import Swal from "sweetalert2";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import DatePickerContainer from "../DatePickerContainer/DatePickerContainer";
import { useEffect, useState, useContext } from "react";
import useSlots from "../../hooks/useSlots";
import TimePicker from "../TimePicker/TimePicker";
import MainInput from "../MainInput/MainInput";
import Loader from '../Loader/Loader'
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppContext";
import useAlert from "../../hooks/useAlert";
import LocationInput from "../LocationInput/LocationInput";
import { LoadScriptNext } from '@react-google-maps/api';
const loadLibraries = [ 'places' ]


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
    
    const [ location, setLocation ] = useState( null )
    const [ slot, setSlot ] = useState()
    const [ spots, setSpots ] = useState( 0 )
    const [ selectedDate , setSelectedDate ] = useState( null )
    const [ title, setTitle ] = useState('')
    const [ isPrivate, setIsPrivate ] = useState( true )
    const [ enableSubmit, setEnableSubmit ] = useState( false )

    //HOOKS
    const { convertTimeToTimestamp, postScheduledSlot } = useSlots()
    const { alertInfo } = useAlert()

    //CONTEXT
    const { globalUser } = useContext( AppContext )

    //ROUTER
    const navigate = useNavigate()

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
                    spots,
                    isPrivate,
                    userImg: globalUser?.profilePhoto ? globalUser.profilePhoto : null,
                    userName: globalUser?.name ? globalUser.name : null,
                    userLastname: globalUser?.lastname ? globalUser.lastname : null,
                    attending: []
                }
                await postScheduledSlot( scheduledHang )
                setIsLoading( false )
                Swal.fire({
                    text: 'Your event has been created!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    timer: 1300,
                    buttonsStyling: false,
                    showConfirmButton: false,
                    showCancelButton: false,
                    customClass: {
                        popup: 'hang-alert-container round-div div-shadow',
                        icon: 'alert-icon',
                        confirmButton: 'confirm-btn btn order2',
                        denyButton: 'deny-btn btn order1',
                    }
                })
                navigate('/')

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

    const handleLocationChange = ( place ) => {

        const location = {
            address: place.formatted_address,
            coordinates: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            },
            mapUrl: `https://www.google.com/maps/place/?q=place_id:${ place.place_id }`

        }

        setLocation( location )
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

    useEffect(() => {
        if( isPrivate ){
            if( slot && spots > 0 && location ){
                setEnableSubmit( true )
            } else {
                setEnableSubmit( false )
            }
            
        } else {
            if( slot && location ){
                setEnableSubmit( true )
            }else {
                setEnableSubmit( false )
            }
        }
    }, [ slot, spots, location, isPrivate ])

    return(
        <div className="main-view-body">
            {
                isLoading ?
                <Loader/>
                :
                <>
                    <div className="section-container">
                        <div className="mt-1">
                            <MainInput handleChange={ handleTitle } value={ title } label={'Event Name'} optional={ true }/> 
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
                        <div className="location-container mt-1">
                            <LoadScriptNext
                                googleMapsApiKey={ process.env.REACT_APP_MAPS_API_KEY }
                                libraries={ loadLibraries }
                            >
                                <LocationInput handleChange={ handleLocationChange }/>
        
                            </LoadScriptNext>
                        </div>
                        <div className="mt-1">
                            <div className="row">
                                <p>Visibility</p>
                                <div className="inline-help centered pointer" onClick={ () => alertInfo('If "Best Friends" is selected, the app will try to fill the event based on the priorities you have assigned to your friends. <br><br> If "Everybody" is selected, the event will show to all your friends until no more spots are free.') }>
                                    <p>?</p>
                                </div>
                            </div>
                            <div className="full-width-toggle">
                                <div className={`inner ${ isPrivate ? 'active' : '' }`} onClick={() => setIsPrivate( true )}>
                                    <p>Best Friends</p>
                                </div>
                                <div className={`inner ${ !isPrivate ? 'active' : '' }`} onClick={() => setIsPrivate( false )}>
                                    <p>Everybody</p>
                                </div>
                            </div>
                        </div>
                        {
                            isPrivate &&
                            <div className="seats-container mt-1">
                                <label htmlFor="seats">Participants<span>{` (other than you)`}</span></label>
                                <div className="seats-inner main-input">
                                    <button onClick={ ( e ) => handleSpots( e, -1 )} className="pointer">-</button>
                                    <p>{ spots }</p>
                                    <button onClick={ ( e ) => handleSpots( e, +1 )} className="pointer">+</button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="section-container">
                        <BtnPrimary action={ handleSave } displayText={'Create Hang'} submit={ false } enabled={ enableSubmit }/>
                    </div>
                </>
            }
        </div>
    )
}