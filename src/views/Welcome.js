import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import { useNavigate } from "react-router-dom";


export default function Welcome () {

    //ROUTER
    const navigate = useNavigate()

    return(
        <div className="view-container welcome">
            <div className="section-container logo-container">
                <img src="./images/logo.svg" alt="Hang"/>
            </div>
            <div className="section-container btn-container">
                <BtnPrimary displayText={'Log In'} action={ () => navigate('/login') } submit={ false }/>
            </div>
        </div>
    )
}