import SettingsCalendarContainer from "../components/SettingsCalendarContainer/SettingsCalendarContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function SettingsCalendar(){
    return(
        <ViewContainer>
            <TopBarNav navigation={'settings'} title={'Calendar'}/>
            <div className="main-view-body">
                <SettingsCalendarContainer/>
            </div>
        </ViewContainer>
    )
}