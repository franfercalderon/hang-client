import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function NotificationsContainer(){

    const { friendshipRequest } = useContext( AppContext )

    //FUNCTIONS
    const handleRequest = ( requestId ) => {
        console.log(requestId);
    }

    return(
        <div className="section-container mt-2">
            {
                friendshipRequest?.map(( request, idx ) => {
                    return(
                        <div className="order-card cta-card rounded" key={ idx }>
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