import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import Swal from "sweetalert2"
import useUsers from "../hooks/useUsers"

export default function Onboarding () {

    //STATE
    const [ userData, setUserData ] = useState( {
        name: 'Peter',
        lastname: 'Kollergan',
        email: 'peter@KOLLErgan.com'
    } )

    //CONTEXT
    const { authUser } = useContext( AppContext )

    //HOOKS
    const { createUser } = useUsers()

    //FUNCTIONS
    const handleNewUser = async ( data ) => {
        try {
            const user = {
                ...data,
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

    //EFFECTS
    // useEffect(() => {
    //     if( authUser ){
    //         console.log( authUser );
    //     }
    // }, [ authUser ])

    return(
        <>
            <p>INBOARDINGS</p>
            <button onClick={() => handleNewUser( userData )}>
                CREATE
            </button>
        </>

    )
}