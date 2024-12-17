import React, { createContext, useState, useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";
import useSlots from "../hooks/useSlots";

export const SlotsContext = createContext();

export const SlotsProvider = ({ children }) => {

    //STATE
    const [ availableNowSlots, setAvailableNowSlots ] = useState( null )
    const [ scheduledSlots, setScheduledSlots] = useState( null )

    //CONTEXT
    const { authToken } = useContext( AppContext )

    //HOOKS
    const { getAvailableNowSlots, getScheduledSlots } = useSlots()

    //FUNCTIONS
    const getFriendsActivity = useCallback( async () => {
        try {
            const nowSlots = await getAvailableNowSlots()
            nowSlots.sort(( a, b ) => a.starts - b.starts )
            setAvailableNowSlots( nowSlots )

            const laterSlots = await getScheduledSlots()
            console.log(laterSlots);
            laterSlots.sort(( a, b ) => a.starts - b.starts )
            console.log(laterSlots)
            setScheduledSlots( laterSlots )
        } catch ( error ) {
            console.log( error )
        } 
    }, [ getScheduledSlots, getAvailableNowSlots ] )

    //EFFECTS
    useEffect(() => {
    if ( authToken ) {
        getFriendsActivity()
    }
    }, [ authToken, getFriendsActivity ])

    return (
    <SlotsContext.Provider
        value={{ availableNowSlots, scheduledSlots }}
    >
        { children }
    </SlotsContext.Provider>
    )
};