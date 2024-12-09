import SettingsCalendarContainer from "../components/SettingsCalendarContainer/SettingsCalendarContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function SettingsCalendar(){
    return(
        <div className="view-container">
            <TopBarNav navigation={'settings'} title={'Calendar'}/>
            <div className="main-view-body">
                <SettingsCalendarContainer/>
            </div>
        </div>
    )
}