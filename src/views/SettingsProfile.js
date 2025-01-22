import PofileContainer from "../components/PofileContainer/PofileContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function SettingsProfile(){
    return(
        <ViewContainer>
            <TopBarNav navigation={'settings'} title={ 'My Profile' }/>
            <div className="main-view-body">
                <PofileContainer/>
            </div>
        </ViewContainer>
    )
}