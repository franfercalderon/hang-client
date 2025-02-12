export default function BtnSecondary({ action, displayText, enabled, customClass }) {
    return(
        <div className={`btn-secondary btn ${ customClass }`} onClick={ action }>
            { displayText }
        </div>
    )
}