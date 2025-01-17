import { useState } from "react"
import useSlots from "../../hooks/useSlots"

export default function EventCard({ event }){

    //STATE
    const { showCardDetails, setShowCardDetails } = useState( false )

    //HOOKS
    const { formatTimestampToDate, converTimestampToString } = useSlots()
    return(
        <div className="event-card rounded">
            <div className="title-container mb-05">
                <h3 className="font-big">{ event.title ? event.title : 'Your Hang' }</h3>
                <p>{ `${ formatTimestampToDate( event.starts ) }. ${ converTimestampToString( event.starts ) } - ${ converTimestampToString( event.ends ) }.` }</p>
            </div>
            <div className="event-card-details">
                <p>{ `Visibility: ${ event.isPrivate ? 'Private' : 'Open' }`}</p>
                <p>{ `Attendants: ${ event.isPrivate ? `${ event.attending.length } (of ${ event.spots } spots)` : event.attending.length  }` }</p>
                {/* {
                    event.attending.length > 0 &&
                    <ul>
                        {
                            event.attending.map(( attendant, idx) => {
                                return(
                                    <li>{`${}`}</li>
                                )
                            })
                        }
                    </ul>
                } */}
            </div>
        </div>
    )
}