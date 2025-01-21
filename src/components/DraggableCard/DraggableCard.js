import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DraggableCard({ friend, action }){

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: friend.id })
    const style = {
        transform: CSS.Transform.toString( transform ),
        transition
    }
    return(
        <li style={ style } ref={ setNodeRef } { ...attributes } { ...listeners }   className="slim-hang-card cta-card rounded pointer">
            <div className="inner"> 
                <div className="friend-order-badge">
                    <p>{ friend.priority }</p>
                </div>
                <img src={ friend.imgUrl ? friend.imgUrl : '/images/defaultProfile.jpg' } alt={ friend.name } className="profile-img-min"/>
                <p>{`${ friend.name } ${ friend.lastname }`}</p>
            </div>
            <div>
                <FontAwesomeIcon 
                    icon={ faTrashCan } 
                    onClick={ ( e ) => { 
                        e.stopPropagation();
                        e.preventDefault();
                        console.log('se cliekc');
                        action() } 
                    }
                />
            </div>
        </li>
    )    
}