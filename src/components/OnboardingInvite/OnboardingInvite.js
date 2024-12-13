import { useContext, useEffect, useState } from "react";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import BtnSecondary from "../BtnSecondary/BtnSecondary";
import { AppContext } from "../../context/AppContext";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";
import CopiedCard from "../CopiedCard/CopiedCard";

export default function OnboardingInvite({ handleOnboardingStage }){

    //STATE
    const [ inviteUrl, setInviteUrl ] = useState( null )
    const [ showCopiedCard, setShowCopiedCard ] = useState( false )


    //CONTEXT
    const { globalUser } = useContext( AppContext )

    //HOOKS
    const { createInviteLink } = useAuth()

    //FUNCTIONS
    const copyLink = () => {
        navigator.clipboard
            .writeText( inviteUrl )
            .then(()=> setShowCopiedCard( true ))
    }

    //EFFECTS
    useEffect(()=> {
        if( globalUser ){
            const inviteLink = createInviteLink()
            setInviteUrl( inviteLink )
        }
    }, [ globalUser, createInviteLink ])

    useEffect(() => {
        if( showCopiedCard ){
            setTimeout(() => {
                setShowCopiedCard( false )
            }, 1000 )
        }
    }, [ showCopiedCard ] )

    return(
        <>
            {
                !inviteUrl ? 
                <Loader/>
                :
                <>
                    <div className="invite-img-containter" >
                        <img src="./images/inviteIcon.svg" alt="invite"/>
                    </div>
                    <div className="relative centered onboarding-invite-btn-primary-container mt-4">
                        <CopiedCard active={ showCopiedCard }/>
                        <p>Send this Invite Link to your friends so they can join you in Hang!</p>
                        <BtnPrimary action={ copyLink } displayText={'Get Link'} enabled={ true } submit={ false }/>
                    </div>
                    <div className="bottom-container mt-4">
                        <p className="mt-2">{`Don't worry, you can get your link later in Settings > Friends`}</p>
                        <BtnSecondary action={ handleOnboardingStage } displayText={'Skip'} enabled={ true }/>
                    </div>
                </>
            }
        </>
    )
}