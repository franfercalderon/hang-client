import axios from "axios"
import { useCallback, useContext } from "react"
import { AppContext } from "../context/AppContext"

function useMaps () {

    //CONTEXT
    const { authToken } = useContext( AppContext )

    //FUNCTIONS
    const getLocationImage = useCallback( async ( coordinates ) => {
        try{
            //GET LOCATION IMAGE URL FROM STREETVIEW STATIC API   
            const locationImageUrl = await axios.get(`${process.env.REACT_APP_API_URL}/maps/streetViewUrl`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                },
                params: {
                    lat: coordinates.lat,
                    lng: coordinates.lng
                }
            })  

            return locationImageUrl.data

        } catch ( error ) {
            throw error
        } 
    }, [ authToken ])

    return {
        getLocationImage,
    }
}

export default useMaps