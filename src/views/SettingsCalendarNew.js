import CalendarPickerContainer from "../components/CalendarPickerContainer/CalendarPickerContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function SettingsCalendarNew(){
    return(
        <div className="view-container">
            <TopBarNav navigation={'settings/calendar'} title={'New Available Date'}/>
            <div className="main-view-body">
                <CalendarPickerContainer/>
            </div>
        </div>
    )
}