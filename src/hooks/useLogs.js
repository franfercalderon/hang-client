import axios from "axios";
import { useCallback } from "react";

function useLogs ( ){

    const postLog = useCallback( async ( file, method, message ) => {

        const data = {
            file,
            method,
            message
        }
        
        try{
            //POST LOGS   
            await axios.post(`${process.env.REACT_APP_API_URL}/logs/new`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })  

            return 

        } catch ( error ) {
            throw error.response
        } 
    }, [ ])

    return({
        postLog
    })
}

export default useLogs