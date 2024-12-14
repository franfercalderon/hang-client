import SettingsNotificationsContainer from "../components/SettingsNotificationsContainer/SettingsNotificationsContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function SettingsAdmin(){
    return(
        <div className="view-container">
            <TopBarNav navigation={'settings'} title={'Admin'}/>
            <div className="main-view-body">
                <SettingsNotificationsContainer/>
            </div>
        </div>
    )
}