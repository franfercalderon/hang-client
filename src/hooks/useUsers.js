import axios from "axios"
import { useCallback, useContext } from "react"
import { AppContext } from "../context/AppContext"
import { storage, ref, uploadBytes, getDownloadURL } from "../fb"
import { v4 } from "uuid"

function useUsers () {
    //CONTEXT
    const { firebaseUserId, setFirebaseUserId, authToken, inviterId, masterToken, setMasterToken } = useContext( AppContext )

    //FUNCTIONS
    const createUser = async ( data ) => {
        try{
            const user = {
                id: data.user.uid,
                createdAt: data.user.metadata.createdAt,
                phoneNumber: data.user.phoneNumber,
            }

            //CREATES USER IN DB   
            const userId = await axios.post(`${process.env.REACT_APP_API_URL}/users/`, user, {
                headers: {
                    'Content-Type': 'application/json',
                    'InviteId': inviterId,
                    'MasterToken': masterToken
                }
            })  
            setFirebaseUserId( userId.data )
            setMasterToken( '' )

        } catch ( error ) {
            throw error
        } 
    }

    const updateUserById = async ( data ) => {
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

    const uploadProfilePhoto = async ( imageUpload ) => {
        try {
            const imageRef = ref( storage, `images/profilePictures/${ imageUpload.name + v4() }`)
            await uploadBytes( imageRef, imageUpload )
            const imageURL = await getDownloadURL( imageRef )
            const data = {
                profilePhoto: imageURL
            }
            await updateUserById( data )
            
        } catch ( error ) {
            throw error
        }
    }  

    const getUser = useCallback( async ( authToken ) => {
        try {
            const user = await axios.get(`${process.env.REACT_APP_API_URL}/users/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            return user.data 
            
        } catch ( error ) {
            throw error
        }
    }, [])

    const updateUserFriends = async ( friends ) => {

        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/users/friends/:id`, friends, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })   
            
        } catch ( error ) {
            throw error
        }
    }

    return {
        createUser,
        updateUserById,
        uploadProfilePhoto,
        getUser,
        updateUserFriends
    }

}

export default useUsers