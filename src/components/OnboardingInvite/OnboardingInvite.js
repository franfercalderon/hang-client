import { useContext, useEffect, useState } from "react";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import BtnSecondary from "../BtnSecondary/BtnSecondary";
import { AppContext } from "../../context/AppContext";

export default function OnboardingInvite({ handleOnboardingStage }){

    //STATE
    const [ inviteUrl, setInviteUrl ] = useState( null )

    //CONTEXT
    const { firebaseUserId } = useContext( AppContext )

    //FUNCTIONS
    const copyLink = () => {
        navigator.clipboard
            .writeText( inviteUrl )
            .then(()=> console.log('copied'))
    }

    useEffect(()=> {
        if( firebaseUserId ){
            const url = `${process.env.REACT_APP_BASE_URL}/invite/${ firebaseUserId }`
            setInviteUrl( url )
        }
    }, [ firebaseUserId ])

    return(
        <>
            <p>Send this Invite Link to your friends so they can join you in Hang!</p>
            <div className="invite-img-containter mt-4" >
                <img src="./images/inviteIcon.svg" alt="invite"/>
            </div>
            <BtnPrimary action={ copyLink } displayText={'Get Link'} enabled={ true } submit={ false }/>
            <div className="bottom-container">
                <p className="mt-2">{`Don't worry, you can get your link later in Settings > Friends`}</p>
                <BtnSecondary action={ handleOnboardingStage } displayText={'Skip'} enabled={ true }/>
            </div>
        </>
    )
}