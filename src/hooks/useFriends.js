import { useCallback, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

function useFriends(){

    //CONTEXT
    const { authToken } = useContext( AppContext )

    //FUNCTIONS
    const getUserFriends = useCallback( async ( userId ) => {
        try{
            //GETS FIXED SLOTS   
            const userFriends = await axios.get(`${process.env.REACT_APP_API_URL}/friends/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  

            return userFriends.data

        } catch ( error ) {
            throw error
        } 
    }, [ authToken ])

    return({
        getUserFriends
    })
}

export default useFriends