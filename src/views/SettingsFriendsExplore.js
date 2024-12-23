import TopBarNav from "../components/TopBarNav/TopBarNav";
import { useCallback, useContext, useEffect, useState } from "react";
import useFriends from "../hooks/useFriends";
import Loader from "../components/Loader/Loader";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import ExploreFriendsContainer from "../components/ExploreFriendsContainer/ExploreFriendsContainer";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function SettingsFriendsExplore(){

    //STATE
    const [ friendSuggestions, setFriendSuggestions ] = useState( null )
    const [ isLoading, setIsLoading ] = useState( true )

    //CONTEXT
    const { globalUser } = useContext( AppContext )

    //HOOK
    const { getFriendSuggestions, postFriendshipRequest } = useFriends()

    //FUNCTIONS
    const getSuggestions = useCallback( async () => {

        const suggestions = await getFriendSuggestions()
        setFriendSuggestions( suggestions )

    }, [ getFriendSuggestions ] )

    const sendInvite = async ( receiverId ) => {
        try {
            setIsLoading( true )

            const data = {
                receiverId, 
                requesterProfilePicture: globalUser.profilePhoto,
                requesterName: globalUser.name,
                requesterLastame: globalUser.lastname,
            }

            await postFriendshipRequest( data )
            setIsLoading( false )
            Swal.fire({
                title: 'Invite Sent!',
                icon: 'success',
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

    //EFFECTS
    useEffect(() => {
        getSuggestions()
    }, [ getSuggestions ] )

    useEffect(() => {
        setIsLoading( friendSuggestions ? false : true )
    }, [ friendSuggestions ])

    return(
        <ViewContainer className="friends">
            <TopBarNav navigation={'settings/friends'} title={'Discover Friends'} />
            <div className="main-view-body">
                {
                    isLoading ?
                    <Loader/>
                    :
                    <ExploreFriendsContainer friendSuggestions={ friendSuggestions } sendInvite={ sendInvite } />
                }
            </div>
        </ViewContainer>
    )
}

