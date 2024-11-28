import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { storage, ref, uploadBytes, getDownloadURL } from "../fb"
import { v4 } from "uuid"

function useUsers () {
    //CONTEXT
    const { firebaseUserId, setFirebaseUserId, authToken } = useContext( AppContext )

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
                }
            })  
            setFirebaseUserId( userId.data )

        } catch ( error ) {
            throw error
        } 
    }

    const updateUserById = async ( data ) => {
        try {
            if( firebaseUserId ){
                console.log(data);
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
            const res = await uploadBytes( imageRef, imageUpload )
            console.log(res);
            const imageURL = await getDownloadURL( imageRef )
            const data = {
                profilePhoto: imageURL
            }
            await updateUserById( data )
            
        } catch ( error ) {
            throw error
        }
    }

    return {
        createUser,
        updateUserById,
        uploadProfilePhoto
    }

}

export default useUsers