import CreateHangContainer from "../components/CreateHangContainer/CreateHangContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function CreateHang (){
    return(
        <ViewContainer>
            <TopBarNav navigation={'create'} title={ 'Schedule Hang' }/>
            <CreateHangContainer/> 
        </ViewContainer>
    )
}