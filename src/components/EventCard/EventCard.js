// import { useContext, useEffect, useState } from "react"
// import useSlots from "../../hooks/useSlots"
// import BtnDelete from "../BtnDelete/BtnDelete"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCheck, faChevronDown, faChevronUp, faLocationArrow, faPen, faXmark } from "@fortawesome/free-solid-svg-icons"
// import Swal from "sweetalert2"
// import { AppContext } from "../../context/AppContext"
// import useAlert from "../../hooks/useAlert"
// import BtnPrimary from "../BtnPrimary/BtnPrimary"

// export default function EventCard({ event, setIsLoading, refresh }){

//     //CONTEXT
//     const { globalUser } = useContext( AppContext )

//     //STATE
//     const [ showCardDetails, setShowCardDetails ]  = useState( false )
//     const [ isOwnEvent, setIsOwnEvent ] = useState( null )
//     const [ showSaveButton, setShowSaveButton ] = useState( false )
//     const [ edit, setEdit ] = useState({
//         title: false,
//         description: false,
//         date: false,
//         time: false,
//         customList: false,
//         location: false
//     })

//     const [ editedFields, setEditedFields ] = useState({
//         title: event.title,
//         description: event.description,
//         date: event.description,
//         time: null,
//         customList: null,
//         location: null
//     })

//     const [ displayInfo, setDisplayInfo ] = useState({
//         title: event.title,
//         description: event.description,
//         date: false,
//         time: false,
//         customList: false,
//         location: false
//     })

//     //HOOKS
//     const { formatTimestampToDate, converTimestampToString, deleteOwnEvent, leaveEvent } = useSlots()
//     const { alertInfo } = useAlert()

//     //FUNCTIONS
//     const handleToggleEdit = ( origin, value ) => {
//         setEdit(( prev ) => ({
//             ...prev,
//             [ origin ]: value
//         }))
//     }

//     const handleChange = ( e ) => {
//         e.preventDefault()
//         const { name, value } = e.target
//         setEditedFields(( prev ) => ({
//             ...prev,
//             [ name ]: value
//         }))
//     }


//     const runModalConfirmation = async ( eventId ) => {
//         try {
//             setIsLoading( true )
//             if ( isOwnEvent ){

//                 await deleteOwnEvent( event.availableNow ? 'availableNowSlots' : 'scheduledSlots', eventId )   
    
//             } else {
//                 await leaveEvent( event.availableNow ? 'availableNowSlots' : 'scheduledSlots', eventId )
//             }
//             await refresh()
//             setIsLoading( false )
//             Swal.fire({
//                 text: isOwnEvent ? 'Event Deleted' : 'You have left the Hang',
//                 icon: 'success' ,
//                 confirmButtonText: 'Ok',
//                 timer: 1300,
//                 buttonsStyling: false,
//                 showConfirmButton: false,
//                 showCancelButton: false,
//                 customClass: {
//                     popup: 'hang-alert-container round-div div-shadow',
//                     icon: 'alert-icon',
//                     confirmButton: 'confirm-btn btn order2',
//                     denyButton: 'deny-btn btn order1',
//                 }
//             })
            
//         } catch ( error ) {
//             setIsLoading( false )

//             Swal.fire({
//                 title: 'Oops!',
//                 text: error.message,
//                 icon: 'warning',
//                 confirmButtonText: 'Ok',
//                 buttonsStyling: false,
//                 customClass: {
//                     popup: 'hang-alert-container round-div div-shadow',
//                     icon: 'alert-icon',
//                     confirmButton: 'confirm-btn btn order2',
//                     denyButton: 'deny-btn btn order1',
//                 }
//             })
//         }
//     }

//     const handleSaveEvent = async () => {
//         console.log('saves event');
//     }

//     const handleDeleteEvent = async ( eventId ) => {

