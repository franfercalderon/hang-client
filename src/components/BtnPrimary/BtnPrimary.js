export default function BtnPrimary ({ action, displayText, enabled, submit, btnLoading }) {

    return(
        <>
            {
                btnLoading ?
                <div className={`btn-primary primary-loader`}>
                </div>
                :
                <button className={`btn-primary btn ${ !enabled ? 'disabled' : '' }`} onClick={ action } type={ submit ? 'submit' : ''} disabled={ !enabled } >
                    { displayText } 
                </button>
            }
        </>
    )
}