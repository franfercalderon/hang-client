import { useContext } from "react";
import { AppContext } from '../../context/AppContext'

export default function Feed () {

    //CONTEXT
    const { authToken } = useContext( AppContext )
    console.log(authToken);
    return(
        <p>FEED LOCO</p>
    )
}