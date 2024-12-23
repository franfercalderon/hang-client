import NotificationsContainer from "../components/NotificationsContainer/NotificationsContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function Notifactions(){
    return(
        <ViewContainer>
            <TopBarNav navigation={''} title={ 'Notifications' }/>
            <div className="main-view-body">
                <NotificationsContainer/>
            </div>
        </ViewContainer>
    )
}