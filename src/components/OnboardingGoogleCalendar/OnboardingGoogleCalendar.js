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


    return(
        <>
            {
                !globalUser ?
                <Loader/>
                :
                <>
                    <p className="mb-2 fw-500">Connect Your Google Calendar</p>
                    <div className="invite-img-containter" >
                        <img src="./images/calendarIcon.svg" alt="invite"/>
                    </div>
                    <div className="relative centered onboarding-invite-btn-primary-container mt-4">
                        {
                            !isCalendarConnected ?
                            <>
                                <BtnPrimary action={ handleAddCalendar } btnLoading={ isBtnLoading } loadingText={'Connecting...'} displayText={'Add Calendar'} enabled={ true } submit={ false }/>
                                <div className="centered">
                                    <p className="w-9 text-center fs-0 op-09">Hang works better when connected to your Google Calendar. Link your calendar for seamless scheduling.</p>

                                </div>
                            </>
                            
                            :
                            <>  
                                <BtnSecondary displayText={'Disable Connection'} enabled={ true } submit={ false } action={ handleDeleteCalendar } customClass={'mt-1'} btnLoading={ isDeleteBtnLoading } loadingText={'Disconnecting...'}/>
                                <div className="centered">
                                    <p className=" text-center fs-0 op-09">{`Your calendar is connected`}</p>
                                </div>
                            </>
                        }
                    </div>
                    <div className="bottom-container mt-4">
                        <BtnSecondary action={ handleOnboardingStage } displayText={'Skip'} enabled={ true } submit={ false }/>
                        <div className="centered">
                            <p className="mt text-center fs-09 op-08 w-9">{`You can always adjust your availability later in Settings → My Calendar`}</p>

                        </div>
                    </div>
                </>
            }
        </>

    )
}