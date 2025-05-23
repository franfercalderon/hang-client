import useAlert from "../../hooks/useAlert"

export default function ExploreFriendsContainer ({ friendSuggestions, sendInvite }) { 

    const { alertInfo } = useAlert()

    return(
        <div className="section-container mt-1">
            {
                friendSuggestions.length > 0 ?
                <>  
                    <div className="row">
                        <p>You can send a Friends request to people you might know:</p>
                        <div className="inline-help centered pointer" onClick={ () => alertInfo('Friends requests need to be approved.') }>
                            <p>?</p>
                        </div>
                    </div>
                    <ul className="mt-2">
                    {
                        friendSuggestions.map(( friend, idx ) => {
                            return(
                                <li className="slim-hang-card cta-card rounded" key={ idx }> 
                                    <div className="inner">
                                        <img src={ friend.imgUrl ? friend.imgUrl : '/images/defaultProfile.jpg' } alt={ friend.name } className="profile-img-min"/>
                                        <p>{`${ friend.name } ${ friend.lastname }`}</p>
                                    </div>
                                    <div className="inline-cta pointer rounded" onClick={() => sendInvite( friend.id ) }>
                                        Add Friend
                                    </div>
                                </li>
                            )
                        })
                    }
                    </ul>
                </>
                :
                <div className="centered">
                    <p>No suggestions to show</p>
                </div>
            }
        </div>
    )
}