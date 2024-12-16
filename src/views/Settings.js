import { useNavigate } from "react-router-dom";
import FeedCard from "../components/FeedCard/FeedCard";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Settings (){

    //CONTEXT
    const { globalUser } = useContext( AppContext )

    //HOOKS
    const { signOutUser } = useAuth()

    //ROUTER
    const navigate = useNavigate()

    return(
        <div className="view-container">
            <TopBarNav navigation={''} title={ 'Settings' }/>
            <div className="main-view-body">
                <div className="section-container">
                   <FeedCard title={'Friends'} descritpion={'Invite and manage friends list'} action={ () => navigate('/settings/friends') }/>
                   <FeedCard title={'Calendar'} descritpion={'See and edit your availability'} action={ () => navigate('/settings/calendar') } />
                   <FeedCard title={'Notifications'} descritpion={'Choose how to receive updates'} action={ () => navigate('/settings/notifications') }/>
                    {
                        globalUser.master &&
                        <FeedCard title={'Admin'} descritpion={'Create new admin accounts'} action={ () => navigate('/settings/admin') }/>
                    }
                   <div className="rounded cta-card pointer sign-out" onClick={ signOutUser }>
                        <p>Sign Out</p>
                   </div>
                </div>
            </div>
        </div>
    )
}