import { useEffect, useState } from "react"
import Loader from "../components/Loader/Loader"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import ViewContainer from "../components/ViewContainer/ViewContainer"
import FeedCard from "../components/FeedCard/FeedCard"
import useSlots from "../hooks/useSlots"

export default function DevFeed () {

    //STATE
    const [ isLoading, setIsLoading ] = useState( true )
    const [ testEvents, setTestEvents ] = useState( null )

    //HOOKS
    const { formatTimestampToDate, joinEvent } = useSlots()

    //ROUTER
    const navigate = useNavigate()

    //functions
    const handleJoinEvent = () => {
        console.log('se une');
    }

    //EFFECTS
    useEffect(() => {
        if( testEvents && testEvents.length > 0 ){
            setIsLoading( false )
        }
    }, [ testEvents ])

    useEffect(() => {

        const events = [
            {
                attending: [],
                starts: 1739037600000,
                ends: 1739044800000, 
                isPrivate: false,
                location: {
                    address: '30 Rockefeller Plaza, Manhattan, New York City.',
                    coordinates: {
                        lat:40.7593573,
                        lng: -73.9800723
                    }
                },
                title: 'Ice skating',
                userId: "FnNSENwcBGUGFv94jMIqN9E4pQn1",
                userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale2.pngc3b292b3-a351-4b3b-9ac5-8f7d0dcb3077?alt=media&token=5ad3cb4c-d65b-4b9a-bf26-eb73088a8a56",
                userLastname: "Coleman",
                userName: "Bobby"
            },
            {
                attending: [],
                starts: 1739037600000,
                ends: 1739044800000, 
                isPrivate: false,
                location: 'My place',
                title: 'Movie night',
                userId: "FnNSENwcBGUGFv94jMIqN9E4pQn1",
                userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale2.pngc3b292b3-a351-4b3b-9ac5-8f7d0dcb3077?alt=media&token=5ad3cb4c-d65b-4b9a-bf26-eb73088a8a56",
                userLastname: "Coleman",
                userName: "Bobby"
            },

        ]
        setTimeout(() => {
            setTestEvents( events )
        }, 1000)
    }, [ ])


    return(
        <ViewContainer className="feed" >

            { isLoading ? 
                <Loader/>
                :
                <>
                    <div className="section-container main-topbar">
                        <div className="feed-logo-container">
                            <img src="/images/logo_trim.svg" alt="Hang"/>
                        </div>
                        <div className="btn-main-container relative">
                            <div className="btn-container pointer" onClick={ () => navigate('/notifications') }>
                                <img src="/images/bell.svg" alt="notifications"/>
                            </div>
                        </div>
                    </div>
                    <div className="main-view-body">

                        <div className="section-container user-name-container">
                            <h3>{`Welcome Developer`}</h3>
                        </div>
                        <div className="section-container">
                            {
                                testEvents.length > 0 &&
                                testEvents.map(( slot, idx ) => {
                                    return (
                                        <FeedCard title={ slot.title ? slot.title : `${ slot.userName }'s Hang`} descritpion={ formatTimestampToDate( slot.starts ) } location={ slot.location } ctaText={ 'Join' } key={ idx } starts={ slot.starts } ends={ slot.ends } userName={ `${ slot.userName } ${ slot.userLastname }` } userImg={ slot.userImg } action={ () => handleJoinEvent( slot.id ) }/>
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
                </>
            }
        </ViewContainer>
    )
}