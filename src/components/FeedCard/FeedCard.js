import { faChevronRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeedCard({ title, descritpion, starts, ends, location, action, ctaText, erase, userName, userImg }){

    //FUNCTIONS
    const converTimestampToString = ( timestamp ) => {

        const date = new Date( timestamp )
        let hours = date.getHours()
        const minutes = date.getMinutes()
        const ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12 || 12
        const formattedMinutes = minutes.toString().padStart( 2, '0' )

        return `${ hours }:${ formattedMinutes } ${ ampm }`
    }

    return(
        <div className={`rounded cta-card ${ !ctaText ? 'pointer' : ''}`} onClick={ !ctaText ? action : undefined }>
            <div className="body-container">
                <div className="title-container">
                    <img src={ userImg ? userImg : '/images/defaultProfile.jpg' } alt={ userName } className="profile-img-min"/>
                    <h3 className="font-big">{ title }</h3>
                </div>
                {
                    descritpion &&
                    <p>{ descritpion }</p>
                }
                {
                    starts && ends &&
                    <p>{`From: ${ converTimestampToString( starts ) } to ${ converTimestampToString( ends ) }`}</p>
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
