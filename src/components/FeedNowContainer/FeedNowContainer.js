import Swal from "sweetalert2"
import CardLoader from "../CardLoader/CardLoader"
import MainCard from "../MainCard/MainCard"
import useSlots from "../../hooks/useSlots"

export default function FeedNowdContainer ({ events, setIsLoading }) {

    //HOOKS
    const { joinEvent } = useSlots()

    //FUNCTIONS
    const handleJoinEvent = async ( eventId ) => {
        try {
            setIsLoading( true )
            await joinEvent( eventId, false )
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
                        <MainCard title={`${ slot.userName } is free today!`} descritpion={ null } location={ slot.location } ctaText={ 'Join' } key={ idx } starts={ slot.starts } ends={ slot.ends } userName={ slot.userName } userImg={ slot.userImg } border={ true } action={ () => handleJoinEvent( slot.id ) }/>
                    )
                })
            }
            </>
        }
        </>
    )
}
