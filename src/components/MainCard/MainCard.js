import { faChevronRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MainCard({ title, descritpion, starts, ends, location, action, ctaText, erase, userName, userImg, border }){


    return(
        <div className={`rounded cta-card ${ !ctaText ? 'pointer' : ''} ${ border ? 'borders' : '' }`} onClick={ !ctaText ? action : undefined }>
            <div className="body-container">
                <div className="title-container mb-1">
                    {
                        userImg &&
                        <img src={ userImg} alt={ userName } className="profile-img-min"/>
                    }
                    <h3 className="font-big">{ title }</h3>
                </div>
                {
                    descritpion &&
                    <p>{ descritpion }</p>
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
