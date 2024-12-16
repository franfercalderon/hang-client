import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function NotificationsContainer(){

    //CONTEXT
    const { friendshipRequest } = useContext( AppContext ) 

    //FUNCTIONS
    const replyRequest = async ( requestId, accepted ) => {
        console.log(requestId);
        console.log(accepted);
    }

    const handleRequest = async ( requestId ) => {
        Swal.fire({
            title: null,
            text: 'Do you want to accept this request?',
            icon: null,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Reject',
            buttonsStyling: false,
            customClass: {
                popup: 'hang-alert-container round-div div-shadow',
                icon: 'alert-icon',
                confirmButton: 'confirm-btn btn order2',
                denyButton: 'deny-btn btn order1',
            }
        })
        .then( ( res ) => {
            if( res.isConfirmed ){
                return replyRequest( requestId, true )
            } else if ( res.isDenied ){
                return replyRequest( requestId, false ) 
            }
        })
        .then(() => {
            getFixedSlots( globalUser.id )
        })
        .catch(( error ) => {
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
        })
    }

    return(
        <div className="section-container">
            {
                friendshipRequest?.map(( request, idx ) => {
                    return(
                        <div className="slim-hang-card cta-card rounded" key={ idx }>
                            <div className="inner">
                                <img src={ request.requesterProfilePicture ? request.requesterProfilePicture : '/images/defaultProfile.jpg' } alt={ request.name } className="profile-img-min"/>
                                <p>{`${ request.requesterName } ${ request.requesterLastame } wants to be your friend`}</p>
                            </div>
                            <div className="inline-cta pointer rounded" onClick={() => handleRequest( request.id ) }>
                                Reply
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}