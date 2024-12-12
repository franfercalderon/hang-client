import { useContext, useEffect, useState } from "react";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import BtnSecondary from "../BtnSecondary/BtnSecondary";
import { AppContext } from "../../context/AppContext";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";

export default function OnboardingInvite({ handleOnboardingStage }){

    //STATE
    const [ inviteUrl, setInviteUrl ] = useState( null )

    //CONTEXT
    const { globalUser } = useContext( AppContext )

    //HOOKS
    const { createInviteLink } = useAuth()

    //FUNCTIONS
    const copyLink = () => {
        navigator.clipboard
            .writeText( inviteUrl )
            .then(()=> console.log('copied'))
    }

    useEffect(()=> {
        if( globalUser ){
            const inviteLink = createInviteLink()
            setInviteUrl( inviteLink )
        }
    }, [ globalUser, createInviteLink ])

    return(
        <>
            {
                !inviteUrl ? 
                <Loader/>
                :
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
            }
        </>
    )
}