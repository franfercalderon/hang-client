import { useState } from "react";
import Loader from "../Loader/Loader";
import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import DraggableCard from "../DraggableCard/DraggableCard";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import useAlert from "../../hooks/useAlert";
import Swal from "sweetalert2";
import useFriends from "../../hooks/useFriends";


export default function ManageFriendsContainer({ userFriends, setUserFriends, isLoading, handleSave, setIsLoading, getFriends }) { 
    console.log(userFriends);

    //STATE
    const [ showConfirm, setShowConfirm ] = useState( false )

    //HOOKS
    const { alertInfo } = useAlert()
    const { deleteFriend } = useFriends()

    //FUNCTION
    const handleDragEnd = ( e ) => {

        const { active, over } = e
        if( active.id !== over.id ){

            setUserFriends(( prevValue ) => {

                const oldIndex = prevValue.findIndex(( friend ) => friend.id === active.id )
                const newIndex = prevValue.findIndex(( friend ) => friend.id === over.id )
                const reorderedFriends = arrayMove( userFriends, oldIndex, newIndex )
                const updatedFriends = reorderedFriends.map(( friend, idx ) => ({
                    ...friend,
                    priority: idx + 1
                }))
                
                return updatedFriends
            })
            setShowConfirm( true )
        }
    }

    const runModalConfirmation = async ( friendId ) => {
        try {
            setIsLoading( true )
            await deleteFriend( friendId ) 
            await getFriends()

            setIsLoading( false ) 

            Swal.fire({
                text:'Friend deleted',
                icon: 'success' ,
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
            setIsLoading( false )

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

    const handleDeleteFriend = async ( friend ) => {

        Swal.fire({
            title: null,
            text: `Do you want to remove ${ friend.name } ${ friend.lastname } from your friends list?. Your friend will not be notified but you will removed from their friends list too.`,
            icon: null,
            confirmButtonText: 'Delete',
            showDenyButton: true,
            denyButtonText: 'Cancel',
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
                runModalConfirmation( friend.id )
            } 
        })
    }
    return(
        <>
        {
            isLoading ? 
            <Loader/>
            :
            <div className="section-container mt-1">
                {
                    userFriends.length > 0 ?
                    <>  
                        <div className="row">
                            <p>Drag and drop to change priorities:</p>
                            <div className="inline-help centered pointer" onClick={ () => alertInfo('Priorities will affect the events you create using Priority List.') }>
                                <p>?</p>
                            </div>
                        </div>
                        <DndContext onDragEnd={ handleDragEnd } collisionDetection={ closestCenter }>
                            <ul className="mt-2">
                                <SortableContext items={ userFriends } strategy={ verticalListSortingStrategy } >
                                    {
                                        userFriends.map(( friend ) => {
                                            return(
                                                <DraggableCard key={ friend.id } friend={ friend } action={() => handleDeleteFriend( friend )}/>
                                            )
                                        })
                                    }
                                </SortableContext>
                            </ul>
                        </DndContext>
                        {
                            showConfirm &&
                            <div className="floating-primary-container centered">
                                <BtnPrimary displayText={ 'Save Changes' } enabled={ true } submit={ false } action={ handleSave }/>
                            </div>
                        }
                    </>
                    :
                    <div className="centered">
                        <p>No friends to show</p> 
                    </div>

                }
            </div>

        }
        </>
    )
}