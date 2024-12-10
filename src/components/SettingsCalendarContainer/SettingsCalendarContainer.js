import { useCallback, useContext, useEffect, useState } from "react";
import FeedCard from "../FeedCard/FeedCard";
import useSlots from "../../hooks/useSlots";
import { AppContext } from "../../context/AppContext";
import BtnSecondary from "../BtnSecondary/BtnSecondary";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";

export default function SettingsCalendarContainer(){

    //STATE
    const [ fixedSlots, setFixedSlots ] = useState( null )
    const [ isLoading, setIsLoading ] = useState( true )

    //HOOKS
    const { getUserFixedSlots, convertArrayToString, deleteFixedSlot } = useSlots()
    const { globalUser } = useContext( AppContext )

    //ROUTER
    const navigate = useNavigate()

    //FUNCTIONS
    const getFixedSlots = useCallback( async ( userId ) => {
        setIsLoading( true )
        const slots = await getUserFixedSlots( userId )
        console.log(slots);
        setFixedSlots( slots.length > 0 ? slots : null )
        setIsLoading( false )
    }, [ getUserFixedSlots, setFixedSlots ])

    const handleDeleteSlot = async ( slotId ) => {

        Swal
            .fire({
                title: null,
                text: 'Are you sure you want to delete this date?',
                icon: 'warning',
                confirmButtonText: 'Ok',
                buttonsStyling: false,
                customClass: {
                    popup: 'hang-alert-container round-div div-shadow',
                    icon: 'alert-icon',
                    confirmButton: 'confirm-btn btn order2',
                    denyButton: 'deny-btn btn order1',
                }
            })
            .then( ( res ) => {
                if( res.isConfirmed ){
                    return deleteFixedSlot( slotId )
                }
            })
            .then(() => {
                getFixedSlots( globalUser.id )
            })
            .catch(( error ) => {
                Swal.fire({
                    title: 'Oops!',
                    text: error.message,
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                    buttonsStyling: false,
                    customClass: {
                        popup: 'hang-alert-container round-div div-shadow',
                        icon: 'alert-icon',
                        confirmButton: 'confirm-btn btn order2',
                        denyButton: 'deny-btn btn order1',
                    }
                })
            })
        // try {
        //     Swal
        //         .fire({
        //         title: null,
        //         text: 'Are you sure you want to delete this date?',
        //         icon: 'warning',
        //         confirmButtonText: 'Ok',
        //         buttonsStyling: false,
        //         customClass: {
        //             popup: 'hang-alert-container round-div div-shadow',
        //             icon: 'alert-icon',
        //             confirmButton: 'confirm-btn btn order2',
        //             denyButton: 'deny-btn btn order1',
        //         }
        //     })
        //         .then( ( res ) => {
        //             if( res.isConfirmed ){
        //                 return deleteFixedSlot( slotId )
        //             }
        //         })
        //         .then(() => {
        //             getFixedSlots( globalUser.id )
        //         })
        //         .catch(( error ) => {
        //             Swal.fire({
        //                 title: 'Oops!',
        //                 text: error.message,
        //                 icon: 'warning',
        //                 confirmButtonText: 'Ok',
        //                 buttonsStyling: false,
        //                 customClass: {
        //                     popup: 'hang-alert-container round-div div-shadow',
        //                     icon: 'alert-icon',
        //                     confirmButton: 'confirm-btn btn order2',
        //                     denyButton: 'deny-btn btn order1',
        //                 }
        //             })
        //         })

        // } catch ( error ) {
        //     Swal.fire({
        //         title: 'Oops!',
        //         text: error.message,
        //         icon: 'warning',
        //         confirmButtonText: 'Ok',
        //         buttonsStyling: false,
        //         customClass: {
        //             popup: 'hang-alert-container round-div div-shadow',
        //             icon: 'alert-icon',
        //             confirmButton: 'confirm-btn btn order2',
        //             denyButton: 'deny-btn btn order1',
        //         }
        //     })
            
        // }
    }

    //EFFECTS
    useEffect(() => {
        if ( globalUser ){
            getFixedSlots( globalUser.id )
        }
    }, [ getFixedSlots, globalUser ])


    return(
        <>
        {
            isLoading ? 
            <Loader/>
            :
            <div className="section-container">
                {
                    !fixedSlots ?
                    <BtnPrimary displayText={'Add a date'} enabled={ true } action={ ()=> navigate('/settings/calendar/new') }/>
                    :
                    <>
                        <BtnSecondary displayText={'Add a date'} enabled={ true } action={ ()=> navigate('/settings/calendar/new') }/>
                        <p className="mt-2">Your Availability:</p>
                        {
                        fixedSlots?.map(( slot, idx ) => {

                            const title = convertArrayToString( slot.days )
                            const description = `From ${ slot.startTime.hour }:${ slot.startTime.minute } ${ slot.startTime.ampm.toLowerCase() } to ${ slot.endTime.hour }:${ slot.endTime.minute } ${ slot.endTime.ampm.toLowerCase() }.`
                            return(
                                <FeedCard key={ idx } title={ title } descritpion={ description } erase={ true } action={ () => handleDeleteSlot( slot.id ) }/>
                            )
                        })

                        }
                    </>
                }
            </div>
        }
        </>
    )
}