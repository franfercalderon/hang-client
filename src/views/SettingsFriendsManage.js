import { useNavigate } from "react-router-dom";
import FeedCard from "../components/FeedCard/FeedCard";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import ManageFriendsContainer from "../components/ManageFriendsContainer/ManageFriendsContainer";

export default function SettingsFriendsManage(){

    return(
        <div className="view-container friends">
            <TopBarNav navigation={'settings/friends'} title={'My Friends'} />
            <div className="main-view-body">
                <ManageFriendsContainer/>
            </div>
        </div>
    )
}