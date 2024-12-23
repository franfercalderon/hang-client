import SettingsNotificationsContainer from "../components/SettingsNotificationsContainer/SettingsNotificationsContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function SettingsNotifications(){
    return(
        <ViewContainer>
            <TopBarNav navigation={'settings'} title={'Notifications'}/>
            <div className="main-view-body">
                <SettingsNotificationsContainer/>
            </div>
        </ViewContainer>
    )
}