export default function DayContainer({ day, initial, handleSelectDay , selected , selectedDays, active }){

    return(
        <div className={`day-container ${ selectedDays.includes( day ) ? 'active' : '' }`} onClick={ () => handleSelectDay( day ) } >
            <div className="text-container">
                <p>{ initial.toUpperCase() }</p>
            </div>

            {
                selected &&
                <div className={`dot-container ${ selected ? 'selected' : '' } ${ active ? 'active' : '' }`}>
                    <span></span>
                </div>
            }
        </div>
    )
}