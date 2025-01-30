import DevEventsContainer from "../components/DevEventsContainer/DevEventsContainer";
import EventsContainer from "../components/EventsContainer/EventsContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function DevEvents(){
    return(
        <ViewContainer>
            <TopBarNav navigation={''} title={'Upcoming Events'}/>
            <div className="main-view-body">
                <DevEventsContainer/>
            </div>
        </ViewContainer>
    )
}