
import { useCallback, useEffect, useState } from "react";
import ToggleBtn from "../ToggleBtn/ToggleBtn";
import Loader from "../Loader/Loader";
import BtnSecondary from '../BtnSecondary/BtnSecondary'
import useAuth from "../../hooks/useAuth";
import CopiedCard from "../CopiedCard/CopiedCard";

export default function AdminMasterTokensContainer(){ 

    //STATE
    const [ masterToken, setMasterToken ] = useState( null )
    const [ showCopiedCard, setShowCopiedCard ] = useState( false )

    //HOOKS
    const { getMasterToken } = useAuth()

    //FUNCTIONS
    const handleCopy = () => {
        navigator.clipboard
            .writeText( masterToken )
            .then(()=> setShowCopiedCard( true ))
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
        if( showCopiedCard ){
            setTimeout(() => {
                setShowCopiedCard( false )
            }, 1000 )
        }
    }, [ showCopiedCard ] )

    return(
        <div className="section-container mt-2">
            {
                ! masterToken?
                <Loader/>
                :
                <>
                    <p>Click and copy this token to create new Master Accounts</p>
                    <div>
                        <div className="admin-token-container relative">
                            <CopiedCard active={ showCopiedCard }/>
                            <div className="master-token-card mt-4 rounded pointer" onClick={ handleCopy }>
                                <p>{ masterToken }</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <BtnSecondary displayText={'Copy Link for Master Accounts'} />
                    </div>
                    
                </>
            }
        </div>
    )
}