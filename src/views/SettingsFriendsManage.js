import { useNavigate } from "react-router-dom";
import FeedCard from "../components/FeedCard/FeedCard";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import ManageFriendsContainer from "../components/ManageFriendsContainer/ManageFriendsContainer";
import { useCallback, useContext, useEffect, useState } from "react";
import useFriends from "../hooks/useFriends";
import Loader from "../components/Loader/Loader";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import useUsers from "../hooks/useUsers";

export default function SettingsFriendsManage(){

    //STATE
    const [ userFriends, setUserFriends ] = useState( null )
    const [ isLoading, setIsLoading ] = useState( true )

    //CONTEXT
    const { mergeArraysById, getGlobalUser } = useContext( AppContext )

    //HOOK
    const { getUserFriends } = useFriends()
    const { updateUserFriends } = useUsers()

    //FUNCTIONS
    const getFriends = useCallback( async () => {
        const res = await getUserFriends()
        const displayFriends = mergeArraysById( res, userFriends )
        displayFriends.sort(( a, b ) => a.priority - b.priority )
        setUserFriends( displayFriends )
    }, [ mergeArraysById, getUserFriends, userFriends ] )

    const handleSave = async () => {
        try {
            setIsLoading( true )
            await updateUserFriends( userFriends )
            await getGlobalUser()
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
        getFriends()
    }, [ getFriends ] )

    return(
        <div className="view-container friends">
            <TopBarNav navigation={'settings/friends'} title={'My Friends'} />
            <div className="main-view-body">
                {
                    ! userFriends ?
                    <Loader/>
                    :
                    <ManageFriendsContainer friends={ userFriends } isLoading={ isLoading } handleSave={ handleSave } />
                }
            </div>
        </div>
    )
}

