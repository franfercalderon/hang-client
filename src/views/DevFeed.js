import { useEffect, useState } from "react"
import Loader from "../components/Loader/Loader"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import ViewContainer from "../components/ViewContainer/ViewContainer"
import FeedCard from "../components/FeedCard/FeedCard"
import useSlots from "../hooks/useSlots"
import useAlert from "../hooks/useAlert"

export default function DevFeed () {

    //STATE
    const [ isLoading, setIsLoading ] = useState( true )
    const [ testEvents, setTestEvents ] = useState( null )
    const [ customList, setCustomList ] = useState( [] )
    const [ friendsList, setFriendsList ] = useState( null )
    const [ visibility, setVisibility ] = useState( 'everybody' )

    //HOOKS
    const { formatTimestampToDate, joinEvent } = useSlots()
    const { alertInfo } = useAlert()

    //ROUTER
    const navigate = useNavigate()


    //FUNCTIONS
    const handleJoinEvent = () => {
        console.log('se une');
    }

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

    //EFFECTS
    useEffect(() => {
        if( friendsList && friendsList.length > 0 ){
            setIsLoading( false )
        }
    }, [ friendsList ])

    useEffect(() => {

        // const events = [
        //     {
        //         attending: [],
        //         starts: 1739037600000,
        //         ends: 1739044800000, 
        //         isPrivate: false,
        //         location: {
        //             address: '30 Rockefeller Plaza, Manhattan, New York City.',
        //             coordinates: {
        //                 lat:40.7593573,
        //                 lng: -73.9800723
        //             }
        //         },
        //         title: 'Ice skating',
        //         userId: "FnNSENwcBGUGFv94jMIqN9E4pQn1",
        //         userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale2.pngc3b292b3-a351-4b3b-9ac5-8f7d0dcb3077?alt=media&token=5ad3cb4c-d65b-4b9a-bf26-eb73088a8a56",
        //         userLastname: "Coleman",
        //         userName: "Bobby"
        //     },
        //     {
        //         attending: [],
        //         starts: 1739037600000,
        //         ends: 1739044800000, 
        //         isPrivate: false,
        //         location: 'My place',
        //         title: 'Movie night',
        //         userId: "FnNSENwcBGUGFv94jMIqN9E4pQn1",
        //         userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale2.pngc3b292b3-a351-4b3b-9ac5-8f7d0dcb3077?alt=media&token=5ad3cb4c-d65b-4b9a-bf26-eb73088a8a56",
        //         userLastname: "Coleman",
        //         userName: "Bobby"
        //     },

        // ]
        // setTimeout(() => {
        //     setTestEvents( events )
        // }, 1000)
        const friends = [
            {
                id:"iuYmKKbSqMfWlARqIt4y2oTHytr1",
                imgUrl: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202024-12-13%20at%203.55.29%E2%80%AFPM.pnga29486b2-7843-4501-a61f-97d2b50ac146?alt=media&token=f7ca5960-ad73-4e50-b2ba-67edf0f0d6bd",
                lastname: "Dallas",
                name: "Loreen"
            },
            {
                id:"iuYmKKbSqMfWsaaaRqIt4y2oTHytr1",
                imgUrl: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale1.png6433d34e-1953-4d7b-af83-0500060861fc?alt=media&token=74c14b4e-27db-4b4a-87fa-77bf01fb5f47",
                lastname: "Derrick",
                name: "Moran"
            },
            {   
                id:"iuYmKKbSqMfWsaaa556THytr1",
                imgUrl: 'https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Ffemale1.pnge4601148-be0f-42c2-af96-3abbbfeb8039?alt=media&token=3cb6562c-0782-4de7-9a63-8c7b1abd9fa2',
                lastname: "Sarah",
                name: "Trosman"
            }

        ]
        setTimeout(() => {
            setFriendsList( friends )
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
                        {/* <div className="section-container">
                            {
                                testEvents.length > 0 &&
                                testEvents.map(( slot, idx ) => {
                                    return (
                                        <FeedCard title={ slot.title ? slot.title : `${ slot.userName }'s Hang`} descritpion={ formatTimestampToDate( slot.starts ) } location={ slot.location } ctaText={ 'Join' } key={ idx } starts={ slot.starts } ends={ slot.ends } userName={ `${ slot.userName } ${ slot.userLastname }` } userImg={ slot.userImg } action={ () => handleJoinEvent( slot.id ) }/>
                                    )
                                })
                            }
                        </div> */}
                        <div className="section-container">
                        <div className="mt-1">
                            <div className="row">
                                <p>Visibility</p>
                                <div className="inline-help centered pointer" onClick={ () => alertInfo('If "Best Friends" is selected, the app will try to fill the event based on the priorities you have assigned to your friends. <br><br> If "Everybody" is selected, the event will show to all your friends until no more spots are free. <br><br> Use "Custom" mode to invite a custom list to your event.') }>
                                    <p>?</p>
                                </div>
                            </div>
                            <div className="full-width-toggle three">
                                <div className={`inner ${ visibility === 'everybody' ? 'active' : '' }`} onClick={() => setVisibility( 'everybody' )}>
                                    <p>Everybody</p>
                                </div>
                                <div className={`inner ${ visibility === 'auto'  ? 'active' : '' }`} onClick={() => setVisibility( 'auto' )}>
                                    <p>Best Friends</p>
                                </div>
                                <div className={`inner ${ visibility === 'custom'  ? 'active' : '' }`} onClick={() => setVisibility( 'custom' )}>
                                    <p>Custom</p>
                                </div>
                            </div>
                            { visibility === 'auto' &&
                        
                        <div className="seats-container mt-1">
                            <label htmlFor="seats">Participants<span>{` (other than you)`}</span></label>
                            <div className="seats-inner main-input">
                                <button className="pointer">-</button>
                                <p>{ 0 }</p>
                                <button className="pointer">+</button>
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
                                    {
                                        friendsList.map(( friend, idx ) => {
                                            return(
                                                <li key={ idx }
                                                className={`${ customList.some(( item ) => item.id === friend.id ) ? 'selected' : '' } rounded`}
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
                                <p>No friends to display</p>
                            }
                            </>
                            :
                            <ul className="event-friends-list">
                                <li className="list-item-loader rounded"></li>
                                <li className="list-item-loader rounded"></li>
                                <li className="list-item-loader rounded"></li>
                            </ul>
                        }
                        </>
                    }
                        </div>
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