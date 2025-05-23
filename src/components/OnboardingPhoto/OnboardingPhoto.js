import { useEffect, useState } from "react"
import BtnPrimary from "../BtnPrimary/BtnPrimary"
import BtnSecondary from "../BtnSecondary/BtnSecondary"
import Swal from "sweetalert2"
import useUsers from "../../hooks/useUsers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import Loader from "../Loader/Loader"

export default function OnboardingPhoto({ handleOnboardingStage }){

    //STATE
    const [ userImg, setUserImg ] = useState( '' )
    const [ selectedFile, setSelectedFile ] = useState( null )
    const [ isLoading, setIsLoading ] = useState( false ) 

    //HOOKS
    const { uploadProfilePhoto } = useUsers()


    //FUNCTION
    const handleSelectFile = async ( e ) => {
        const file = e.target.files[ 0 ]
        if( file ){
            setSelectedFile( file )
        }
    }

    const handleUploadPhoto = async ( ) => {
        try {
            if( !selectedFile ){
                return 
            } 
            setIsLoading( true )
            await uploadProfilePhoto( selectedFile )
            setIsLoading( false )
            handleOnboardingStage()
        } catch ( error ) {
            setIsLoading( false )
            Swal.fire({
                title: 'Oops!',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'Ok',
                buttonsStyling: false,
                customClass: {
                    popup: 'hang-alert-container round-div div-shadow',
                    icon: 'alert-icon',
                    confirmButton: 'confirm-btn btn order2',
                    denyButton: 'deny-btn btn order1',
                }
            })
        }
    }

    const resetPhoto = () => {
        setUserImg( '' )
        setSelectedFile( null )
    }

    //EFFECTS
    useEffect(() => {
        if ( selectedFile ){
            const tempURL = URL.createObjectURL( selectedFile )
            setUserImg( tempURL )
        }
    }, [ selectedFile ])

    return(
        <>
        {
            isLoading ?
            <Loader/>
            :

            <>
            <p className="mb-2 fw-500">Upload Your Photo:</p>
            <div className="profile-img-container" >
                {
                    userImg &&
                    <div className="onboarding-img-close-div" onClick={ resetPhoto }>
                        <FontAwesomeIcon icon={ faXmark } />
                    </div>
                }
                <img src={ userImg !== "" ? userImg : '/images/defaultProfile.jpg' } alt="profile"/>
            </div>
            {
                ! selectedFile ?

                <div className="onboarding-input-container">
                    <label htmlFor="onboarding-img-input" className="file-input-label">
                        Select Profile Photo
                    </label>
                    <input type="file" onChange={ handleSelectFile } accept="image/*" className="onboarding-img-input" placeholder=""  id="onboarding-img-input"/>
                </div>

                :
                <>
                    <BtnPrimary action={ handleUploadPhoto } enabled={ selectedFile } displayText={ 'Upload Photo' } submit={ false }/>
                </>
                
            }
            <div className="bottom-container">
                <BtnSecondary action={ handleOnboardingStage } displayText={'Skip'} enabled={ true }/>
                <div className="centered">
                    <p className="mt text-center fs-09 op-08 w-9">{`You can update it later in Settings → My Profile`}</p>
                </div>
            </div>
            </> 
        }
        </>
    )
}