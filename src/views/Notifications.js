import NotificationsContainer from "../components/NotificationsContainer/NotificationsContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function Notifactions(){
    return(
        <div className="view-container">
            <TopBarNav navigation={''} title={'Notifications'}/>
            <div className="main-view-body">
                <NotificationsContainer/>
            </div>
        </div>
    )
}