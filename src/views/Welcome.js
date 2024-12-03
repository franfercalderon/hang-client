import { useContext } from "react";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";


export default function Welcome () {

    //ROUTER
    const navigate = useNavigate()

    //ROUTER
    const { inviterId } = useContext( AppContext )

    return(
        <div className="view-container welcome">
            <div className="section-container logo-container">
                <img src="./images/logo.svg" alt="Hang"/>
            </div>
            <div className="section-container btn-container">
                <BtnPrimary displayText={ inviterId ? 'Accept Invitation' : 'Log In'} action={ () => navigate('/login') } submit={ false } enabled={ true }/>
            </div>
        </div>
    )
}