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

    const getFriendSuggestions = useCallback( async ( ) => {
        try{
            //GETS FIXED SLOTS   
            const userFriends = await axios.get(`${process.env.REACT_APP_API_URL}/friends/explore`, {
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

    const postFriendshipRequest = useCallback( async ( request ) => {

        try{
            //GETS FIXED SLOTS   
            await axios.post(`${process.env.REACT_APP_API_URL}/friends/friendshipRequest`, request, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  

            return 

        } catch ( error ) {
            throw error
        } 
    }, [ authToken ])

    return({
        getUserFriends,
        getFriendSuggestions,
        postFriendshipRequest
    })
}

export default useFriends