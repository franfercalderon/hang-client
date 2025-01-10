import { useContext, useEffect, useState } from "react";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import TimePicker from "../TimePicker/TimePicker";
import MainInput from "../MainInput/MainInput";
import useSlots from "../../hooks/useSlots";
import Swal from "sweetalert2";
import Loader from '../Loader/Loader'
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppContext";
import useAlert from "../../hooks/useAlert";
import { LoadScriptNext } from '@react-google-maps/api';
import LocationInput from "../LocationInput/LocationInput";
const loadLibraries = [ 'places' ]

export default function CreateNowContainer() { 
    
    //STATE
    const [ isLoading, setIsLoading ] = useState( false )
    const [ isNow, setIsNow ] = useState( true )
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
    const [ slot, setSlot ] = useState( null )

    //HOOKS
    const { convertTimeToTimestamp, postAvailableNowSlot } = useSlots()
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

    const handleSave = async () => {

        try {
            if ( slot.starts > slot.ends ){
                throw new Error ('Start hour must be before end hour')
            } else {
                setIsLoading( true )
                const availableNowSlot = {
                    starts: slot.starts,
                    ends: slot.ends,
                    location,
                    // isPrivate,
                    userImg: globalUser?.profilePhoto ? globalUser.profilePhoto : null,
                    userName: globalUser?.name ? globalUser.name : null,
                    userLastname: globalUser?.lastname ? globalUser.lastname : null,

                }
                await postAvailableNowSlot( availableNowSlot ) 
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

    //EFFECTS
    useEffect(() => {
        if ( isNow && endTime.hour !== '' && endTime.minute !== '' && endTime.ampm !== '' ){
            const now = Date.now()
            const endTimestamp = convertTimeToTimestamp( endTime )
            setSlot({
                starts: now,
                ends: endTimestamp
            })
        } else {
            if( startTime.ampm !== '' && startTime.hour !== '' && startTime.minute !== '' && endTime.hour !== '' && endTime.minute !== '' && endTime.ampm !== '' ){
                const startTimestamp = convertTimeToTimestamp( startTime )
                const endTimestamp = convertTimeToTimestamp( endTime )
                setSlot({
                    starts: startTimestamp,
                    ends: endTimestamp
                })
            } else {
                setSlot( null )
            }
        }

    }, [ isNow, startTime, endTime, convertTimeToTimestamp ]) 


    return(
        <div className="main-view-body">
            {
                isLoading ?

                <Loader/>
                :
                <>
                    <div className="section-container">
                        <div className="full-width-toggle mt-1">
                            <div className={`inner ${ isNow ? 'active' : '' }`} onClick={() => setIsNow( true )}>
                                <p>Now</p>
                            </div>
                            <div className={`inner ${ !isNow ? 'active' : '' }`} onClick={() => setIsNow( false )}>
                                <p>Later Today</p>
                            </div>
                        </div>
                        <div className="times-container">
                            <div className="inner-container" onClick={ () => setShowStartPicker( true )} >
                                <p>From</p>
                                <div className="time-display rounded">
                                    <p>{  isNow ? 'now' : `${ startTime.hour } : ${ startTime.minute } ${ startTime.ampm.toUpperCase() }`}</p>
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
            
                    </div>

                    <div className="section-container">
                        <BtnPrimary action={ handleSave } displayText={'Save'} submit={ false } enabled={ slot && location ? true : false }/>
                    </div>
                </>
            }
        </div>
    )
}