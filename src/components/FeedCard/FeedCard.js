import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeedCard({ title, descritpion, times, location, action, ctaText  }){
    return(
        <div className="rounded cta-card">
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
                    <button className="card-cta font-small btn rounded" onClick={ action }>{ ctaText }</button>
                    :
                    <FontAwesomeIcon icon={ faChevronRight } onClick={ action }/>
                }
            </div>
        </div>
    )
}