import NotificationsContainer from "../components/NotificationsContainer/NotificationsContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function SettingsNotifications(){
    return(
        <div className="view-container">
            <TopBarNav navigation={'settings'} title={'Notifications'}/>
            <div className="main-view-body">
                <NotificationsContainer/>
            </div>
        </div>
    )
}