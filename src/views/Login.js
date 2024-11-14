import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import BtnSecondary from "../components/BtnSecondary/BtnSecondary";

export default function Login () {
    return(
        <div className="view-container">
            <div className="section-container">
                <img src="./images/logo.svg" alt="Hang"/>
            </div>
            <div className="section-container">
                <BtnPrimary displayText={'Log In'}/>
                <BtnSecondary displayText={'Log In'}/>
            </div>
        </div>
    )
}