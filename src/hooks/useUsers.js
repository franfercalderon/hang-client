import axios from "axios"
import { useCallback, useContext } from "react"
import { AppContext } from "../context/AppContext"
import { storage, ref, uploadBytes, getDownloadURL } from "../fb"
import { v4 } from "uuid"
import useLogs from "./useLogs"

function useUsers () {
    
    //CONTEXT
    const { firebaseUserId, setFirebaseUserId, authToken, pendingInvitation, masterToken, setMasterToken } = useContext( AppContext )

    //HOOKS
    const { postLog } = useLogs()

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
                    'InviteId': pendingInvitation ? pendingInvitation.userId : '',
                    'MasterToken': masterToken
                }
            })  
            setFirebaseUserId( userId.data )
            setMasterToken( '' )

        } catch ( error ) {
            await postLog( 'useUsers', 'createUser', error.message )

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
            await postLog( 'useUsers', 'updateUserById', error.message )

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
            await postLog( 'useUsers', 'uploadProfilePhoto', error.message )

            throw error
        }
    }  

    const createImageUrl = async ( imageFile ) => {
        try {
            const imageRef = ref( storage, `images/profilePictures/${ imageFile.name + v4() }`)
            await uploadBytes( imageRef, imageFile )
            const imageURL = await getDownloadURL( imageRef )
            if( imageURL ){
                return imageURL
            }
            
        } catch ( error ) {
            await postLog( 'useUsers', 'createImageUrl', error.message )

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
            await postLog( 'useUsers', 'getUser', error.message )

            throw error
        }
    }, [ postLog ])

    const updateUserProperties = async ( data ) => {

        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/users`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }` 
                }
            })   
            
        } catch ( error ) {
            await postLog( 'useUsers', 'updateUserProperties', error.message )

            throw error
        }
    }

    return {
        createUser,
        updateUserById,
        uploadProfilePhoto,
        getUser,
        updateUserProperties,
        createImageUrl
    }

}

export default useUsers