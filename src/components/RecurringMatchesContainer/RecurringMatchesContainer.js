import Swal from "sweetalert2"
import CardLoader from "../CardLoader/CardLoader"
// import useSlots from "../../hooks/useSlots"
import FeedCard from "../FeedCard/FeedCard"
import useSlots from "../../hooks/useSlots"

export default function RecurringMatchesContainer ({ events, setIsLoading }) {

    const { convertArrayToString }= useSlots()


    //FUNCTIONS

    // const handleJoinEvent = async ( eventId ) => {
    //     try {
    //         setIsLoading( true )
    //         await joinEvent( eventId, false )
    //         setIsLoading( false )
    //         Swal.fire({
    //             text: 'We will let your friend know you are joining!',
    //             icon: 'success',
    //             timer: 1500,
    //             buttonsStyling: false,
    //             showConfirmButton: false,
    //             showCancelButton: false,
    //             customClass: {
    //                 popup: 'hang-alert-container round-div div-shadow',
    //                 icon: 'alert-icon',
    //                 confirmButton: 'confirm-btn btn order2',
    //                 denyButton: 'deny-btn btn order1',
    //             }
    //         })
            
    //     } catch ( error ) {
    //         setIsLoading( false )
    //         Swal.fire({
    //             title: 'Oops!',
    //             text: error.message,
    //             icon: 'warning',
    //             confirmButtonText: 'Ok',
    //             buttonsStyling: false,
    //             customClass: {
    //                 popup: 'hang-alert-container round-div div-shadow',
    //                 icon: 'alert-icon',
    //                 confirmButton: 'confirm-btn btn order2',
    //                 denyButton: 'deny-btn btn order1',
    //             }
    //         })
    //     }
    // }

    return(
        <>
        {
            ! events ?
            <CardLoader/>
            :
            <>
            {
                events?.map(( match, idx ) => {
                    return(
                        <div className={` match-card feed-card rounded cta-card  'borders'  }`} key={ idx } >
                            <div className="user-header rounded">
                                <img src={ match.matchingUser.imgUrl ? match.matchingUser.imgUrl : '/images/defaultProfile.jpg' } alt={ match.matchingUser.name } className="profile-img-min"/>
                                <p>{ `${ match.matchingUser.name } ${ match.matchingUser.lastname }` }</p>
                            </div>
                            <div className="inner">
                                <div className="body-container">
                                    <div className="title-container mb-05">
                                        <h3 className="font-big">{ `You and ${ match.matchingUser.name } have a match in your calendars!` }</h3>
                                    </div>
                                    <p>{ `Both are free on ${ convertArrayToString( match.activity.commonDays ) }` }</p>
                                    <p>{`From ${ match.activity.starts.hour }:${ match.activity.starts.minute } ${ match.activity.starts.ampm.toUpperCase() } to ${ match.activity.ends.hour }:${ match.activity.ends.minute } ${ match.activity.ends.ampm.toUpperCase() }`}</p>
                                </div>
                                {/* <div className={`cta-container ${ !ctaText ? 'centered' : ''}` }>
                                    {
                                        ctaText ?
                                        <button className="card-cta font-small btn rounded pointer" onClick={ action }>{ ctaText }</button>
                                        :
                                        <FontAwesomeIcon icon={ erase ? faTrashCan : faChevronRight } onClick={ action }/>
                                    }
                                </div> */}
                            </div>
                        </div>
                    )
                })
            }
            </>
        }
        </>
    )
}
