import AdminMasterTokensContainer from "../components/AdminMasterTokensContainer/AdminMasterTokensContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function SettingsAdmin(){
    return(
        <ViewContainer>
            <TopBarNav navigation={'settings'} title={'Admin Tools'}/>
            <div className="main-view-body">
                <AdminMasterTokensContainer/>
            </div>
        </ViewContainer>
    )
}