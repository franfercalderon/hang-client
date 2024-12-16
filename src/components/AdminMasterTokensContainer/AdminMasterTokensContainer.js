
import { useCallback, useEffect, useState } from "react";
import ToggleBtn from "../ToggleBtn/ToggleBtn";
import Loader from "../Loader/Loader";
import BtnSecondary from '../BtnSecondary/BtnSecondary'
import useAuth from "../../hooks/useAuth";
import CopiedCard from "../CopiedCard/CopiedCard";

export default function AdminMasterTokensContainer(){ 

    //STATE
    const [ masterToken, setMasterToken ] = useState( null )
    const [ showCopiedCardToken, setShowCopiedCardToken ] = useState( false )
    const [ showCopiedCardUrl, setShowCopiedCardUrl ] = useState( false )

    //HOOKS
    const { getMasterToken } = useAuth()

    //FUNCTIONS
    const copyToken = () => {
        navigator.clipboard
            .writeText( masterToken )
            .then(()=> setShowCopiedCardToken( true ))
    }

    const copyUrl = () => {
        navigator.clipboard
            .writeText( `${ process.env.REACT_APP_BASE_URL }/master` )
            .then(()=> setShowCopiedCardUrl( true ))
    }

    const getToken = useCallback( async () => {
        const token = await getMasterToken()
        setMasterToken( token )

    }, [ getMasterToken ])


    //EFFECTS
    useEffect(() => {
        getToken()
    }, [ getToken ])

    useEffect(() => {
        if( showCopiedCardToken ){
            setTimeout(() => {
                setShowCopiedCardToken( false )
            }, 1000 )
        }
    }, [ showCopiedCardToken ] )

    useEffect(() => {
        if( showCopiedCardUrl ){
            setTimeout(() => {
                setShowCopiedCardUrl( false )
            }, 1000 )
        }
    }, [ showCopiedCardUrl ] )

    return(
        <>
        {
            ! masterToken?
            <Loader/>
            :
            <div className="section-container mt-2"> 
                <p>Click and copy this token to create new Master Accounts</p>
                <div>
                    <div className="admin-token-container relative">
                        <CopiedCard active={ showCopiedCardToken }/>
                        <div className="master-token-card mt-4 rounded pointer" onClick={ copyToken }>
                            <p>{ masterToken }</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 relative">
                    <CopiedCard active={ showCopiedCardUrl }/>
                    <BtnSecondary displayText={'Copy Link for Master Accounts'} action={copyUrl } enabled={ true}/>
                </div>   
            </div>
        }
        </>
    )
}