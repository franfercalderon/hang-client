import { useNavigate } from "react-router-dom";
import FeedCard from "../components/FeedCard/FeedCard";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import ManageFriendsContainer from "../components/ManageFriendsContainer/ManageFriendsContainer";
import { useCallback, useEffect, useState } from "react";
import useFriends from "../hooks/useFriends";
import Loader from "../components/Loader/Loader";

export default function SettingsFriendsManage(){

    //STATE
    const [ userFriends, setUserFriends ] = useState( null )

    //HOOK
    const { getUserFriends } = useFriends()

    //FUNCTIONS
    const getFriends = useCallback( async () => {
        const res = await getUserFriends()
        setUserFriends( res )
    }, [ getUserFriends ] )

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
                    <ManageFriendsContainer/>
                }
            </div>
        </div>
    )
}