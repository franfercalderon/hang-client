import Swal from "sweetalert2";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import DatePickerContainer from "../DatePickerContainer/DatePickerContainer";
import { useEffect, useState, useContext, useCallback, useRef } from "react";
import useSlots from "../../hooks/useSlots";
import MainInput from "../MainInput/MainInput";
import Loader from '../Loader/Loader'
import { useNavigate, useLocation } from "react-router-dom"
import { AppContext } from "../../context/AppContext";
import useAlert from "../../hooks/useAlert";
import LocationInput from "../LocationInput/LocationInput";
import { LoadScriptNext } from '@react-google-maps/api';
import useFriends from "../../hooks/useFriends";
import TimePickerNew from "../TimePickerNew/TimePickerNew";
const loadLibraries = [ 'places' ]


export default function EditEventContainer(){ 

    //REFS
    const prevValues = useRef({ selectedDate: null, startTime: null, endTime: null })

    //STATE
    const [ isLoading, setIsLoading ] = useState( false )
    const [ showStartPicker, setShowStartPicker ] = useState( false )
    const [ showEndPicker, setShowEndPicker ] = useState( false )
    const [ originalEvent, setOriginalEvent ] = useState( null )
    const [ editedEvent, setEditedEvent ] = useState({
        
    })
    const [ selectedDate , setSelectedDate ] = useState( null )
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
    const [ enableSubmit, setEnableSubmit ] = useState( false )
    const [ customList, setCustomList ] = useState( [] )
    const [ friendsList, setFriendsList ] = useState( null )


    //HOOKS
    const { convertTimeToTimestamp, convertTimestampToTime } = useSlots()
    const { alertInfo } = useAlert()

    //CONTEXT
    const { capitalizeWords } = useContext( AppContext )

    //HOOKS
    const { getUserFriends } = useFriends()

    //ROUTER
    const navigate = useNavigate()
    const routerLocation = useLocation()


    //FUNCTIONS
    const handleCloseTimePickers = ( start, end ) => {
        setShowStartPicker( start )
        setShowEndPicker( end )
    }

    const handleStartTime = ( origin, value ) => {
        setStartTime(( prevValue ) => ({...prevValue, [ origin ]: value }))
    }

    const handleEndTime = ( origin, value ) => {
        setEndTime(( prevValue ) => ({...prevValue, [ origin ]: value }))
    }
    
    const handleEdits = ( e ) => {
        const { name, value } = e.target
        setEditedEvent(( prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const getFriendsList = useCallback( async () => {
        const friends = await getUserFriends()
        setFriendsList( friends )
    }, [ getUserFriends])


    const handleCheckboxChange = ( friendId ) => {
        if( customList.some( ( friend ) => friend.id === friendId )){
            setCustomList( customList.filter(( friend) => friend.id !== friendId ))
        } else {
            const selectedFriend = friendsList.find(( friend ) => friend.id === friendId )
            if ( selectedFriend ){
                setCustomList([...customList, selectedFriend ])
            }
        }
    }

    const handleLocationChange = ( place ) => {

        const location = {
            address: place.formatted_address,
            coordinates: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            },
            mapUrl: place.url
        }

        if (location ){
            setEditedEvent(( prev ) => ({
                ...prev,
                location: location
            }))
        }
    }

    const handleSaveChanges = async () => {

    }

    //EFFECTS
    useEffect(() => { 
        if ( !originalEvent ) return;
    
        const hasChanges = 
            ( editedEvent.title && editedEvent.title !== originalEvent.title ) ||
            ( editedEvent.description && editedEvent.description !== originalEvent.description ) ||
            ( editedEvent.starts && editedEvent.starts !== originalEvent.starts ) ||
            ( editedEvent.ends && editedEvent.ends !== originalEvent.ends ) ||
            ( editedEvent.location && editedEvent.location !== originalEvent.location )
    
        setEnableSubmit( hasChanges )
    }, [ editedEvent, originalEvent] )

    useEffect(() =>{
        const event = routerLocation.state?.event
        if( event ){
            setOriginalEvent( event )
            setSelectedDate( new Date( event.starts ))
            const startFormatted = convertTimestampToTime( event.starts )
            const endsFormatted = convertTimestampToTime( event.ends )
            setStartTime( startFormatted )
            setEndTime( endsFormatted )
        } 
    }, [ routerLocation, convertTimestampToTime ])

    useEffect(() => {
        setIsLoading( originalEvent ? false : true )
        if( originalEvent){

            console.log(originalEvent);
        }

    }, [ originalEvent ] )

    useEffect(() => {
        
        const updatedStarts = convertTimeToTimestamp( startTime, selectedDate )
        const updatedEnds = convertTimeToTimestamp( endTime, selectedDate )

        setEditedEvent(( prev ) => ({
            ...prev,
            starts: updatedStarts,
            ends: updatedEnds
        }))

    }, [ selectedDate, startTime, endTime, convertTimeToTimestamp ])

    useEffect(() => {
        getFriendsList()
    }, [ getFriendsList ])



    return(
        <div className="main-view-body">
            {
                isLoading ?
                <Loader/>
                :
                <>
                    <div className="section-container">
                        <div className="mt-1">
                            <MainInput handleChange={ handleEdits } value={ editedEvent.title ?? originalEvent?.title ?? "" } label={'Event Name'} optional={ false } name={'title'}/> 
                        </div>
                        <div className="mt-1">
                            <MainInput handleChange={ handleEdits } value={ editedEvent.description ?? originalEvent?.description ?? "" } label={'Description'} optional={ true } name={'description'} /> 
                        </div>
                        <DatePickerContainer selectedDate={ selectedDate ?? originalEvent?.starts ?? "" } setSelectedDate={ setSelectedDate } />
                        <div className="times-container">
                            <div className="inner-container" onClick={ () => setShowStartPicker( true )} >
                                <p>From</p>
                                <div className="time-display rounded">
                                    <p>{ `${ startTime.hour } : ${ startTime.minute.toString().padStart(2, "0" )  } ${ startTime.ampm.toUpperCase() }`}</p>
                                </div>
                            </div>
                            <div className="inner-container" onClick={ () => setShowEndPicker( true )}>
                                <p>To</p>
                                <div className="time-display rounded">
                                    <p>{`${ endTime.hour } : ${ endTime.minute.toString().padStart(2, "0" )  } ${ endTime.ampm.toUpperCase() }`}</p>
                                </div>
                            </div>
                        </div>
                        {
                            showStartPicker &&
                            <TimePickerNew handleClose={ handleCloseTimePickers } handleChange={ handleStartTime } action={'start'} value={ startTime }/>
                        }
                        {
                            showEndPicker &&
                            <TimePickerNew handleClose={ handleCloseTimePickers } handleChange={ handleEndTime } action={'end'} value={ endTime }/>
                        }
                        <div className="location-container mt-1">
                            <LoadScriptNext
                                googleMapsApiKey={ process.env.REACT_APP_MAPS_API_KEY }
                                libraries={ loadLibraries }
                            >
                                <LocationInput handleChange={ handleLocationChange } defaultValue={ originalEvent?.location?.address } />
        
                            </LoadScriptNext>
                        </div>
                        <div className="mt-1">
                            <div className="row">
                                <p>{`Visibility: ${ originalEvent?.visibility === "auto" 
                                        ? "Priority List" 
                                        : capitalizeWords( originalEvent?.visibility ?? "")
                                }.`}</p>
                                <div className="inline-help centered pointer" onClick={ () => alertInfo('Once an event has been created, visibility cannot be updated.') }>
                                    <p>?</p>
                                </div>
                            </div>
                        </div>
                        { originalEvent?.visibility === 'custom' && 
                            <div className="mt-1">
                            <ul className="event-friends-list">
                                <div className="fs-09">
                                    <p>Invited friends:</p>
                                </div>
                                {
                                    originalEvent?.customList.map(( friend, idx ) => {
                                        return(
                                            <li key={ idx }
                                            className={`disabled rounded`}
                                            >   
                                                <div className="title-container">
                                                    <img src={ friend.imgUrl } alt="friend" className="profile-img-min"/>
                                                    <p>{`${ friend.name } ${ friend.lastname }`}</p>
                                                </div>
                                                <div >
                                                    <p>Invited</p>
                                                </div>
                                            </li>
                                            
                                        )
                                    }) 
                                }
                            </ul>
                            { friendsList ?
                                <>
                                {
                                    friendsList.length > 0 ?

                                    <ul className="event-friends-list">
                                        <div className="fs-09">
                                            <p>Select friends:</p>
                                        </div>
                                        {
                                            friendsList.map(( friend, idx ) => {
                                                return(
                                                    <li key={ idx }
                                                    className={`${ customList.some(( item ) => item.id === friend.id ) ? 'selected' : '' } rounded pointer`}
                                                    onClick={() => handleCheckboxChange( friend.id) }
                                                    >   
                                                        <div className="title-container">
                                                            <img src={ friend.imgUrl } alt="friend" className="profile-img-min"/>
                                                            <p>{`${ friend.name } ${ friend.lastname }`}</p>
                                                        </div>
                                                        <div className={`${ customList.some(( item ) => item.id === friend.id ) ? 'selected' : '' } list-circle-marker`}>
                                                            <span></span>
                                                        </div>
                                                    </li>
                                                    
                                                )
                                            }) 
                                        }
                                    </ul>
                                    :
                                    <div className="w-100 centered fs-09">
                                        <p>No friends to display</p>
                                    </div>
                                }
                                </>
                                :
                                <div className="w-100 centered fs-09">
                                    <p>Searching friends...</p>
                                </div>
                            }
                            </div>
                        }
                        </div>
                    <div className="section-container new-hang">
                        <BtnPrimary action={ handleSaveChanges } displayText={'Save Changes'} submit={ false } enabled={ enableSubmit }/>
                    </div>
                </>
            }
        </div>
    )
}