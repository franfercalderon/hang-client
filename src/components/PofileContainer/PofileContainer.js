import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import Loader from "../Loader/Loader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons"
import EditableInput from "../EditableInput/EditableInput"
import BtnPrimary from "../BtnPrimary/BtnPrimary"
import Swal from "sweetalert2"
import useUsers from "../../hooks/useUsers"

export default function PofileContainer(){

    //STATE
    const [ userData, setUserData ] = useState( null )
    const [ editedData, setEditedData ] = useState( null )
    const [ isLoading, setIsLoading ] = useState( true )
    const [ selectedFile, setSelectedFile ] = useState( null )
    const [ userImg, setUserImg ] = useState( '' ) 
    const [ enableSubmit, setEnableSubmit ] = useState( false )
    const [ isBtnLoading, setIsBtnLoading ] = useState( false )
    const [ resetComponents, setResetComponents ] = useState( false )
    

    //CONTEXT
    const { globalUser, getGlobalUser, authToken } = useContext( AppContext )

    //HOOKS
    const { createImageUrl, updateUserProperties } = useUsers()

    //FUNCTIONS
    const updateProfile = async () => {
        try {
            setIsBtnLoading( true )
            if( userImg !== ''){

                if( !selectedFile ){
                    return
                } else {
                    const imgUrl = await createImageUrl( selectedFile )
                    if( imgUrl ){
                        const data = {
                            name: editedData.name,
                            lastname: editedData.lastname,
                            email: editedData.email,
                            profilePhoto: imgUrl
                        }
                        await updateUserProperties( data )
                    } 
                }
            } else {
                const data = {
                    name: editedData.name,
                    lastname: editedData.lastname,
                    email: editedData.email,
                }

                await updateUserProperties( data )
            }
            await getGlobalUser( authToken )
            Swal.fire({
                text: 'Profile Updated!',
                icon: 'success' ,
                confirmButtonText: 'Ok',
                timer: 1300,
                buttonsStyling: false,
                showConfirmButton: false,
                showCancelButton: false,
                customClass: {
                    popup: 'hang-alert-container round-div div-shadow',
                    icon: 'alert-icon',
                    confirmButton: 'confirm-btn btn order2',
                    denyButton: 'deny-btn btn order1',
                }
            })
            resetStates()
            setIsBtnLoading( false )

        } catch ( error ) {
            setIsBtnLoading( false )
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

    const resetStates = () => {
        setSelectedFile( null )
        setUserImg( '' )
        setResetComponents( true )

    }

    const handleChange = ( e ) => {
        const { name, value } = e.target
        setEditedData({
            ...editedData,
            [ name ]: value
        })
    }

    const handleSelectFile = async ( e ) => {
        const file = e.target.files[ 0 ]
        if( file ){
            setSelectedFile( file )
        }
    }

    const cancelChange = ( name ) => {
        setEditedData({
            ...editedData,
            [ name ]: userData[ name ]
        })
    }

    const cancelImage = () => {
        setUserImg( '' )
        setSelectedFile( null )
    }
    
    //EFFECTS
    useEffect(() => {
        if( globalUser ){
            setUserData( {
                name: globalUser.name,
                lastname: globalUser.lastname,
                email: globalUser.email,
                phoneNumber: globalUser.phoneNumber,
                profilePhoto: globalUser.profilePhoto,
            } )
            setEditedData( {
                name: globalUser.name,
                lastname: globalUser.lastname,
                email: globalUser.email,
                phoneNumber: globalUser.phoneNumber,
                profilePhoto: globalUser.profilePhoto,
            } )
        }
    }, [ globalUser ])

    useEffect(() => {
        setIsLoading( editedData === null )
    }, [ editedData ])

    useEffect(() => {
        if ( selectedFile ){
            const tempURL = URL.createObjectURL( selectedFile )
            setUserImg( tempURL )
        }
    }, [ selectedFile ])

    useEffect(() => {
        if( editedData !== null && userData !== null ){
            if( userData.name !== editedData.name || userData.lastname !== editedData.lastname || userData.email !== editedData.email || userImg !== ''){
                setEnableSubmit( true )
            } else {
                setEnableSubmit( false )
            }
        }
    }, [ userData, editedData, userImg ])


    return(
        <>
            {
                isLoading ? 
                <div className="h-100">
                    <Loader/>
                </div>
                :
                <div className="section-container profile mt-1">
                    <div className="profile-img-container" >
                        <div className="profile-img-edit-div" >
                            {   userImg === "" ? 
                                <>
                                    <label htmlFor="onboarding-img-input" className="">
                                        <FontAwesomeIcon icon={ faPen } className="gray"/>
                                    </label>
                                    <input type="file" onChange={ handleSelectFile } accept="image/*" className="onboarding-img-input" placeholder=""  id="onboarding-img-input"/>

                                </>
                                :
                                <FontAwesomeIcon icon={ faXmark } onClick={ cancelImage }/>

                            }
                        </div>
                        <img src={ userImg ? userImg : userData.profilePhoto !== "" ? userData.profilePhoto : '/images/defaultProfile.jpg' } alt="profile"/>
                    </div>
                    <form>
                        <EditableInput value={ editedData.name } handleChange={ handleChange } label={ 'Name' } name={'name'} editable={ true }  cancelChange={ cancelChange } reset={ resetComponents }/>
                        <EditableInput value={ editedData.lastname } handleChange={ handleChange } label={ 'Lastname' } name={'lastname'} editable={ true } cancelChange={ cancelChange } reset={ resetComponents }/>
                        <EditableInput value={ editedData.email } handleChange={ handleChange } label={ 'Email' } name={'email'} editable={ true } cancelChange={ cancelChange } reset={ resetComponents }/>
                        <EditableInput value={ editedData.phoneNumber } handleChange={ handleChange } label={ 'Phone Number' } name={'phoneNumber'} editable={ false } cancelChange={ cancelChange } reset={ resetComponents }/>
                        {
                            enableSubmit &&
                            <BtnPrimary displayText={'Update Profile'} enabled={ true } action={ updateProfile } btnLoading={ isBtnLoading } submit={ false }/>
                        }
                    </form> 
                </div>

            }
        </>
    )
}