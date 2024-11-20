import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import Swal from "sweetalert2"
import useUsers from "../hooks/useUsers"
import MainInput from "../components/MainInput/MainInput"
import BtnPrimary from "../components/BtnPrimary/BtnPrimary"

export default function Onboarding () {

    //STATE
    const [ userData, setUserData ] = useState({
        name: '',
        lastname: '',
        email: ''
    })
    const [ enableSubmit, setEnableSubmit ] = useState( false )

    //CONTEXT
    const { authUser } = useContext( AppContext )

    //HOOKS
    const { createUser } = useUsers()

    //FUNCTIONS
    const handleNewUser = async ( e ) => {
        e.preventDefault()
        try {
            const user = {
                ...userData,
                phoneNumber: authUser.phoneNumber,
                id: authUser.uid
            }
            await createUser( user )
            
        } catch ( error ) {
            Swal.fire({
                title: 'Oops!',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'Ok',
                buttonsStyling: false,
                customClass: {
                    popup: 'marketsauce-alert-container round-div div-shadow',
                    icon: 'alert-icon',
                    confirmButton: 'confirm-btn btn order2',
                    denyButton: 'deny-btn btn order1',
                }
            })
        }
    }

    const handleChange = ( e ) => {
        const { name, value } = e.target
        setUserData(( prevData ) => ({
            ...prevData,
            [ name ]: value
        }))
    }

    //EFFECTS
    useEffect(() => {
        if( authUser?.phoneNumber && authUser?.uid && userData.email !== '' && userData.name !== '' && userData.lastname !== '' ){
            setEnableSubmit( true )
        } else {
            setEnableSubmit( false )
        }
    }, [ authUser, userData ])

    return(
        <div className="view-container onboarding">
            <div className="section-container topbar-title">
                Create Your Account
            </div>
            <div className="view-body">
                <div className="section-container">
                    <form>
                        <MainInput name={ 'name' } value={ userData.name } handleChange={ handleChange } label={'First Name'}/>
                        <MainInput name={ 'lastname' } value={ userData.lastname } handleChange={ handleChange } label={'Lastname'}/>
                        <MainInput name={ 'email' } value={ userData.email } handleChange={ handleChange } label={'Email'}/>
                        <BtnPrimary action={ ( e ) => handleNewUser( e ) } displayText={ 'Continue' } submit={ true } enabled={ enableSubmit }/>
                    </form>
                </div>
            </div>
        </div>

    )
}