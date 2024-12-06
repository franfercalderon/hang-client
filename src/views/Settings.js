import FeedCard from "../components/FeedCard/FeedCard";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function Settings (){
    return(
        <div className="view-container">
            <TopBarNav navigation={''} title={ 'Settings' }/>
            <div className="main-view-body">
                <div className="section-container">
                   <FeedCard title={'Friends'} descritpion={'Invite and manage friends list'}/>
                   <FeedCard title={'Calendar'} descritpion={'See and edit your availability'}/>
                   <FeedCard title={'Notifications'} descritpion={'Choose how to receive updates'}/>
                </div>
            </div>
        </div>
    )
}