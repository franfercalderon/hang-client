import { useCallback, useContext, useEffect, useState } from "react";
import ToggleBtn from "../ToggleBtn/ToggleBtn";
import { AppContext } from '../../context/AppContext'
import Loader from "../Loader/Loader";
import useNotifications from "../../hooks/useNotifications";
import Swal from "sweetalert2";

export default function SettingsNotificationsContainer(){ 

    //STATE
    const [ notificationSettings, setNotificationSettings ] = useState( null )
    const [ isLoading, setIsLoading ] = useState( true )

    //CONTEXT
    const { globalUser, getGlobalUser, authToken } = useContext( AppContext )

    //HOOKS
    const { updateNotificationChannels } = useNotifications()

    //FUNCTIONS
    const handleNotificationPreferences = useCallback( async ( updatedSettings ) => {
        console.log(updatedSettings);

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
                    <Loader/>
                :
                    <>
                        <p>Choose your notification channels:</p>
                        <div className="toggle-card cta-card rounded">
                            <p>Text</p>
                            <ToggleBtn active={ notificationSettings.text } toggleBtn={ () => handleNotificationPreferences( { ...notificationSettings, text: !notificationSettings.text } ) }/>
                            {/* <ToggleBtn active={ notificationSettings.text } toggleBtn={ () => console.log( 'ke' ) }/> */}

                        </div>
                        <div className="toggle-card cta-card rounded">
                            <p>Email</p>
                            <ToggleBtn active={ notificationSettings.email } toggleBtn={ () => handleNotificationPreferences({ ...notificationSettings, email: !notificationSettings.email }) }/>
                        </div>
                    </>
            }
        </div>
    )
}