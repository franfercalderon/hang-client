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
import FeedCard from "../components/FeedCard/FeedCard"

export default function Feed () {

    //STATE
    const [ isLoading, setIsLoading ] = useState( false )
    const [ noDataMessage, setNoDataMessage ] = useState( false )

    //CONTEXT
    const { globalUser, notificationBadge } = useContext( AppContext )
    const { availableNowSlots, scheduledSlots } = useContext( SlotsContext )

    //ROUTER
    const navigate = useNavigate()

    //EFFECTS
    useEffect(() => {
        if( globalUser ){
            setIsLoading( false )
        }
    }, [ globalUser ])

    useEffect(() => {
        if( availableNowSlots && scheduledSlots ){
            if ( availableNowSlots.length === 0 && scheduledSlots.length === 0 ){
                setNoDataMessage( true )
            }
        } else {
            setNoDataMessage( false )
        }
    }, [ availableNowSlots, scheduledSlots ] )

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
                            {/* { notificationBadge &&
                                <span className="notification-badge"></span>
                            } */}
                            <div className="btn-container pointer" onClick={ () => navigate('/notifications') }>
                                <img src="/images/bell.svg" alt="notifications"/>
                            </div>
                        </div>
                    </div>
                    <div className="main-view-body">

                        <div className="section-container user-name-container">
                            <h3>{`Welcome ${'Persona'}`}</h3>
                        </div>
                        <div className="section-container">
                            {
                                noDataMessage &&
                                <div className="no-data-feed mt-3">
                                    <h4>Opps!</h4>
                                    <p>Your friends have no upcoming events</p>
                                </div>
                            }
                            <FeedScheduledContainer events={ scheduledSlots } setIsLoading={ setIsLoading } />
                            {/* <FeedCard title={'Movie Night'} descritpion={ null } location={ 'Union Square' } ctaText={ 'Join' } key={ '9' } starts={ 1734452124494 } ends={ 1734480000000 } userName={ 'Hannah' } userImg={ 'https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202024-12-16%20at%208.17.56%E2%80%AFPM.png07b89d2c-f9b0-4aaf-ac23-60954438004f?alt=media&token=074bac3c-44cc-4c33-92fa-d25ca9d2ae0d' } border={ false } /> */}
                            {/* <FeedNowdContainer events={ availableNowSlots } setIsLoading={ setIsLoading }/> */}
                        </div>



                        
                        {/* <div className="section-container user-name-container">
                            <h3>{`Welcome ${globalUser.name}`}</h3>
                        </div>
                        <div className="section-container">
                            {
                                noDataMessage &&
                                <div className="no-data-feed mt-3">
                                    <h4>Opps!</h4>
                                    <p>Your friends have no upcoming events</p>
                                </div>
                            }
                            <FeedNowdContainer events={ availableNowSlots } setIsLoading={ setIsLoading }/>
                            <FeedScheduledContainer events={ scheduledSlots } setIsLoading={ setIsLoading } />
                        </div> */}
                    </div>
                    <div className="main-bottombar">
                        <div className="section-container">
                            <div className="btn-main-container">
                                <div className="btn-container chat pointer" onClick={ () => navigate('/assistant') }>
                                    <img src="/images/bubble.svg" alt="assistant"/>
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