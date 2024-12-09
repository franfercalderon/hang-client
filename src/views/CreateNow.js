import CreateNowContainer from "../components/CreateNowContainer/CreateNowContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function CreateNow (){
    return(
        <div className="view-container">
            <TopBarNav navigation={'create'} title={ 'Available Now' }/>
            <CreateNowContainer/>
        </div>
    )
}