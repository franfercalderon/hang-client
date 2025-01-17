import { useContext, useEffect, useState } from "react"
import useSlots from "../../hooks/useSlots"
import BtnPrimary from "../BtnPrimary/BtnPrimary"
import BtnSecondary from "../BtnSecondary/BtnSecondary"
import BtnDelete from "../BtnDelete/BtnDelete"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleDown, faChevronDown, faChevronUp, faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"
import { AppContext } from "../../context/AppContext"

export default function EventCard({ event }){

    //CONTEXT
    const { globalUser } = useContext( AppContext )

    //STATE
    const [ showCardDetails, setShowCardDetails ]  = useState( false )
    const [ isOwnEvent, setIsOwnEvent ] = useState( null )

    //HOOKS
    const { formatTimestampToDate, converTimestampToString, deleteOwnEvent } = useSlots()

    //FUNCTIONS
    const handleDeleteEvent = async ( eventId ) => {

        Swal.fire({
            title: null,
            text: isOwnEvent ? 'Do you want delete your event? Friends that are attending will be notified about this.' : 'Do you want to leave this event?',
            icon: null,
            confirmButtonText: isOwnEvent ? 'Delete' : 'Leave',
            showDenyButton: true,
            denyButtonText: isOwnEvent ? 'Keep event' : 'Close',
            buttonsStyling: false,
            customClass: {
                popup: 'hang-alert-container round-div div-shadow',
                icon: 'alert-icon',
                confirmButton: 'confirm-btn btn order2',
                denyButton: 'deny-btn btn order1',
            }
        })
        .then( ( res ) => {
            if( res.isConfirmed ){
                if( isOwnEvent ){
                    deleteOwnEvent('scheduledSlots', eventId )
                } else {
                    return console.log('se va del evento', eventId);
                }
            } 
        })
        .catch(( error ) => {
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
        })
    }

    useEffect(() => {
        if ( globalUser ){
            setIsOwnEvent( globalUser.id === event.userId ? true : false )
        }
    }, [ globalUser, event ])


    return(
        <div className="event-card rounded">
            <div className="title-container mb-05">
                <h3 className="font-big">{ event.title ? event.title : isOwnEvent ? 'Your Hang' : `${ event.userName }'s Hang`}</h3>
                <p>{ `${ formatTimestampToDate( event.starts ) }. ${ converTimestampToString( event.starts ) } - ${ converTimestampToString( event.ends ) }.` }</p>
            </div>
            {
                !showCardDetails &&
                <div className="toggle-event-card-btn centered" onClick={ () => setShowCardDetails( true )}>
                    <FontAwesomeIcon icon={ faChevronDown }/>
                </div>
            }
            {
                showCardDetails &&

                <div className="event-card-details">
                    <div className="details-header">
                        <span></span>
                        <p>Event Details</p>
                        <span></span>
                    </div>
                    {
                        isOwnEvent &&
                        <p className="mt-1"><span>Visibility:</span>{ ` ${ event.isPrivate ? 'Private' : 'Open' }`}</p>
                    }
                    {
                        isOwnEvent && event.isPrivate &&
                        <p className="mt-1"><span>Spots: </span>{ event.spots }</p>
                    }
                    {
                        isOwnEvent &&
                        <p className="mt-1"><span>Attendants:</span>{ ` ${ event.attending.length > 0 ? `${ event.attending.length }:` : event.attending.length }` }</p>
                    }
                    {
                        isOwnEvent && event.attending.length > 0 &&
                        <ul >
                            {
                                event.attending.map(( attendant, idx ) => {
                                    return(
                                        <li key={ idx } className='mt-05'>
                                                <img className="profile-img-min" src={ attendant.userImg } alt={ `${attendant.name} ${ attendant.lastname}` }/>
                                            {`${attendant.name} ${ attendant.lastname}`}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                    <p className="mt-1"><span>Location: </span>{ event.location.address ? event.location.address : event.location }</p>
                    {
                        event.location.mapUrl &&
                        <div className="directions-btn rounded pointer mt-1">
                            <a href={ event.location.mapUrl } target="_blank" rel="noopener noreferrer" >Get Directions</a>
                            <FontAwesomeIcon icon={ faLocationArrow }/>
                        </div>
                        
                    }
                    <BtnDelete displayText={  globalUser.id !== event.userId ? 'Leave Event' : 'Delete Event' } action={ () => handleDeleteEvent( event.id ) } enabled={ true }/>
                    <div className="toggle-event-card-btn centered" onClick={ () => setShowCardDetails( false )}>
                        <FontAwesomeIcon icon={ faChevronUp }/>
                    </div>
                    
                </div>
            }
        </div>
    )
}