export default function ToggleBtn({ active, toggleBtn }){

    return(
        <div className={`toggle-btn ${ active ? 'active' : '' } pointer`} onClick={ toggleBtn }>
            <span></span>
        </div>
    )
}