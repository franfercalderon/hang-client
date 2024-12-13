export default function BtnPrimary ({ action, displayText, enabled, submit }) {
    return(
        <button className={`btn-primary btn ${ !enabled ? 'disabled' : '' }`} onClick={ action } type={ submit ? 'submit' : ''} disabled={ !enabled } >
            { displayText } 
        </button>
    )
}