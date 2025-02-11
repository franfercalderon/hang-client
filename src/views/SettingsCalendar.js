import EventsContainer from "../components/EventsContainer/EventsContainer";
import SettingsCalendarContainer from "../components/SettingsCalendarContainer/SettingsCalendarContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function SettingsCalendar(){
    return(
        <ViewContainer>
            <TopBarNav navigation={'settings'} title={ 'My Calendar' }/>
            <div className="main-view-body settings">
                <SettingsCalendarContainer/>
            </div>
        </ViewContainer>
    )
}