import { useCallback, useContext, useEffect, useState } from "react";
import FeedCard from "../FeedCard/FeedCard";
import useSlots from "../../hooks/useSlots";
import { AppContext } from "../../context/AppContext";
import BtnSecondary from "../BtnSecondary/BtnSecondary";
import BtnPrimary from "../BtnPrimary/BtnPrimary";

export default function SettingsCalendarContainer(){

    //STATE
    const [ fixedSlots, setFixedSlots ] = useState( null )

    //HOOKS
    const { getUserFixedSlots, convertArrayToString } = useSlots()
    const { globalUser } = useContext( AppContext )

    //FUNCTIONS
    const getFixedSlots = useCallback( async ( userId ) => {
        console.log('jasjas');
        const slots = await getUserFixedSlots( userId )
        setFixedSlots( slots.length > 0 ? slots : null )
    }, [ getUserFixedSlots, setFixedSlots ])


    //EFFECTS
    useEffect(() => {
        if ( globalUser ){
            getFixedSlots( globalUser.id )
        }
    }, [ getFixedSlots, globalUser ])

    useEffect(() => {
        if (fixedSlots){
            console.log(fixedSlots);
        }
    }, [ fixedSlots])


    return(
        <div className="section-container">
            {
                fixedSlots ?
                <BtnSecondary displayText={'Add a date'} enabled={ true }/>
                :
                <BtnPrimary displayText={'Add a date'} enabled={ true }/>
            }
            {/* {
                fixedSlots?.map(( slot, idx ) => {
                    const title = slot.days
                    return(
                        <FeedCard key={ idx } />
                    )
                })
            } */}
        </div>
    )
}