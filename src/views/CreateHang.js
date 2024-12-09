import CreateHangContainer from "../components/CreateHangContainer/CreateHangContainer";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function CreateHang (){
    return(
        <div className="view-container">
            <TopBarNav navigation={'create'} title={ 'Schedule Hang' }/>
            <CreateHangContainer/>
        </div>
    )
}