//         Swal.fire({
//             title: null,
//             text: isOwnEvent ? 'Do you want delete your event? Friends that are attending will be notified about this.' : 'Do you want to leave this event?',
//             icon: null,
//             confirmButtonText: isOwnEvent ? 'Delete' : 'Leave',
//             showDenyButton: true,
//             denyButtonText: isOwnEvent ? 'Keep event' : 'Close',
//             buttonsStyling: false,
//             customClass: {
//                 popup: 'hang-alert-container round-div div-shadow',
//                 icon: 'alert-icon',
//                 confirmButton: 'confirm-btn btn order2',
//                 denyButton: 'deny-btn btn order1',
//             }
//         })
//         .then( ( res ) => {
//             if( res.isConfirmed ){
//                 runModalConfirmation( eventId )
//             } 
//         })
//     }

//     useEffect(() => {
//         if ( globalUser ){
//             setIsOwnEvent( globalUser.id === event.userId ? true : false )
//         }
//     }, [ globalUser, event ])

//     useEffect(() => {
//         const hasEditedField = Object.values( editedFields ).some( value => value !== null )
//         setShowSaveButton( hasEditedField )
   
//     }, [ editedFields ])



//     return(
//         <div className="event-card rounded">
//             <div className="title-container mb-05">
//                 {
//                     !isOwnEvent ?
//                     <h3 className="font-big">{ event.title ? event.title : isOwnEvent ? 'Your Hang' : `${ event.userName }'s Hang`}</h3>
//                     :
//                     <>  
//                         {
//                             !edit.title ?
//                             <>
//                                 <h3 className="font-big">{ event.title ? event.title : isOwnEvent ? 'Your Hang' : `${ event.userName }'s Hang`}</h3>
//                                 <div className="btn-container">
//                                     <FontAwesomeIcon icon={ faPen } onClick={ () => handleToggleEdit('title', true ) }/>
//                                 </div>
//                             </>
//                             :
//                             <>
//                                 <input className="font-big" type="text" value={ event.title } onChange={ handleChange } name={'title'}/>
//                             </>

//                         }
//                     </>
//                 }
//                 {
//                     !showCardDetails &&
//                     <p>{ `${ event.availableNow ? 'Today' : formatTimestampToDate( event.starts ) }. ${ converTimestampToString( event.starts ) } - ${ converTimestampToString( event.ends ) }.` }</p>
//                 }
//             </div>
//             {
//                 !showCardDetails &&
//                 <div className="toggle-event-card-btn centered pointer" onClick={ () => setShowCardDetails( true )}>
//                     <FontAwesomeIcon icon={ faChevronDown }/>
//                 </div>
//             }
//             {
//                 showCardDetails &&

//                 <div className="event-card-details">
//                     <div className="details-header">
//                         <span></span>
//                         <p>Event Details</p>
//                         <span></span>
//                     </div>
//                     {
//                         showCardDetails &&
//                         <div className="row">
//                             <p className="mt-1"><span>Date:</span>{ ` ${ event.availableNow ? 'Today' : formatTimestampToDate( event.starts ) }}.`}</p>
//                             {/* {
//                                 isOwnEvent &&
//                                 <>
//                                     {
//                                         showedit.date ?

//                                     }
//                                 </>
//                             } */}
//                         </div>
//                     }
//                     {
//                         showCardDetails &&
//                         <div className="row">
//                             <p className="mt-1"><span>Time:</span>{ ` ${ converTimestampToString( event.starts ) } - ${ converTimestampToString( event.ends ) }.`}</p>
//                         </div>
//                     }
//                     {
//                         isOwnEvent &&
//                         <div className="row">
//                             <p className="mt-1"><span>Visibility:</span>{ ` ${ event.isPrivate ? 'Private' : 'Open' }`}</p>
//                             {
//                                 event.availableNow &&
//                                 <div className="inline-help centered pointer" onClick={ () => alertInfo('Available Now events are visible to all your friends.') }>
//                                     <p>?</p>
//                                 </div>
//                             }
//                         </div>
//                     }
//                     {
//                         isOwnEvent && event.isPrivate &&
//                         <p className="mt-1"><span>Spots: </span>{ event.spots }</p>
//                     }
//                     {
//                         isOwnEvent &&
//                         <p className="mt-1"><span>Attendants:</span>{ ` ${ event.attending.length > 0 ? `${ event.attending.length }:` : event.attending.length }` }</p>
//                     }
//                     {
//                         isOwnEvent && event.attending.length > 0 &&
//                         <ul >
//                             {
//                                 event.attending.map(( attendant, idx ) => {
//                                     return(
//                                         <li key={ idx } className='mt-05'>
//                                                 <img className="profile-img-min" src={ attendant.userImg } alt={ `${attendant.name} ${ attendant.lastname}` }/>
//                                             {`${attendant.name} ${ attendant.lastname}`}
//                                         </li>
//                                     )
//                                 })
//                             }
//                         </ul>
//                     }
//                     <p className="mt-1"><span>Location: </span>{ event.location.address ? event.location.address : event.location }</p>
//                     {   
//                         !isOwnEvent && event.location.mapUrl &&
//                         <div className="directions-btn rounded pointer mt-1">
//                             <a href={ event.location.mapUrl } target="_blank" rel="noopener noreferrer" >Get Directions</a>
//                             <FontAwesomeIcon icon={ faLocationArrow }/>
//                         </div>
                        
