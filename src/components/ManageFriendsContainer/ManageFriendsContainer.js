import { useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import DraggableCard from "../DraggableCard/DraggableCard";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import { AppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import useUsers from "../../hooks/useUsers";

export default function ManageFriendsContainer(){

    //STATE
    const [ friends, setFriends ] = useState( null )
    const [ isLoading, setIsLoading ] = useState( true )
    const [ showConfirm, setShowConfirm ] = useState( false )

    //CONTEXT
    const { getGlobalUser } = useContext( AppContext )

    //HOOKS
    const { updateUserFriends } = useUsers()

    //FUNCTION
    const handleDragEnd = ( e ) => {

        const { active, over } = e

        if( active.id !== over.id ){

            setFriends(( prevValue ) => {

                const oldIndex = prevValue.findIndex(( friend ) => friend.id === active.id )
                const newIndex = prevValue.findIndex(( friend ) => friend.id === over.id )
                const reorderedFriends = arrayMove( friends, oldIndex, newIndex )
                const updatedFriends = reorderedFriends.map(( friend, idx ) => ({
                    ...friend,
                    priority: idx + 1
                }))
                
                return updatedFriends
            })

            setShowConfirm( true )
        }
    }

    const handleSave = async () => {
        try {
            setIsLoading( true )
            await updateUserFriends( friends )
            await getGlobalUser()
            setIsLoading( false )

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

    //EFFECTS
    useEffect(() => {
        const friends = [
            {
                name: 'Bob',
                id: 'Bob',
                priority: 2
            },
            {
                name: 'Alejandra',
                id: 'Alejandra',
                priority: 1
            },
            {
                name: 'Mark',
                id: 'Mark',
                priority: 3
            },
            {
                name: 'Momo',
                id: 'Momo',
                priority: 4
            },
        ]
        setTimeout(() => {
            friends.sort(( a, b) => a.priority - b.priority )
            setFriends( friends )
        }, 1000);
    }, [ ])

    useEffect(() => {
        if ( friends ){
            setIsLoading( false )
        }
    }, [ friends ])
    return(
        <>
        {
            isLoading ? 
            <Loader/>
            :
            <div className="section-container mt-2">
                {
                    friends.length > 0 ?
                    <>
                        <p>Drag and drop to change priorities:</p>
                        <DndContext onDragEnd={ handleDragEnd } collisionDetection={ closestCenter }>
                            <ul className="mt-2">
                                <SortableContext items={ friends } strategy={ verticalListSortingStrategy } >
                                    {
                                        friends.map(( friend, idx ) => {
                                            return(
                                                <DraggableCard key={ friend.id } friend={ friend }/>
                                            )
                                        })
                                    }
                                </SortableContext>
                            </ul>
                        </DndContext>
                        {
                            showConfirm &&
                            <BtnPrimary displayText={ 'Save Changes' } enabled={ true } submit={ false } />
                        }
                    </>
                    :
                    <p>Add friends</p>
                }
            </div>

        }
        </>
    )
}