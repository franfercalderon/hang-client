import EventsContainer from "../components/EventsContainer/EventsContainer";
import SettingsCalendarContainer from "../components/SettingsCalendarContainer/SettingsCalendarContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function Events(){
    return(
        <ViewContainer>
            <TopBarNav navigation={''} title={'Events'}/>
            <div className="main-view-body">
                <EventsContainer/>
                {/* <SettingsCalendarContainer/> */}
            </div>
        </ViewContainer>
    )
}