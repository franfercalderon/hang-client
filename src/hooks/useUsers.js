import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"

function useUsers () {
    //CONTEXT
    const { firebaseUserId, setFirebaseUserId, authToken } = useContext( AppContext )

    //FUNCTIONS
    const createUser = async ( data ) => {
        try{
            const user = {
                createdAt: data.user.metadata.createdAt,
                phoneNumber: data.user.phoneNumber,
            }

            //CREATES USER IN DB   
            const userId = await axios.post(`${process.env.REACT_APP_API_URL}/users/`, user, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })  
            setFirebaseUserId( userId.data )

        } catch ( error ) {
            throw error
        } 
    }

    const updateUserById = async ( data ) => {
        console.log(data);
        console.log(firebaseUserId);
        try {
            if( firebaseUserId ){
                await axios.patch(`${process.env.REACT_APP_API_URL}/users/${ firebaseUserId }`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${ authToken }`
                    }
                })  
            }
            
        } catch ( error ) {
            throw error
        }
    }

    return {
        createUser,
        updateUserById,

    }

}

export default useUsers