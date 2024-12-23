import Swal from "sweetalert2"
import useSlots from "../../hooks/useSlots"
import CardLoader from "../CardLoader/CardLoader"
import FeedCard from "../FeedCard/FeedCard"

export default function FeedScheduledContainer ({ events, setIsLoading }) {

    //HOOKS
    const { formatTimestampToDate, joinEvent } = useSlots()

    //FUNCTIONS
    const handleJoinEvent = async ( eventId ) => {
        try {
            setIsLoading( true )
            await joinEvent( eventId, true )
            setIsLoading( false )
            Swal.fire({
                text: 'We will let your friend know you are joining!',
                icon: 'success',
                timer: 1500,
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
            
        } catch ( error ) {
            setIsLoading( false )
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
        }
    }
    return(
        <>
        {
            ! events ?
            <CardLoader/>
            :
            <>
            {
                events?.map(( slot, idx ) => {
                    return(
                        <FeedCard title={ slot.title ? slot.title : `${ slot.userName }'s Hang`} descritpion={ formatTimestampToDate( slot.starts ) } location={ slot.location } ctaText={ 'Join' } key={ idx } starts={ slot.starts } ends={ slot.ends } userName={ `${ slot.userName } ${ slot.userLastname }` } userImg={ slot.userImg } action={ () => handleJoinEvent( slot.id ) }/>
                    )
                })
            }
            </>
        }
        </>
    )
}
