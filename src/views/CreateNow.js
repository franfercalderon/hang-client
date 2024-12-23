import CreateNowContainer from "../components/CreateNowContainer/CreateNowContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function CreateNow (){
    return(
        <ViewContainer>
            <TopBarNav navigation={'create'} title={ 'Available Now' }/>
            <CreateNowContainer/> 
        </ViewContainer>
    )
}