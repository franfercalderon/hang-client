import { useNavigate } from "react-router-dom";
import MainCard from "../components/MainCard/MainCard";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import CopiedCard from "../components/CopiedCard/CopiedCard";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function SettingsFriends(){

    //STATE
    const [ inviteUrl, setInviteUrl ] = useState( null )
    const [ showCopiedCard, setShowCopiedCard ] = useState( false )

    //ROUTER
    const navigate = useNavigate()

    //HOOKS
    const { createInviteLink } = useAuth()

    //FUNCTIONS
    const copyLink = () => {
        navigator.clipboard
            .writeText( inviteUrl )
            .then(()=> setShowCopiedCard( true ))
    }

    //EFFEFCTS
    useEffect(() => {
        const url = createInviteLink()
        setInviteUrl( url )
        
    }, [ createInviteLink ])

    useEffect(() => {
        if( showCopiedCard ){
            setTimeout(() => {
                setShowCopiedCard( false )
            }, 1000 )
        }
    }, [ showCopiedCard ] )

    return(
        <ViewContainer className="friends">
            <TopBarNav navigation={'settings'} title={'Friends'} />
            {
                !inviteUrl ? 
                <Loader/>
                :
                <div className="main-view-body">
                    <div className="section-container">
                        <MainCard title={'My Friends'} descritpion={'Manage your friends list'} action={ () => navigate('/settings/friends/manage') }/>
                        <MainCard title={'Explore'} descritpion={'Discover people you might know'} action={ () => navigate('/settings/friends/explore') }/>
                    </div>
                    <div className="bottom-container section-container">
                        <p>Invite Friends to Hang</p>
                        <CopiedCard active={ showCopiedCard }/>

                        <BtnPrimary displayText={'Get Invite Link'} action={ copyLink } enabled={ true } submit={ false }/>
                    </div>
                </div>
            }
        </ViewContainer>
    )
}