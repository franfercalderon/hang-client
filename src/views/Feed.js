import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import Loader from "../components/Loader/Loader"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import FeedCard from "../components/FeedCard/FeedCard"
import { SlotsContext } from "../context/SlotsContext"
import CardLoader from "../components/CardLoader/CardLoader"

export default function Feed () {

    //STATE
    const [ isLoading, setIsLoading ] = useState( true )

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
                            <CardLoader/>
                            {
                                availableNowSlots?.map(( slot, idx ) => {
                                    return(
                                        <FeedCard title={`${ slot.userName } is free today!`} descritpion={ null } location={ slot.location } ctaText={ 'Join' } key={ idx } starts={ slot.starts } ends={ slot.ends } userName={ slot.userName } userImg={ slot.userImg } border={ true }/>
                                    )
                                })
                            }
                            {
                                scheduledSlots?.map(( slot, idx ) => {
                                    return(
                                        <FeedCard title={ slot.title ? slot.title : `${ slot.userName }'s Hang`} descritpion={ null } location={ slot.location } ctaText={ 'Join' } key={ idx } starts={ slot.starts } ends={ slot.ends } userName={ slot.userName } userImg={ slot.userImg } />
                                    )
                                })
                            }
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