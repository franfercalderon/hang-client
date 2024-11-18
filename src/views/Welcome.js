import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import BtnSecondary from "../components/BtnSecondary/BtnSecondary";
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
                <BtnSecondary displayText={'Sign Up'} action={ () => navigate('/singup') } submit={ false }/>
            </div>
        </div>
    )
}