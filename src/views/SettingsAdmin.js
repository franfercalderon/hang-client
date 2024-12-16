import AdminMasterTokensContainer from "../components/AdminMasterTokensContainer/AdminMasterTokensContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function SettingsAdmin(){
    return(
        <div className="view-container">
            <TopBarNav navigation={'settings'} title={'Admin Tools'}/>
            <div className="main-view-body">
                <AdminMasterTokensContainer/>
            </div>
        </div>
    )
}