import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import Swal from "sweetalert2"
import useUsers from "../hooks/useUsers"
import OnboardingForm from "../components/OnboardingForm/OnboardingForm"
import OnboardingPhoto from "../components/OnboardingPhoto/OnboardingPhoto"
import OnboardingCalendar from "../components/OnboardingCalendar/OnboardingCalendar"
import OnboardingInvite from "../components/OnboardingInvite/OnboardingInvite"
import { useNavigate } from "react-router-dom"
import ViewContainer from "../components/ViewContainer/ViewContainer"
import OnboardingGoogleCalendar from "../components/OnboardingGoogleCalendar/OnboardingGoogleCalendar"

export default function Onboarding () {

    //STATE
    const [ userData, setUserData ] = useState({
        name: '',
        lastname: '',
        email: ''
    })
    const [ onboardingStage, setOnboardingStage ] = useState( 1 )
    const [ isLoading, setIsLoading ] = useState( false )
    
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
            setIsLoading( true )
            await updateUserById( userData )
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

    const handleOnboardingStage = async () => {
        if( onboardingStage < 5 ){
            setOnboardingStage( onboardingStage + 1 )
        } else {
            setOnboardingStage( 1 )
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
    
    //EFFECTS
    useEffect(() => {
        if( onboardingStage === 2 ){
            setPopulateUser( true )
        }
    }, [ onboardingStage, setPopulateUser ])

    useEffect(() => {
        const urlParams = new URLSearchParams( window.location.search )
        const calendarConnected = urlParams.get( 'calendarConnected' )
    
        if ( calendarConnected === 'true' ) {

            setOnboardingStage( 5 )
        }
    }, [])


    return(
        <ViewContainer className="onboarding">
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
                    <p>Connect Google Calendar</p>
                }
                {
                    onboardingStage === 5 &&
                    <p>Invite Friends</p>
                }
            </div>
            <div className="view-body">
                <div className="section-container full-height">
                    {
                        onboardingStage === 1 &&
                        <OnboardingForm updateUserInfo={ updateUserInfo } userData={ userData } handleChange={ handleChange } isLoading={ isLoading }/>
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
                        <OnboardingGoogleCalendar handleOnboardingStage={ handleOnboardingStage }/>
                    }
                    {
                        onboardingStage === 5 &&
                        <OnboardingInvite handleOnboardingStage={ handleOnboardingStage }/>
                    }
                </div>
            </div>
        </ViewContainer>

    )
}