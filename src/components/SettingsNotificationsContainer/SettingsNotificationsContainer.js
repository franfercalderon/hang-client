import { useCallback, useContext, useEffect, useState } from "react";
import ToggleBtn from "../ToggleBtn/ToggleBtn";
import { AppContext } from '../../context/AppContext'
import Loader from "../Loader/Loader";
import useNotifications from "../../hooks/useNotifications";
import Swal from "sweetalert2";
import BtnPrimary from '../BtnPrimary/BtnPrimary'
import usePushNotifications from "../../hooks/usePushNotifications";

export default function SettingsNotificationsContainer(){ 

    //STATE
    const [ notificationSettings, setNotificationSettings ] = useState( null )
    const [ isLoading, setIsLoading ] = useState( true )
    const [ testButtonLoading, settestButtonLoading ] = useState( false )

    //CONTEXT
    const { globalUser, getGlobalUser, authToken } = useContext( AppContext )

    //HOOKS
    const { updateNotificationChannels } = useNotifications()
    const { testPushNotification } = usePushNotifications()

    //FUNCTIONS
    const handleNotificationPreferences = useCallback( async ( updatedSettings ) => {

        try {
            setIsLoading( true )
            await updateNotificationChannels( updatedSettings )
    
            //UPDATE GLOBAL USER
            await getGlobalUser( authToken )

            setIsLoading( false )
            
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
        
    }, [ authToken, getGlobalUser, updateNotificationChannels ] )

    const handleTestNotifications = async () => {

        try {
            settestButtonLoading( true )
            await testPushNotification()
            settestButtonLoading( false )
            Swal.fire({
                text: 'Sent!',
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

            
        } catch (error) {
            settestButtonLoading( false )
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

    //HOOKS
    useEffect(() => {
        if( globalUser ){

            setNotificationSettings( globalUser.notifications )
            setIsLoading( false )
        }
    }, [ globalUser ])


    return(
        <div className="section-container mt-2">
            {   
                isLoading ? 

                <div className="mt-4">
                    <Loader/>
                </div>

                :
                    <>
                        <p>Choose your notification channels:</p>
                        <div className="toggle-card cta-card rounded">
                            <p>Text</p>
                            <ToggleBtn active={ notificationSettings.text } toggleBtn={ () => handleNotificationPreferences( { ...notificationSettings, text: !notificationSettings.text } ) }/>
                        </div>
                        <div className="toggle-card cta-card rounded">
                            <p>Email</p>
                            <ToggleBtn active={ notificationSettings.email } toggleBtn={ () => handleNotificationPreferences({ ...notificationSettings, email: !notificationSettings.email }) }/>
                        </div>
                        {
                            globalUser?.master &&
                            <div className="mt-3">
                                <BtnPrimary action={ handleTestNotifications } displayText={'Test Push Notifications'} loadingText={'Sending...'} btnLoading={ testButtonLoading } enabled={ true } submit={ false }/>
                            </div>
                        }
                    </>
            }
        </div>
    )
}