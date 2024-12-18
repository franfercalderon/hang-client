import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import useFriends from "../../hooks/useFriends";
import Loader from "../Loader/Loader";
import useNotifications from "../../hooks/useNotifications";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotificationsContainer(){

    //STATE
    const [ isLoading, setIsLoading ] = useState( false )

    //CONTEXT
    const { friendshipRequest, getGlobalUser, getUserData, authToken, notifications, removeNotification } = useContext( AppContext ) 

    //HOOKS
    const { replyFriendsRequest } = useFriends()
    const { deleteNotification } = useNotifications()

    //FUNCTIONS
    const handleDelete = async ( notificationId ) => {
        try {
            setIsLoading( true )
            await deleteNotification( notificationId )
            removeNotification( notificationId )
            setIsLoading( false )
            
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

    const replyRequest = async ( requestId, requesterId, accepted ) => {

        try {
            setIsLoading( true )
            await replyFriendsRequest( requestId, requesterId, accepted )
            setIsLoading( false )
            Swal.fire({
                text: accepted ? 'Friend added' : 'Request rejected',
                icon: accepted ? 'success' : null,
                confirmButtonText: 'Ok',
                timer: 1300,
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
            await getUserData( authToken )
            await getGlobalUser( authToken )
            
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

    const handleRequest = async ( requestId, requesterId ) => {
        Swal.fire({
            title: null,
            text: 'Do you want to accept this request?',
            icon: null,
            confirmButtonText: 'Accept',
            denyButtonText: 'Reject',
            showDenyButton: true,
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
                return replyRequest( requestId, requesterId, true )
            } else if ( res.isDenied ){
                return replyRequest( requestId, requesterId, false ) 
            }
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
        <> 
        { isLoading ? 
            <Loader/>
            :
            <div className="section-container">
                {
                    friendshipRequest?.map(( request, idx ) => {
                        return(
                            <div className="slim-hang-card cta-card rounded" key={ idx }>
                                <div className="inner">
                                    <img src={ request.requesterProfilePicture ? request.requesterProfilePicture : '/images/defaultProfile.jpg' } alt={ request.name } className="profile-img-min"/>
                                    <p>{`${ request.requesterName } ${ request.requesterLastame } wants to be your friend`}</p>
                                </div>
                                <div className="inline-cta pointer rounded" onClick={() => handleRequest( request.id, request.requesterId ) }>
                                    Reply
                                </div>
                            </div>
                        )
                    })
                }
                {
                    notifications?.map(( notification, idx ) => {
                        return(
                            <div className="slim-hang-card cta-card rounded" key={ idx }>
                                <div className="inner">
                                    <img src={ notification.senderImgUrl ? notification.senderImgUrl : '/images/defaultProfile.jpg' } alt={ notification.senderName } className="profile-img-min"/>
                                    <p>{`${ notification.senderName } ${ notification.text }`}</p>
                                </div>
                                <div className="pointer notification-card-icon" onClick={() => handleDelete( notification.id ) }>
                                    <FontAwesomeIcon icon={ faTrashCan }/>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        
        }
        </>
    )
}