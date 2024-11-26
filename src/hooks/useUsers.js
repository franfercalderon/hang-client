import axios from "axios"


function useUsers () {
    const createUser = async ( data ) => {
        try{
            const user = {
                createdAt: data.user.metadata.createdAt,
                phoneNumber: data.user.phoneNumber,
            }

            //CREATES USER IN DB   
            await axios.post(`${process.env.REACT_APP_API_URL}/users/`, user, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })   

        } catch ( error ) {
            throw error
        } 
    }

    const getUser = async ( userId, authToken ) => {
        try {
            
        } catch ( error ) {
            
        }
    }

    return {
        createUser,
        getUser,

    }

}

export default useUsers