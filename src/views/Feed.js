import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import Loader from "../components/Loader/Loader"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import FeedCard from "../components/FeedCard/FeedCard"
import useSlots from "../hooks/useSlots"


export default function Feed () {

    //STATE
    const [ isLoading, setIsLoading ] = useState( true )

    //CONTEXT
    const { globalUser, notificationBadge } = useContext( AppContext )

    //HOOKS
    const { availableNowSlots, scheduledSlots } = useSlots()

    //ROUTER
    const navigate = useNavigate()

    //EFFECTS
    useEffect(() => {
        if( globalUser ){
            setIsLoading( false )
        }
    }, [ globalUser ])

    useEffect(() => {
        if( availableNowSlots ){
            console.log( availableNowSlots )
        }
    }, [ availableNowSlots ])

    

    return(
        <>
            {
                isLoading ? 
                <Loader/>
                :
                <div className="view-container feed">
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
                            <h3>{`Welcome ${globalUser.name}`}</h3>
                        </div>
                        <div className="section-container">
                            {
                                availableNowSlots?.map(( slot, idx ) => {
                                    console.log(slot);
                                    return(
                                        <FeedCard title={`${ slot.userName } is free today!`} descritpion={ null } location={ slot.location } ctaText={ 'Join' } key={ idx } starts={ slot.starts } ends={ slot.ends }/>
                                    )
                                })
                            }
                            <FeedCard title={'Bob is free today'} descritpion={ null } times={'5:00 pm to 6:30 pm '} location={'The Commuter Bar'} ctaText={ 'Join'} />
                            <FeedCard title={'Chuck has created a Hang'} descritpion={ 'Beers & Soccer' } times={'Friday at 6:00 pm'} location={'His Place'} ctaText={ 'Join'} />
                        </div>
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
                </div>
            }
        </>
    )
}