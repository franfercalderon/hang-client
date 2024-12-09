import FeedCard from "../components/FeedCard/FeedCard";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import useAuth from "../hooks/useAuth";

export default function Settings (){

    //HOOKS
    const { signOutUser } = useAuth()

    return(
        <div className="view-container">
            <TopBarNav navigation={''} title={ 'Settings' }/>
            <div className="main-view-body">
                <div className="section-container">
                   <FeedCard title={'Friends'} descritpion={'Invite and manage friends list'}/>
                   <FeedCard title={'Calendar'} descritpion={'See and edit your availability'}/>
                   <FeedCard title={'Notifications'} descritpion={'Choose how to receive updates'}/>
                   <FeedCard title={'Admin'} descritpion={'Manage admin accounts'}/>
                   <div className="rounded cta-card pointer sign-out" onClick={ signOutUser }>
                        <p>Sign Out</p>
                   </div>
                </div>
            </div>
        </div>
    )
}