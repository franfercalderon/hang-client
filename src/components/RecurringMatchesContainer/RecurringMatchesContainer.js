import CardLoader from "../CardLoader/CardLoader"
import useSlots from "../../hooks/useSlots"

export default function RecurringMatchesContainer ({ events, setIsLoading }) {

    const { convertArrayToString }= useSlots()

    return(
        <>
        {
            ! events ?
            <CardLoader/> 
            :
            <>
            {
                events?.map(( match, idx ) => {
                    return(
                        <div className={` match-card feed-card rounded cta-card  borders  }`} key={ idx } >
                            <div className="user-header rounded">
                                <img src={ match.matchingUser.imgUrl ? match.matchingUser.imgUrl : '/images/defaultProfile.jpg' } alt={ match.matchingUser.name } className="profile-img-min"/>
                                <p>{ `${ match.matchingUser.name } ${ match.matchingUser.lastname }` }</p>
                            </div>
                            <div className="inner">
                                <div className="body-container">
                                    <div className="title-container mb-05">
                                        <h3 className="font-big">{ `You and ${ match.matchingUser.name } have a match in your calendars!` }</h3>
                                    </div>
                                    <p>{ `Both are free on ${ convertArrayToString( match.activity.commonDays ) }` }</p>
                                    <p>{`From ${ match.activity.starts.hour }:${ match.activity.starts.minute } ${ match.activity.starts.ampm.toUpperCase() } to ${ match.activity.ends.hour }:${ match.activity.ends.minute } ${ match.activity.ends.ampm.toUpperCase() }`}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </>
        }
        </>
    )
}
