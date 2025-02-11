import { useNavigate } from "react-router-dom";
import MainCard from "../components/MainCard/MainCard";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ViewContainer from "../components/ViewContainer/ViewContainer";
import FeedbackCard from "../components/FeedbackCard/FeedbackCard";

export default function Settings (){

    //CONTEXT
    const { globalUser } = useContext( AppContext )

    //HOOKS
    const { signOutUser } = useAuth()

    //ROUTER
    const navigate = useNavigate()

    return(
        <ViewContainer>
            <TopBarNav navigation={''} title={ 'Settings' }/>
            <div className="main-view-body">
                <div className="section-container">
                    <MainCard title={'Profile'} descritpion={'See and edit your information'} action={ () => navigate('/settings/profile') }/>
                    <MainCard title={'Friends'} descritpion={'Invite and manage friends list'} action={ () => navigate('/settings/friends') }/>
                    <MainCard title={'Calendar'} descritpion={'Manage your calendars and availability'} action={ () => navigate('/settings/calendar') } />
                    <MainCard title={'Notifications'} descritpion={'Choose how to receive updates'} action={ () => navigate('/settings/notifications') }/>
                    {
                        globalUser.master &&
                        <MainCard title={'Admin'} descritpion={'Create new admin accounts'} action={ () => navigate('/settings/admin') }/>
                    }
                    <FeedbackCard/>
                   <div className="rounded cta-card pointer sign-out" onClick={ signOutUser }>
                        <p>Sign Out</p>
                   </div>
                </div>
            </div>
        </ViewContainer>
    )
}