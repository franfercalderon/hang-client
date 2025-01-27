import { useCallback, useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import Loader from "../components/Loader/Loader"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { SlotsContext } from "../context/SlotsContext"
import FeedScheduledContainer from "../components/FeedScheduledContainer/FeedScheduledContainer"
import FeedNowdContainer from "../components/FeedNowContainer/FeedNowContainer"
import ViewContainer from "../components/ViewContainer/ViewContainer"
import RecurringMatchesContainer from "../components/RecurringMatchesContainer/RecurringMatchesContainer"
// import invite from "../../../server/middleware/invite"
import Swal from "sweetalert2"
import useFriends from "../hooks/useFriends"

export default function Feed () {

    //STATE
    const [ isLoading, setIsLoading ] = useState( true )
    const [ noDataMessage, setNoDataMessage ] = useState( false )
    const [ showAlert, setShowAlert ] = useState( true )

    //CONTEXT
    const { globalUser, notificationBadge, pendingInvitation, setPendingInvitation, authToken } = useContext( AppContext )
    const { availableNowSlots, scheduledSlots, recurringMatches, getAvailableNowSlots, getScheduledSlots } = useContext( SlotsContext )

    //HOOKS
    const { acceptInvitation } = useFriends()

    //ROUTER
    const navigate = useNavigate()

    //FUNCTIONS
    const handleInvitation = useCallback (async ( friendId ) => {

        setIsLoading( true )
        await acceptInvitation( friendId )
        setPendingInvitation( null )
        Swal.fire({
            text: 'Friend added!',
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
        setIsLoading( false )
    }, [ acceptInvitation, setPendingInvitation ])

    //EFFECTS
    useEffect(() => {
        if( globalUser ){
            setIsLoading( false )
        }
    }, [ globalUser ])

    useEffect(() => {
        if( availableNowSlots && scheduledSlots && recurringMatches ){
            if ( availableNowSlots.length === 0 && scheduledSlots.length === 0 && recurringMatches.length === 0 ){
                setNoDataMessage( true )
            }
        } else {
            setNoDataMessage( false )
        }
    }, [ availableNowSlots, scheduledSlots, recurringMatches ] )

    useEffect(() => {
        if( pendingInvitation && showAlert ){
            setShowAlert( false )
            Swal.fire({
                title: null,
                text: `${ pendingInvitation.userName } has invited you to use Hang. If you accept, you will become friends.`,
                icon: "question",
                confirmButtonText: 'Accept',
                showDenyButton: true,
                denyButtonText: 'Reject',
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
                    handleInvitation( pendingInvitation.userId )
                } else {
                    setPendingInvitation ( null )
                    setShowAlert( true )
                }
            })
        }
    }, [ pendingInvitation, handleInvitation, showAlert, setPendingInvitation ])

    return(
        <ViewContainer className="feed" >

            {isLoading ? 
                <Loader/>
                :
                <>
                    <div className="section-container main-topbar">
                        <div className="feed-logo-container">
                            <img src="/images/logo_trim.svg" alt="Hang"/>
                        </div>
                        <div className="btn-main-container relative">
                            { notificationBadge &&
                                <span className="notification-badge"></span>
                            }
                            <div className="btn-container pointer" onClick={ () => navigate('/notifications') }>
                                <img src="/images/bell.svg" alt="notifications"/>
                            </div>
                        </div>
                    </div>
                    <div className="main-view-body">

                        <div className="section-container user-name-container">
                            <h3>{`Welcome ${ globalUser.name !== '' ? globalUser.name : '' }`}</h3>
                        </div>
                        <div className="section-container">
                            {
                                noDataMessage ?
                                
                                <div className="no-data-feed mt-3">
                                    <h4>Opps!</h4>
                                    <p>Your friends have no upcoming events</p>
                                </div>
                                :
                                <>  
                                    <RecurringMatchesContainer events={ recurringMatches } userId={ globalUser.id }/> 
                                    <FeedNowdContainer events={ availableNowSlots } setIsLoading={ setIsLoading } refresh={ getAvailableNowSlots }/>
                                    <FeedScheduledContainer events={ scheduledSlots } setIsLoading={ setIsLoading } refresh={ getScheduledSlots } />
                                </>
                            }
                        </div>
                    </div>
                    <div className="main-bottombar">
                        <div className="section-container">
                            <div className="btn-main-container">
                                <div className="btn-container chat pointer" onClick={ () => navigate('/events') }>
                                    <img src="/images/calendar.svg" alt="events"/>
                                </div>
                                <div className="main-btn-container pointer" onClick={ () => navigate('/create') }>
                                    <FontAwesomeIcon icon={ faPlus }/>
                                </div>
                                <div className="btn-container pointer" onClick={ () => navigate('/settings') }>
                                    <img src="/images/gear.svg" alt="settings"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </ViewContainer>
    )
}