import axios from "axios"
import { useCallback, useContext } from "react"
import { AppContext } from "../context/AppContext"
import useLogs from "./useLogs"

function useMaps () {

    //CONTEXT
    const { authToken } = useContext( AppContext )

    //HOOKS
    const { postLog } = useLogs()

    //FUNCTIONS
    const getLocationImage = useCallback( async ( coordinates, placeId ) => {
        try{
            //GET LOCATION IMAGE URL FROM STREETVIEW STATIC API   
            const locationImageUrl = await axios.get(`${process.env.REACT_APP_API_URL}/maps/streetViewUrl`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                },
                params: {
                    lat: coordinates.lat,
                    lng: coordinates.lng,
                    placeId: placeId
                }
            })  

            return locationImageUrl.data

        } catch ( error ) {
            await postLog( 'useMaps', 'getLocationImage', error.message )
            throw error
        } 
    }, [ authToken, postLog ])

    return {
        getLocationImage,
    }
}

export default useMaps