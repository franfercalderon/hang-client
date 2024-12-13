import { useState } from "react";
import Loader from "../Loader/Loader";
import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import DraggableCard from "../DraggableCard/DraggableCard";
import BtnPrimary from "../BtnPrimary/BtnPrimary";


export default function ManageFriendsContainer({ userFriends, setUserFriends, isLoading, handleSave }) { 

    //STATE
    const [ showConfirm, setShowConfirm ] = useState( false )

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

    return(
        <>
        {
            isLoading ? 
            <Loader/>
            :
            <div className="section-container mt-2">
                {
                    userFriends.length > 0 ?
                    <>
                        <p>Drag and drop to change priorities:</p>
                        <DndContext onDragEnd={ handleDragEnd } collisionDetection={ closestCenter }>
                            <ul className="mt-2">
                                <SortableContext items={ userFriends } strategy={ verticalListSortingStrategy } >
                                    {
                                        userFriends.map(( friend, idx ) => {
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
                            <BtnPrimary displayText={ 'Save Changes' } enabled={ true } submit={ false } action={ handleSave }/>
                        }
                    </>
                    :
                    <p>No friends to show</p>
                }
            </div>

        }
        </>
    )
}