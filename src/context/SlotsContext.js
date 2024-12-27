import React, { createContext, useState, useCallback, useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import useSlots from "../hooks/useSlots";

export const SlotsContext = createContext();

export const SlotsProvider = ({ children }) => {

    //STATE
    const [ availableNowSlots, setAvailableNowSlots ] = useState( null )
    const [ scheduledSlots, setScheduledSlots] = useState( null )
    const [ recurringMatches, setRecurringMatches ] = useState( null ) 
    const [ userInvites, setUserInvites ] = useState( null ) 
 

    //CONTEXT
    const { authToken, globalUser } = useContext( AppContext )

    //HOOKS
    const { getAvailableNowSlots, getScheduledSlots, getRecurringMatches, getEventInvites } = useSlots()

    //FUNCTIONS
    const getFriendsActivity = useCallback( async () => {

        try {
            const invites = await getEventInvites()
            invites.sort(( a, b ) => a.event.starts - b.event.starts ) 
            setUserInvites( invites )

            const nowSlots = await getAvailableNowSlots()
            nowSlots.sort(( a, b ) => a.starts - b.starts )
            setAvailableNowSlots( nowSlots )

            const laterSlots = await getScheduledSlots()
            laterSlots.sort(( a, b ) => a.starts - b.starts )
            setScheduledSlots( laterSlots )

            const matches = await getRecurringMatches()
            if( matches.length > 0 ){
                const myId = globalUser.id
                const updatedArray = matches.map(( item ) => {
                    const otherUser = item.user1.userId === myId ? item.user2 : item.user1
                    return {
                        activity: item.activity,
                        matchingUser: {
                            userId: otherUser.userId,
                            name: otherUser.name,
                            lastname: otherUser.lastname,
                            imgUrl: otherUser.imgUrl
                        } 
                    }
                })
                setRecurringMatches( updatedArray )

            } else {

                setRecurringMatches( [] )
            }

        } catch ( error ) {
            console.log( error )
        } 
    }, [ getScheduledSlots, getAvailableNowSlots, getRecurringMatches, globalUser, getEventInvites ] )

    const updateInvites = useCallback( async () => {
        const invites = await getEventInvites()
        invites.sort(( a, b ) => a.event.starts - b.event.starts ) 
        setUserInvites( invites )

    }, [ getEventInvites ])

    const resetSlotContextState = useCallback(() => {
        setAvailableNowSlots( null )
        setScheduledSlots( null )
        setRecurringMatches( null )
    }, [])

    //EFFECTS
    useEffect(() => {
    if ( globalUser ) {
        resetSlotContextState()
        getFriendsActivity()
    }
    }, [ globalUser, getFriendsActivity, resetSlotContextState ])


    return (
    <SlotsContext.Provider
        value={{ availableNowSlots, scheduledSlots, recurringMatches, userInvites, updateInvites }}
    >
        { children }
    </SlotsContext.Provider>
    )
};