//                     }
//                     {
//                         isOwnEvent &&
//                         <BtnPrimary displayText={ 'Save Changes'} enabled={ showSaveButton } submit={ false } action={ handleSaveEvent }/>
//                     }
//                     <BtnDelete displayText={  !isOwnEvent ? 'Leave Event' : 'Delete Event' } action={ () => handleDeleteEvent( event.id ) } enabled={ true }/>
//                     <div className="toggle-event-card-btn centered pointer" onClick={ () => setShowCardDetails( false )}>
//                         <FontAwesomeIcon icon={ faChevronUp }/>
//                     </div>
                    
//                 </div>
//             }
//         </div>
//     )
// }

import { useContext, useEffect, useState } from "react";
import useSlots from "../../hooks/useSlots";
import BtnDelete from "../BtnDelete/BtnDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown, faChevronUp, faLocationArrow, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { AppContext } from "../../context/AppContext";
import useAlert from "../../hooks/useAlert";
import BtnPrimary from "../BtnPrimary/BtnPrimary";

export default function EventCard({ event, setIsLoading, refresh }) {
    // CONTEXT
    const { globalUser } = useContext(AppContext);

    // STATE
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [isOwnEvent, setIsOwnEvent] = useState(null);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [edit, setEdit] = useState({
        title: false,
        description: false,
        location: false
    });

    const [editedFields, setEditedFields] = useState({
        title: event.title || "",
        description: event.description || "",
        date: event.date || "",
        location: event.location?.address || ""
    });

    // HOOKS
    const { formatTimestampToDate, converTimestampToString, deleteOwnEvent, leaveEvent } = useSlots();
    const { alertInfo } = useAlert();

    // FUNCTIONS
    const handleToggleEdit = (field) => {
        setEdit((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedFields((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const runModalConfirmation = async (eventId) => {
        try {
            setIsLoading(true);
            if (isOwnEvent) {
                await deleteOwnEvent(event.availableNow ? "availableNowSlots" : "scheduledSlots", eventId);
            } else {
                await leaveEvent(event.availableNow ? "availableNowSlots" : "scheduledSlots", eventId);
            }
            await refresh();
            setIsLoading(false);
            Swal.fire({
                text: isOwnEvent ? "Event Deleted" : "You have left the Hang",
                icon: "success",
                timer: 1300,
                showConfirmButton: false
            });
        } catch (error) {
            setIsLoading(false);
            Swal.fire({
                title: "Oops!",
                text: error.message,
                icon: "warning",
                confirmButtonText: "Ok"
            });
        }
    };

    const handleSaveEvent = async () => {
        console.log("Saving event with:", editedFields);
        // TODO: Implement actual saving logic
    };

    const handleDeleteEvent = async (eventId) => {
        Swal.fire({
            text: isOwnEvent
                ? "Do you want to delete your event? Friends that are attending will be notified."
                : "Do you want to leave this event?",
            confirmButtonText: isOwnEvent ? "Delete" : "Leave",
            showDenyButton: true,
            denyButtonText: "Cancel"
        }).then((res) => {
            if (res.isConfirmed) {
                runModalConfirmation(eventId);
            }
        });
    };

    // Check if the logged-in user owns the event
    useEffect(() => {
        if (globalUser) {
            setIsOwnEvent(globalUser.id === event.userId);
        }
    }, [globalUser, event]);

    // Check if any field has been edited
    useEffect(() => {
        const hasEditedField = Object.keys(edit).some((key) => edit[key]);
        setShowSaveButton(hasEditedField);
    }, [edit]);

    return (
        <div className="event-card rounded">
            <div className="title-container mb-05">
                {!isOwnEvent ? (
                    <h3 className="font-big">{event.title || `${event.userName}'s Hang`}</h3>
                ) : (
                    <>
                        {!edit.title ? (
                            <>
                                <h3 className="font-big">{event.title || "Your Hang"}</h3>
                                <FontAwesomeIcon icon={faPen} onClick={() => handleToggleEdit("title")} />
                            </>
                        ) : (
                            <input
                                className="font-big"
                                type="text"
                                value={editedFields.title}
                                onChange={handleChange}
                                name="title"
                                onBlur={() => handleToggleEdit("title")}
                            />
                        )}
                    </>
                )}
                {!showCardDetails && (
                    <p>
                        {event.availableNow ? "Today" : formatTimestampToDate(event.starts)}.{" "}
                        {converTimestampToString(event.starts)} - {converTimestampToString(event.ends)}.
                    </p>
                )}
            </div>

            {!showCardDetails && (
                <div className="toggle-event-card-btn centered pointer" onClick={() => setShowCardDetails(true)}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            )}

            {showCardDetails && (
                <div className="event-card-details">
                    <div className="details-header">
                        <p>Event Details</p>
                    </div>

                    <div className="row">
                        <p className="mt-1">
                            <span>Date:</span> {event.availableNow ? "Today" : formatTimestampToDate(event.starts)}
                        </p>
                    </div>

                    <div className="row">
                        <p className="mt-1">
                            <span>Time:</span> {converTimestampToString(event.starts)} -{" "}
                            {converTimestampToString(event.ends)}
                        </p>
                    </div>

                    <div className="row">
                        <p className="mt-1">
                            <span>Location: </span>
                            {!edit.location ? (
                                <>
                                    {event.location.address || event.location}
                                    <FontAwesomeIcon icon={faPen} onClick={() => handleToggleEdit("location")} />
                                </>
                            ) : (
                                <input
                                    type="text"
                                    value={editedFields.location}
                                    onChange={handleChange}
                                    name="location"
                                    onBlur={() => handleToggleEdit("location")}
                                />
                            )}
                        </p>
                    </div>

                    {isOwnEvent && (
                        <div className="row">
                            <p className="mt-1">
                                <span>Visibility:</span> {event.isPrivate ? "Private" : "Open"}
                            </p>
                        </div>
                    )}

                    {isOwnEvent && event.isPrivate && <p className="mt-1"><span>Spots: </span>{event.spots}</p>}

                    {isOwnEvent && <p className="mt-1"><span>Attendants:</span> {event.attending.length}</p>}

                    {isOwnEvent && event.attending.length > 0 && (
                        <ul>
                            {event.attending.map((attendant, idx) => (
                                <li key={idx} className="mt-05">
                                    <img className="profile-img-min" src={attendant.userImg} alt={`${attendant.name} ${attendant.lastname}`} />
                                    {`${attendant.name} ${attendant.lastname}`}
                                </li>
                            ))}
                        </ul>
                    )}

                    {isOwnEvent && <BtnPrimary displayText="Save Changes" enabled={showSaveButton} action={handleSaveEvent} />}

                    <BtnDelete displayText={!isOwnEvent ? "Leave Event" : "Delete Event"} action={() => handleDeleteEvent(event.id)} enabled={true} />

                    <div className="toggle-event-card-btn centered pointer" onClick={() => setShowCardDetails(false)}>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                </div>
            )}
        </div>
    );
}
