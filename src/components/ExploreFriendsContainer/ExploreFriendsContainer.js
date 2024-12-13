import { useState } from "react";
import Loader from "../Loader/Loader";
import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import DraggableCard from "../DraggableCard/DraggableCard";
import BtnPrimary from "../BtnPrimary/BtnPrimary";


export default function ExploreFriendsContainer ({ friendSuggestions, isLoading, handleSave }) { 

    //STATE
    // const [ showConfirm, setShowConfirm ] = useState( false )

    //FUNCTION
    // const handleDragEnd = ( e ) => {

    //     const { active, over } = e
    //     if( active.id !== over.id ){

    //         setUserFriends(( prevValue ) => {

    //             const oldIndex = prevValue.findIndex(( friend ) => friend.id === active.id )
    //             const newIndex = prevValue.findIndex(( friend ) => friend.id === over.id )
    //             const reorderedFriends = arrayMove( userFriends, oldIndex, newIndex )
    //             const updatedFriends = reorderedFriends.map(( friend, idx ) => ({
    //                 ...friend,
    //                 priority: idx + 1
    //             }))
                
    //             return updatedFriends
    //         })
    //         setShowConfirm( true )
    //     }
    // }

    return(
        <>
        {
            isLoading ? 
            <Loader/>
            :
            <div className="section-container mt-2">
                {
                    friendSuggestions.length > 0 ?
                    <>
                        <p>You can send a Friends request to people you might know:</p>
                        <ul className="mt-2">
                        {
                            friendSuggestions.map(( friend, idx ) => {
                                return(
                                    <li className="order-card cta-card rounded pointer" key={ idx }> 
                                        <p>{`${ friend.name } ${ friend.lastname }`}</p>
                                    </li>
                                )
                            })
                        }
                    
                        </ul>
                    </>
                    :
                    <p>No suggestions to show</p>
                }
            </div>

        }
        </>
    )
}