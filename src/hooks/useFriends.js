import { useCallback, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import useLogs from "./useLogs";

function useFriends(){

    //CONTEXT
    const { authToken, globalUser } = useContext( AppContext )

    //HOOKS
    const { postLog } = useLogs()

    //FUNCTIONS
    const getUserFriends = useCallback( async ( ) => {
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
            await postLog( 'useFriends', 'getUserFriends', error.message )
            throw error
        } 
    }, [ authToken, postLog ])

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
            await postLog( 'useFriends', 'getFriendSuggestions', error.message )
            throw error
        } 
    }, [ authToken, postLog ])

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
            await postLog( 'useFriends', 'postFriendshipRequest', error.message )
            throw error.response.data
        } 
    }, [ authToken, postLog ])

    const getUserFriendShipsRequests = useCallback( async ( token ) => {
        
        try{
            //GETS FIXED SLOTS   
            const friendShipRequests = await axios.get(`${process.env.REACT_APP_API_URL}/friends/requests`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token ? token : authToken }`
                }
            })  

            return friendShipRequests.data

        } catch ( error ) {
            await postLog( 'useFriends', 'getUserFriendShipsRequests', error.message )

            throw error
        } 
    }, [ authToken, postLog ] )

    const replyFriendsRequest = async ( requestId, requesterId, accepted ) => {

        const data = {
            requestId,
            requesterId,
            accepted,
            invitedFriendsLength: globalUser.friends.length,
        }

        try{ 
            await axios.patch(`${process.env.REACT_APP_API_URL}/friends/friendshipRequest`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  

        } catch ( error ) {
            await postLog( 'useFriends', 'replyFriendsRequest', error.message )
            throw error
        } 
        
    }

    const deleteFriend = async ( friendId ) => {
        try{ 
            await axios.delete(`${process.env.REACT_APP_API_URL}/friends/${ friendId }`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  

        } catch ( error ) {
            await postLog( 'useFriends', 'deleteFriend', error.message )
            throw error
        } 
    }

    const acceptInvitation = async ( friendId ) => {
        try{ 
            await axios.post(`${process.env.REACT_APP_API_URL}/users/acceptInvite/${ friendId }`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  

        } catch ( error ) {
            await postLog( 'useFriends', 'acceptInvitation', error.message )
            throw error
        } 
    }

    return({
        getUserFriends,
        getFriendSuggestions,
        postFriendshipRequest,
        getUserFriendShipsRequests,
        replyFriendsRequest,
        deleteFriend,
        acceptInvitation
    })
}

export default useFriends