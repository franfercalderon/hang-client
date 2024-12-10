import { useContext, useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { AppContext } from "../context/AppContext"
import Loader from "../components/Loader/Loader"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import FeedCard from "../components/FeedCard/FeedCard"


export default function Feed () {

    //STATE
    const [ isLoading, setIsLoading ] = useState( true )

    //CONTEXT
    const { setPopulateUser, authToken, globalUser } = useContext( AppContext )
    const { signOutUser } = useAuth()

    //ROUTER
    const navigate = useNavigate()

    //EFFECTS
    // useEffect(() => {
    //     setPopulateUser( true )
    // }, [  setPopulateUser ])

    useEffect(() => {
        if( globalUser ){
            setIsLoading( false )
        }
    }, [ globalUser ])



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
                        <div className="btn-main-container">
                            <div className="btn-container pointer" onClick={ () => navigate('/notifications') }>
                                <img src="/images/bell.svg" alt="notifications"/>
                            </div>
                            {/* <div className="btn-container chat">
                                <img src="/images/bubble.svg" alt="chat"/>
                            </div> */}
                        </div>
                    </div>
                    <div className="main-view-body">
                        <div className="section-container">
                            <FeedCard title={'Bob is free today'} descritpion={ null } times={'5:00 pm to 6:30 pm '} location={'The Commuter Bar'} ctaText={ 'Join'} />
                            <FeedCard title={'Chuck has created a Hang'} descritpion={ 'Beers & Soccer' } times={'Friday at 6:00 pm'} location={'His Place'} ctaText={ 'Join'} />
                            <button onClick={signOutUser}>Sign Out</button>
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