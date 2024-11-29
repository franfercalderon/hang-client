import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import Swal from "sweetalert2"
import useUsers from "../hooks/useUsers"
// import MainInput from "../components/MainInput/MainInput"
// import BtnPrimary from "../components/BtnPrimary/BtnPrimary"
import OnboardingForm from "../components/OnboardingForm/OnboardingForm"
import OnboardingPhoto from "../components/OnboardingPhoto/OnboardingPhoto"
import BtnSecondary from "../components/BtnSecondary/BtnSecondary"
import OnboardingCalendar from "../components/OnboardingCalendar/OnboardingCalendar"
import OnboardingInvite from "../components/OnboardingInvite/OnboardingInvite"
import { useNavigate } from "react-router-dom"

export default function Onboarding () {

    //STATE
    const [ userData, setUserData ] = useState({
        name: '',
        lastname: '',
        email: ''
    })
    const [ onboardingStage, setOnboardingStage ] = useState( 1 )
    
    //CONTEXT
    const { setPopulateUser } = useContext( AppContext )

    //HOOKS
    const { updateUserById } = useUsers()

    //ROUTER
    const navigate = useNavigate()

    //FUNCTIONS
    const updateUserInfo = async ( e ) => {
        e.preventDefault()
        try {
            await updateUserById( userData )
            handleOnboardingStage()
            
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

    const handleOnboardingStage = () => {
        if( onboardingStage < 4 ){
            setOnboardingStage( onboardingStage + 1 )
        } else {
            setOnboardingStage( 1 )
            setPopulateUser( true )
            navigate('/')
        }
    }

    const handleChange = ( e ) => {
        const { name, value } = e.target
        setUserData(( prevData ) => ({
            ...prevData,
            [ name ]: value
        }))
    }


    return(
        <div className="view-container onboarding">
            <div className="section-container topbar-title">
                {
                    onboardingStage === 1 &&
                    <p>Create Your Account</p>
                }
                {
                    onboardingStage === 2 &&
                    <p>Add a Profile Photo</p>
                }
                {
                    onboardingStage === 3 &&
                    <p>Set Up Your Availability</p>
                }
                {
                    onboardingStage === 4 &&
                    <p>Invite Friends</p>
                }
            </div>
            <div className="view-body">
                <div className="section-container full-height">
                    {
                        onboardingStage === 1 &&
                        <OnboardingForm updateUserInfo={ updateUserInfo } userData={ userData } handleChange={ handleChange } />
                    }
                    {
                        onboardingStage === 2 &&
                        <OnboardingPhoto handleOnboardingStage={ handleOnboardingStage } />
                    }
                    {
                        onboardingStage === 3 &&
                        <OnboardingCalendar handleOnboardingStage={ handleOnboardingStage }/>
                    }
                    {
                        onboardingStage === 4 &&
                        <OnboardingInvite handleOnboardingStage={ handleOnboardingStage }/>
                    }
                </div>
            {/* <div className="bottom-container">
                <BtnSecondary action={ handleOnboardingStage } displayText={'Skip'} enabled={ true }/>
            </div> */}
            </div>
        </div>

    )
}