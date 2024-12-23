import { useContext } from "react";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import ViewContainer from "../components/ViewContainer/ViewContainer";


export default function Welcome () {

    //ROUTER
    const navigate = useNavigate()

    //CONTEXT
    const { inviterId } = useContext( AppContext )

    return(
        <ViewContainer className="welcome">
            <div className="section-container logo-container">
                <img src="./images/logo.svg" alt="Hang"/>
            </div>
            <div className="section-container btn-container">
                <BtnPrimary displayText={ inviterId ? 'Accept Invitation' : 'Log In'} action={ () => navigate('/login') } submit={ false } enabled={ true }/>
            </div>
        </ViewContainer>
    )
}