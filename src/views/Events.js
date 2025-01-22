import EventsContainer from "../components/EventsContainer/EventsContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function Events(){
    return(
        <ViewContainer>
            <TopBarNav navigation={''} title={'Upcoming Events'}/>
            <div className="main-view-body">
                <EventsContainer/>
            </div>
        </ViewContainer>
    )
}