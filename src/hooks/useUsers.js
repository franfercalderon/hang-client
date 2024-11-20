import axios from "axios"


function useUsers () {
    const createUser = async ( userData ) => {
        try{
            //CREATES USER OBJECT WITH FORM INFORMATION
            const user = {
                // id: userId,
                name: userData.name,
                lastname: userData.lastname,
                email: userData.email.toLowerCase(),
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