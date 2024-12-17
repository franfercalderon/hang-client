import React, { createContext, useState, useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";
import useSlots from "../hooks/useSlots";

export const SlotsContext = createContext();

export const SlotsProvider = ({ children }) => {

    //STATE
    const [ availableNowSlots, setAvailableNowSlots ] = useState( [] )
    const [ scheduledSlots, setScheduledSlots] = useState( [] )

    //CONTEXT
    const { authToken } = useContext( AppContext )

    //HOOKS
    const { getAvailableNowSlots, getScheduledSlots } = useSlots()

    //FUNCTIONS
    const getFriendsActivity = useCallback( async () => {
        try {
            const nowSlots = await getAvailableNowSlots()
            setAvailableNowSlots( nowSlots )
            const laterSlots = await getScheduledSlots()
            setScheduledSlots( laterSlots )
        } catch ( error ) {
            console.log( error )
        } 
    }, [ getScheduledSlots, getAvailableNowSlots ] )

    // const getAvailableNowSlots = useCallback(async () => {
    //     try {
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/slots/now`, {
    //         headers: { Authorization: `Bearer ${authToken}` },
    //         });
    //         setAvailableNowSlots(res.data);
    //         return res.data;
    //     } catch (error) {
    //         console.error("Error fetching available now slots:", error);
    //     }
    // }, [authToken]);

    // // Fetch Scheduled Slots
    // const getScheduledSlots = useCallback(async () => {
    // try {
    //     const res = await axios.get(`${process.env.REACT_APP_API_URL}/slots/scheduled`, {
    //     headers: { Authorization: `Bearer ${authToken}` },
    //     });
    //     setScheduledSlots(res.data);
    //     return res.data;
    // } catch (error) {
    //     console.error("Error fetching scheduled slots:", error);
    // }
    // }, [authToken]);

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