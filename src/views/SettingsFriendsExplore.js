import TopBarNav from "../components/TopBarNav/TopBarNav";
import ManageFriendsContainer from "../components/ManageFriendsContainer/ManageFriendsContainer";
import { useCallback, useContext, useEffect, useState } from "react";
import useFriends from "../hooks/useFriends";
import Loader from "../components/Loader/Loader";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import useUsers from "../hooks/useUsers";
import ExploreFriendsContainer from "../components/ExploreFriendsContainer/ExploreFriendsContainer";

export default function SettingsFriendsExplore(){

    //STATE
    const [ friendSuggestions, setFriendSuggestions ] = useState( null )
    const [ isLoading, setIsLoading ] = useState( true )

    //CONTEXT
    // const { mergeArraysById, getGlobalUser, globalUser } = useContext( AppContext )

    //HOOK
    const { getFriendSuggestions } = useFriends()
    const { updateUserProperties } = useUsers()

    //FUNCTIONS
    const getSuggestions = useCallback( async () => {

        const suggestions = await getFriendSuggestions()
        setFriendSuggestions( suggestions )

    }, [ getFriendSuggestions ] )

    const handleSave = async () => {
        try {
            setIsLoading( true )
            // const data = {
            //     friends : userFriends
            // }
            // await updateUserProperties( data )
            // await getGlobalUser()
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

    //EFFECTS
    useEffect(() => {
        getSuggestions()
    }, [ getSuggestions ] )

    // useEffect(() => {
    //     setIsLoading( userFriends ? false : true )
    // }, [ userFriends ])

    return(
        <div className="view-container friends">
            <TopBarNav navigation={'settings/friends'} title={'My Friends'} />
            <div className="main-view-body">
                {
                    ! friendSuggestions ?
                    <Loader/>
                    :
                    <ExploreFriendsContainer friendSuggestions={ friendSuggestions } isLoading={ isLoading } handleSave={ handleSave } />
                }
            </div>
        </div>
    )
}

