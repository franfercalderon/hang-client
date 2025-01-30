import Swal from "sweetalert2";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import DatePickerContainer from "../DatePickerContainer/DatePickerContainer";
import { useEffect, useState, useContext, useCallback } from "react";
import useSlots from "../../hooks/useSlots";
import MainInput from "../MainInput/MainInput";
import Loader from '../Loader/Loader'
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppContext";
import useAlert from "../../hooks/useAlert";
import LocationInput from "../LocationInput/LocationInput";
import { LoadScriptNext } from '@react-google-maps/api';
import useFriends from "../../hooks/useFriends";
import TimePickerNew from "../TimePickerNew/TimePickerNew";
const loadLibraries = [ 'places' ]


export default function CreateHangContainer(){ 

    //STATE
    const [ isLoading, setIsLoading ] = useState( false )
    const [ showStartPicker, setShowStartPicker ] = useState( false )
    const [ showEndPicker, setShowEndPicker ] = useState( false )
    const [ firstSelection, setFirstSelection ] = useState( true )
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
    
    const [ location, setLocation ] = useState( null )
    const [ slot, setSlot ] = useState()
    const [ spots, setSpots ] = useState( 0 )
    const [ selectedDate , setSelectedDate ] = useState( null )
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ isPrivate, setIsPrivate ] = useState( false )
    const [ enableSubmit, setEnableSubmit ] = useState( false )
    const [ customList, setCustomList ] = useState( [] )
    const [ friendsList, setFriendsList ] = useState( null )
    const [ visibility, setVisibility ] = useState( 'everybody' )

    //HOOKS
    const { convertTimeToTimestamp, postScheduledSlot } = useSlots()
    const { alertInfo } = useAlert()

    //CONTEXT
    const { globalUser } = useContext( AppContext )

    //HOOKS
    const { getUserFriends } = useFriends()

    //ROUTER
    const navigate = useNavigate()

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

    const handleSpots = ( e, operation ) => {
        e.preventDefault()
        const updatedSpots = spots + operation
        setSpots( updatedSpots < 0 ? 0 : updatedSpots )

    }

    const handleTitle = ( e ) => {
        e.preventDefault()
        setTitle( e.target.value )
    }

    const handleDescription = ( e ) => {
        e.preventDefault()
        setDescription( e.target.value )
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
                    customList,
                    visibility,
                    description,
                    userImg: globalUser?.profilePhoto ? globalUser.profilePhoto : null,
                    userName: globalUser?.name ? globalUser.name : null,
                    userLastname: globalUser?.lastname ? globalUser.lastname : null,
                    attending: [],
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
            mapUrl: place.url
        }

        setLocation( location )
    }

    //EFFECTS
    useEffect(() => {
        if( selectedDate ){
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

        if( visibility === 'everybody' ){
            setEnableSubmit( title && slot && location ? true : false  )
        } else if ( visibility === 'auto' ){
            setEnableSubmit( title && slot && location && spots > 0 ? true : false  )
        } else if ( visibility === 'custom' ){
            setEnableSubmit( title && slot && location && customList.length > 0 ? true : false  )
        }

    }, [ slot, spots, location, visibility, customList, title ])

    useEffect(() => {
        if( visibility === 'everybody' ){
            setSpots( 0 )
            setIsPrivate( false )
            setCustomList( [] )
        } else if ( visibility === 'auto' ){
            setSpots( 0 )
            setIsPrivate( true )
            setCustomList( [] )
        } else if ( visibility === 'custom' ){
            setSpots( 0 )
            setIsPrivate( true )
            getFriendsList()
        }
    }, [ visibility, getFriendsList ] )

    useEffect(() => {
        if( visibility === 'custom' ){
            setSpots( customList.length )
        }
    }, [ customList, visibility ] )

    useEffect(() => {
        if ( selectedDate ){
            if( firstSelection ){
                setFirstSelection( false )
                setShowStartPicker( true )
            }
        }
    }, [ selectedDate, showStartPicker, firstSelection ])


    return(
        <div className="main-view-body">
            {
                isLoading ?
                <Loader/>
                :
                <>
                    <div className="section-container">
                        <div className="mt-1">
                            <MainInput handleChange={ handleTitle } value={ title } label={'Event Name'} optional={ false }/> 
                        </div>
                        <div className="mt-1">
                            <MainInput handleChange={ handleDescription } value={ description } label={'Description'} optional={ true }/> 
                        </div>
                        <DatePickerContainer selectedDate={ selectedDate } setSelectedDate={ setSelectedDate } />
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
                                <LocationInput handleChange={ handleLocationChange }/>
        
                            </LoadScriptNext>
                        </div>
                        <div className="mt-1">
                            <div className="row">
                                <p>Visibility</p>
                                <div className="inline-help centered pointer" onClick={ () => alertInfo('If "Everybody" is selected, the event will show to all your friends until no more spots are free. <br><br> If "Priority List" is selected, the app will try to fill the event based on the priorities you have assigned to your friends. <br><br> Use "Custom" mode to invite a custom list to your event.') }>
                                    <p>?</p>
                                </div>
                            </div>
                            <div className="full-width-toggle three">
                                <div className={`inner ${ visibility === 'everybody' ? 'active' : '' }`} onClick={() => setVisibility( 'everybody' )}>
                                    <p>Everybody</p>
                                </div>
                                <div className={`inner ${ visibility === 'auto'  ? 'active' : '' }`} onClick={() => setVisibility( 'auto' )}>
                                    <p>Priority List</p>
                                </div>
                                <div className={`inner ${ visibility === 'custom'  ? 'active' : '' }`} onClick={() => setVisibility( 'custom' )}>
                                    <p>Custom</p>
                                </div>
                            </div>
                        </div>
                        { visibility === 'auto' &&
                        
                            <div className="seats-container mt-1">
                                <label htmlFor="seats">Participants<span>{` (other than you)`}</span></label>
                                <div className="seats-inner main-input">
                                    <button onClick={ ( e ) => handleSpots( e, -1 )} className="pointer">-</button>
                                    <p>{ spots }</p>
                                    <button onClick={ ( e ) => handleSpots( e, +1 )} className="pointer">+</button>
                                </div>
                            </div>
                        }
                        { visibility === 'custom' && 
                            <>
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
                            </>
                        }
                        </div>
                    <div className="section-container new-hang">
                        <BtnPrimary action={ handleSave } displayText={'Create Hang'} submit={ false } enabled={ enableSubmit }/>
                    </div>
                </>
            }
        </div>
    )
}