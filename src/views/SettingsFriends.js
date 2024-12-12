import { useNavigate } from "react-router-dom";
import FeedCard from "../components/FeedCard/FeedCard";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";

export default function SettingsFriends(){

    //ROUTER
    const navigate = useNavigate()

    return(
        <div className="view-container friends">
            <TopBarNav navigation={'settings'} title={'Friends'} />
            <div className="main-view-body">
                <div className="section-container">
                    <FeedCard title={'My Friends'} descritpion={'Manage your friends list'} action={ () => navigate('/settings/friends/manage') }/>
                    <FeedCard title={'Explore'} descritpion={'Discover people you might know'} action={ () => navigate('/settings/friends/discover') }/>
                </div>
                <div className="bottom-container section-container">
                    <p>Invite Friends to Hang</p>
                    <BtnPrimary displayText={'Get Invite Link'} enabled={ true } submit={ false }/>
                </div>
            </div>
        </div>
    )
}