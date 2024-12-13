import { faChevronRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeedCard({ title, descritpion, times, location, action, ctaText, erase }){
    return(
        <div className={`rounded cta-card ${ !ctaText ? 'pointer' : ''}`} onClick={ !ctaText ? action : undefined }>
            <div className="body-container">
                <h3 className="font-big">{ title }</h3>
                {
                    descritpion &&
                    <p>{ descritpion }</p>
                }
                {
                    times && 
                    <p>{`From: ${ times }`}</p>
                }
                {
                    location && 
                    <p>{`At: ${ location }`}</p>
                }
            </div>
            <div className={`cta-container ${ !ctaText ? 'centered' : ''}` }>
                {
                    ctaText ?
                    <button className="card-cta font-small btn rounded pointer" onClick={ action }>{ ctaText }</button>
                    :
                    <FontAwesomeIcon icon={ erase ? faTrashCan : faChevronRight } onClick={ action }/>
                }
            </div>
        </div>
    )
}
