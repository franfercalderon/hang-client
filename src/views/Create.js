import { useNavigate } from "react-router-dom";
import MainCard from "../components/MainCard/MainCard";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function Create (){

    //ROUTER
    const navigate = useNavigate()

    return(
        <div className="view-container">
            <TopBarNav navigation={''} title={ 'New' }/>
            <div className="main-view-body">
                <div className="section-container">
                   <MainCard title={'Available Now'} descritpion={'Let your friends know your are free'} action={ () => navigate('/create/now') }/>
                   <MainCard title={'Create a Hang'} descritpion={'Schedule for later'} action={ () => navigate('/create/hang') }/>
                </div>
            </div>
        </div>
    )
}