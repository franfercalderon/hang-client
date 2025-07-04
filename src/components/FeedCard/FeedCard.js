import { faChevronRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import useMaps from "../../hooks/useMaps";

export default function FeedCard({ title, descritpion, starts, ends, location, action, ctaText, erase, userName, userImg, border }){

    //STATE
    const [ streetViewUrl, setStreetViewUrl ] = useState( null )

    //HOOKS 
    const { getLocationImage } = useMaps()

    //FUNCTIONS
    const converTimestampToString = ( timestamp ) => {

        const current = Date.now()

        if( timestamp < current ){
            return 'now'
        } else {
            const date = new Date( timestamp )
            let hours = date.getHours()
            const minutes = date.getMinutes()
            const ampm = hours >= 12 ? 'pm' : 'am'
            hours = hours % 12 || 12
            const formattedMinutes = minutes.toString().padStart( 2, '0' )
            return `${ hours }:${ formattedMinutes } ${ ampm }`
        }
    }

    const handleStreetViewUrl = useCallback( async ( coordinates, placeId ) => {
        try {
            
            const url = await getLocationImage( coordinates, placeId )
            
            setStreetViewUrl( url )
        } catch ( error ) {
            console.error( error );
        }
    }, [ getLocationImage ])

    //EFFECTS
    useEffect(() => {
        if( location && location.coordinates && location.placeId ){
            handleStreetViewUrl( location.coordinates, location.placeId )
        }
    }, [ location, handleStreetViewUrl ])

    return(
        <div className={` feed-card rounded cta-card ${ !ctaText ? 'pointer' : ''} ${ border ? 'borders' : '' }`} onClick={ !ctaText ? action : undefined }>
            <div className="user-header rounded">
                <img src={ userImg ? userImg : '/images/defaultProfile.jpg' } alt={ userName } className="profile-img-min"/>
                <p>{ userName }</p>
            </div>
            <div className="inner">
                <div className="body-container">
                    <div className="title-container mb-05">
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
                        location && location.address ?
                        <div className="card-street-view-container pointer" onClick={ () => window.open( location.mapUrl, '_blank') }>
                            <img src={ streetViewUrl } alt="street view"/>
                            <p>{ location.address }</p>
                        </div>
                        :
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
        </div>
    )
}
