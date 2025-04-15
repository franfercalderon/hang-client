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
    const [ isDeleteBtnLoading, setIsDeleteBtnLoading ] = useState( false )


    //HOOKS
    const { getUserFixedSlots, convertArrayToString, deleteFixedSlot } = useSlots()
    const { connectCalendar, checkCalendarConnection, deleteCalendarConnection } = useCalendarAPI()
    const { globalUser, authToken } = useContext( AppContext )

    //ROUTER
    const navigate = useNavigate()

    //FUNCTIONS
    const getFixedSlots = useCallback( async ( userId ) => {
        setIsLoading( true )
        const slots = await getUserFixedSlots( userId )
        setFixedSlots( slots.length > 0 ? slots : null )
        setIsLoading( false )
    }, [ getUserFixedSlots, setFixedSlots ])

    const checkCalendar = useCallback( async ( authToken ) => {
        try {
            const clientEmail = await checkCalendarConnection( authToken )
            setIsCalendarConnected( clientEmail || false )
            
        } catch ( error ) {
            console.error( "Error checking calendar connection:", error )
            setIsCalendarConnected( false )
        }

    }, [ checkCalendarConnection ])

    const handleAddCalendar = useCallback(async () => {
        try {

            setIsBtnLoading( true )
            connectCalendar('settings')

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
    }, [ connectCalendar ] )

    const handleDeleteCalendar = async () => {
        try {

            setIsDeleteBtnLoading( true )
            await deleteCalendarConnection()
            await checkCalendar( authToken )
            setIsDeleteBtnLoading( false )
            Swal.fire({
                text: 'Calendar disconnected.',
                icon: 'success',
                confirmButtonText: 'Ok',
                timer: 1300,
                buttonsStyling: false,
                showConfirmButton: false,
                showCancelButton: false,
                customClass: {
                    popup: 'hang-alert-container round-div div-shadow',
                    icon: 'alert-icon',
                    confirmButton: 'confirm-btn btn order2',
                    denyButton: 'deny-btn btn order1',
                }
            })

        } catch ( error ) {
            setIsDeleteBtnLoading( false )
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

    const showAddedCalendarSwal = () => {
        Swal.fire({
            text: 'Calendar added!',
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 1300,
            buttonsStyling: false,
            showConfirmButton: false,
            showCancelButton: false,
            customClass: {
                popup: 'hang-alert-container round-div div-shadow',
                icon: 'alert-icon',
                confirmButton: 'confirm-btn btn order2',
                denyButton: 'deny-btn btn order1',
            }
        });
    }

    //EFFECTS
    useEffect(() => {
        if ( globalUser && authToken ){
            getFixedSlots( globalUser.id )
        }
    }, [ getFixedSlots, globalUser, authToken ])

    useEffect(() => {
        if ( globalUser && authToken ){
            checkCalendar( authToken )
        }
    }, [ globalUser, checkCalendar, authToken ])

    useEffect(() => {
        const urlParams = new URLSearchParams( window.location.search )
        const calendarConnected = urlParams.get( 'calendarConnected' )
    
        if ( calendarConnected === 'true' ) {

            showAddedCalendarSwal()
            window.history.replaceState( {}, document.title, window.location.pathname )
        }
    }, [])
    


    return(
        <>
        {
            isLoading ? 
            <Loader/>
            :
            <div className="section-container">
                {/* <p className="mt-1 mb-1">Hang combines your availability setup and your actual Calendar for seamless scheduling.</p>
                <p className="mb-2">Google Calendar Connections:</p> */}

                <p className="mb-1 mt-2 fw-500">Google Calendar Connections</p>
                <p className="mb-2 op-08">Hang combines your availability setup and your actual Calendar for seamless scheduling:</p>
                {
                    !isCalendarConnected ?
                    <>
                        {/* <p className="text-center " style={{ opacity:'0.7' }}>There are no calendars connected</p> */}
                        <div className="mt-3">
                            <BtnPrimary displayText={'Connect Calendar'} enabled={true } submit={ false } action={ handleAddCalendar } btnLoading={ isBtnLoading } loadingText={'Connecting...'}/>
                        </div>
                    </>
                    
                    :
                    <>  
                        <div className="mt-3">
                            <BtnSecondary displayText={'Disable Connection'} enabled={ true } submit={ false } action={ handleDeleteCalendar } customClass={'mt-1'} btnLoading={ isDeleteBtnLoading } loadingText={'Disconnecting...'}/>
                        </div>
                        <p className="text-center fs-0 op-09" style={{ opacity:'0.7' }} >{`Your calendar is connected`}</p>
                    </>
                }
                {
                    !fixedSlots ?
                    <>
                        <p className=" mb-1 mt-2 fw-500">Your Availability:</p>
                        <div className="mt-3">
                            <BtnPrimary displayText={'Add a date'} enabled={ true } action={ ()=> navigate('/settings/calendar/new') }/>
                        </div>
                        <p className="text-center" style={{ opacity:'0.7' }}>You have not added dates yet</p>
                    </>
                    :
                    <>
                        <p className="mt-2">Your Availability:</p>
                        {
                            fixedSlots?.map(( slot, idx ) => {
                                
                                const title = convertArrayToString( slot.days )
                                const description = `From ${ slot.startTime.hour }:${ slot.startTime.minute.toString().padStart(2, "0" ) } ${ slot.startTime.ampm.toLowerCase() } to ${ slot.endTime.hour }:${ slot.endTime.minute.toString().padStart(2, "0" ) } ${ slot.endTime.ampm.toLowerCase() }.`
                                return(
                                    <MainCard key={ idx } title={ title } descritpion={ description } erase={ true } action={ () => handleDeleteSlot( slot.id ) }/>
                                )
                            })
                            
                        }
                        <div className="mt-3">
                            <BtnSecondary displayText={'Add a date'} enabled={ true } action={ ()=> navigate('/settings/calendar/new') } customClass={'mt-2'}/>

                        </div>      
                    </>
                }
            </div>
        }
        </>
    )
}