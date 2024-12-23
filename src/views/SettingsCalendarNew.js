import CalendarPickerContainer from "../components/CalendarPickerContainer/CalendarPickerContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function SettingsCalendarNew(){
    return(
        <ViewContainer>
            <TopBarNav navigation={'settings/calendar'} title={'New Available Date'}/>
            <div className="main-view-body">
                <CalendarPickerContainer/>
            </div>
        </ViewContainer>
    )
}