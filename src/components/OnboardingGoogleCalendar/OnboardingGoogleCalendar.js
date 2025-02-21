import { useCallback, useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import BtnPrimary from "../BtnPrimary/BtnPrimary"
import BtnSecondary from "../BtnSecondary/BtnSecondary"
import Loader from "../Loader/Loader"
import useCalendarAPI from "../../hooks/useCalendarAPI"
import Swal from "sweetalert2"

export default function OnboardingGoogleCalendar({ handleOnboardingStage }){

    //STATE
    const [ isBtnLoading, setIsBtnLoading ] = useState( false )
    const [ isCalendarConnected, setIsCalendarConnected ] = useState( false )
    const [ isDeleteBtnLoading, setIsDeleteBtnLoading ] = useState( false )

    //CONTEXT
    const { globalUser, authToken } = useContext( AppContext )

    //HOOKS
    const { connectCalendar, checkCalendarConnection, deleteCalendarConnection } = useCalendarAPI()

    //FUNCTIONS
    const handleAddCalendar = useCallback(async () => {
        try {

            setIsBtnLoading( true )
            connectCalendar('onboarding')

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
    }, [ connectCalendar ] )

    const checkCalendar = useCallback( async ( authToken ) => {
        try {
            const clientEmail = await checkCalendarConnection( authToken )
            setIsCalendarConnected( clientEmail || false )
            
        } catch ( error ) {
            console.error( "Error checking calendar connection:", error )
            setIsCalendarConnected( false )
        }

    }, [ checkCalendarConnection ])

    const handleDeleteCalendar = async () => {
        try {

            setIsDeleteBtnLoading( true )
            await deleteCalendarConnection()
            await checkCalendar( authToken )
            setIsDeleteBtnLoading( false )
            Swal.fire({
                text: 'Calendar disconnected.',
                icon: 'success',
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

        } catch ( error ) {
            setIsDeleteBtnLoading( false )
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

    const showAddedCalendarSwal = () => {
        Swal.fire({
            text: 'Calendar added!',
            icon: 'success',
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
        });
    }

    // useEffect(() => {
    //     const urlParams = new URLSearchParams( window.location.search )
    //     const calendarConnected = urlParams.get( 'calendarConnected' )
    
    //     if ( calendarConnected === 'true' ) {
    //         hand
    //         window.history.replaceState( {}, document.title, window.location.pathname )
    //     }
    // }, [])


    return(
        <>
            {
                !globalUser ?
                <Loader/>
                :
                <>
                    <div className="invite-img-containter" >
                        <img src="./images/calendarIcon.svg" alt="invite"/>
                    </div>
                    <div className="relative centered onboarding-invite-btn-primary-container mt-4">
                        {
                            !isCalendarConnected ?
                            <>
                                <BtnPrimary action={ handleAddCalendar } btnLoading={ isBtnLoading } loadingText={'Connecting...'} displayText={'Connect Calendar'} enabled={ true } submit={ false }/>
                                <p>Hang works better when connected to your Google Calendar. Link your calendar for seamless scheduling.</p>
                            </>
                            
                            :
                            <>  
                                <p className="text-center mt-2" style={{ opacity:'0.7' }} >{`Your calendar is connected`}</p>
                                <BtnSecondary displayText={'Disable Connection'} enabled={ true } submit={ false } action={ handleDeleteCalendar } customClass={'mt-1'} btnLoading={ isDeleteBtnLoading } loadingText={'Disconnecting...'}/>
                            </>
                        }
                    </div>
                    <div className="bottom-container mt-4">
                        <BtnSecondary action={ handleOnboardingStage } displayText={'Skip'} enabled={ true } submit={ false }/>
                        <p className="mt">{`Don't worry, you can do manage your Calendar later in Settings > My Calendar`}</p>
                    </div>
                </>
            }
        </>

    )
}