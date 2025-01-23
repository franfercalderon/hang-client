import { useContext, useEffect, useState } from "react"
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

export default function Feed () {

    //STATE
    const [ isLoading, setIsLoading ] = useState( true )
    const [ noDataMessage, setNoDataMessage ] = useState( false )

    //CONTEXT
    const { globalUser, notificationBadge } = useContext( AppContext )
    const { availableNowSlots, scheduledSlots, recurringMatches, getAvailableNowSlots, getScheduledSlots } = useContext( SlotsContext )

    //ROUTER
    const navigate = useNavigate()

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
                            <h3>{`Welcome ${ globalUser.name }`}</h3>
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