import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import Swal from "sweetalert2"
import useUsers from "../hooks/useUsers"
import MainInput from "../components/MainInput/MainInput"
import BtnPrimary from "../components/BtnPrimary/BtnPrimary"
import OnboardingForm from "../components/OnboardingForm/OnboardingForm"

export default function Onboarding () {

    //STATE
    const [ userData, setUserData ] = useState({
        name: '',
        lastname: '',
        email: ''
    })

    const [ onboardingStage, setOnboardingStage ] = useState( 1 )
    
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
            setOnboardingStage( 2 )
            
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
    }, [  ])

    return(
        <div className="view-container onboarding">
            <div className="section-container topbar-title">
                Create Your Account
            </div>
            <div className="view-body">
                <div className="section-container">
                    {
                        onboardingStage === 1 &&
                        <OnboardingForm handleNewUser={ handleNewUser } userData={ userData } handleChange={ handleChange } />
                    }
                    {
                        onboardingStage === 2 &&
                        <p>2</p>
                    }
                </div>
            </div>
        </div>

    )
}