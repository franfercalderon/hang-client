import { useEffect } from "react";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import BtnSecondary from "../BtnSecondary/BtnSecondary";

export default function OnboardingInvite({ handleOnboardingStage }){

    //FUNCTIONS
    const copyLink = () => {

    }

    useEffect(()=> {

    })
    return(
        <>
            <p>Send this Invite Link to your friends so they can join you in Hang!</p>
            <div className="invite-img-containter" >
                <img src="./images/inviteIcon.svg" alt="invite"/>
            </div>
            <BtnPrimary action={ copyLink } displayText={'Get Link'} enabled={ true } submit={ false }/>
            <div className="bottom-container">
                <p>{`Don't worry, you can get your link later in Settings > Friends`}</p>
                <BtnSecondary action={ handleOnboardingStage } displayText={'Skip'} enabled={ true }/>
            </div>

        </>
    )
}