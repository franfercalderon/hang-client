import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function DraggableCard({ friend }){

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: friend.id })
    const style = {
        transform: CSS.Transform.toString( transform ),
        transition
    }
    return(
        <li style={ style } ref={ setNodeRef } { ...attributes } { ...listeners }   className="order-card cta-card rounded pointer">
            <div className="inner">
                <div className="friend-order-badge">
                    <p>{ friend.priority }</p>
                </div>
                <p>{ friend.name }</p>
            </div>
            <FontAwesomeIcon icon={ faBars }/>
        </li>
    )    
}