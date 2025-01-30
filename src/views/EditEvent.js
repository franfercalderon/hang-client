import EditEventContainer from "../components/EditEventContainer/EditEventContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function EditEvents(){
    return(
        <ViewContainer>
            <TopBarNav navigation={'events'} title={'Edit Hang'}/>
            <div className="main-view-body">
                <EditEventContainer/>
            </div>
        </ViewContainer>
    )
}