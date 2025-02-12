import { useCallback, useContext, useEffect, useState } from "react";
import MainCard from "../MainCard/MainCard";
import useSlots from "../../hooks/useSlots";
import { AppContext } from "../../context/AppContext";
import BtnSecondary from "../BtnSecondary/BtnSecondary";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import useCalendarAPI from "../../hooks/useCalendarAPI";

export default function SettingsCalendarContainer(){

    //STATE
    const [ fixedSlots, setFixedSlots ] = useState( null )
    const [ isLoading, setIsLoading ] = useState( true )
    const [ isCalendarConnected, setIsCalendarConnected ] = useState( false )
    const [ isBtnLoading, setIsBtnLoading ] = useState( false )

    //HOOKS
    const { getUserFixedSlots, convertArrayToString, deleteFixedSlot } = useSlots()
    const { connectCalendar, checkCalendarConnection } = useCalendarAPI()
    const { globalUser } = useContext( AppContext )

    //ROUTER
    const navigate = useNavigate()

    //FUNCTIONS
    const getFixedSlots = useCallback( async ( userId ) => {
        setIsLoading( true )
        const slots = await getUserFixedSlots( userId )
        setFixedSlots( slots.length > 0 ? slots : null )
        setIsLoading( false )
    }, [ getUserFixedSlots, setFixedSlots ])

    const checkCalendar = useCallback( async () => {
        const clientEmail = await checkCalendarConnection()
        setIsCalendarConnected( clientEmail )

    }, [ checkCalendarConnection ])

    const handleAddCalendar = async () => {
        try {
            setIsBtnLoading( true )
            connectCalendar( globalUser.id )

        } catch ( error ) {
            setIsBtnLoading( false )
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
        }
    }

    const handleDeleteCalendar = async () => {
        console.log('delete tokens from db');
    }

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
    }

    //EFFECTS
    useEffect(() => {
        if ( globalUser ){
            getFixedSlots( globalUser.id )
            checkCalendar()
        }
    }, [ getFixedSlots, globalUser, checkCalendar ])


    return(
        <>
        {
            isLoading ? 
            <Loader/>
            :
            <div className="section-container">
                {
                    globalUser?.master &&
                    <>
                        <p className="mt-1">Google Calendar Connections:</p>
                        {
                            !isCalendarConnected ?
                            <>
                                <p className="text-center mt-2" style={{ opacity:'0.7' }}>There are no calendars connected</p>
                                <BtnPrimary displayText={'Connect Calendar'} enabled={true } submit={ false } action={ handleAddCalendar } btnLoading={ isBtnLoading }/>
                            </>
                            
                            :
                            <>  
                                <p className="text-center mt-2" style={{ opacity:'0.7' }} >{`${ isCalendarConnected }'s calendar is connected`}</p>
                                <BtnSecondary displayText={'Disable Connection'} enabled={ true } submit={ false } action={ handleDeleteCalendar } customClass={'mt-1'}/>
                            </>
                        }
                    </>
                }
                {
                    !fixedSlots ?
                    <>
                        <p className="mt-2">Your Availability:</p>
                        <BtnPrimary displayText={'Add a date'} enabled={ true } action={ ()=> navigate('/settings/calendar/new') }/>
                    </>
                    :
                    <>
                        <p className="mt-2">Your Availability:</p>
                        {
                            fixedSlots?.map(( slot, idx ) => {
                                
                                const title = convertArrayToString( slot.days )
                                const description = `From ${ slot.startTime.hour }:${ slot.startTime.minute } ${ slot.startTime.ampm.toLowerCase() } to ${ slot.endTime.hour }:${ slot.endTime.minute } ${ slot.endTime.ampm.toLowerCase() }.`
                                return(
                                    <MainCard key={ idx } title={ title } descritpion={ description } erase={ true } action={ () => handleDeleteSlot( slot.id ) }/>
                                )
                            })
                            
                        }
                        <BtnSecondary displayText={'Add a date'} enabled={ true } action={ ()=> navigate('/settings/calendar/new') } customClass={'mt-2'}/>
                    </>
                }
            </div>
        }
        </>
    )
}