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
        // setTimeout(() => {
        //     setUserData( {
        //         name: 'Adam',
        //         lastname: 'Harrison',
        //         email: 'adamharrison@quickbooks.com',
        //         phoneNumber: '+1 261 555 5555',
        //         profilePhoto: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Ffemale1.pnge4601148-be0f-42c2-af96-3abbbfeb8039?alt=media&token=3cb6562c-0782-4de7-9a63-8c7b1abd9fa2",
        //     } )
        //     setEditedData( {
        //         name: 'Adam',
        //         lastname: 'Harrison',
        //         email: 'adamharrison@quickbooks.com',
        //         phoneNumber: '+1 261 555 5555',
        //         profilePhoto: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Ffemale1.pnge4601148-be0f-42c2-af96-3abbbfeb8039?alt=media&token=3cb6562c-0782-4de7-9a63-8c7b1abd9fa2",
        //     } )
        // }, 1000)
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
                        <EditableInput value={ editedData.name } handleChange={ handleChange } label={ 'Name' } name={'name'} editable={ true }  cancelChange={ cancelChange } />
                        <EditableInput value={ editedData.lastname } handleChange={ handleChange } label={ 'Lastname' } name={'lastname'} editable={ true } cancelChange={ cancelChange }/>
                        <EditableInput value={ editedData.email } handleChange={ handleChange } label={ 'Email' } name={'email'} editable={ true } cancelChange={ cancelChange }/>
                        <EditableInput value={ editedData.phoneNumber } handleChange={ handleChange } label={ 'Phone Number' } name={'phoneNumber'} editable={ false } cancelChange={ cancelChange }/>
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