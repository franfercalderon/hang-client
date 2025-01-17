export default function BtnDelete ({ action, displayText, enabled, btnLoading }) {
    return(
        <>
            {
                btnLoading ?
                <div className="btn-delete delete-loader">
                </div>
                :
                <button className={`btn-delete btn ${ !enabled ? 'disabled' : '' }`} onClick={ action } disabled={ !enabled } >
                    { displayText } 
                </button>
            }
        </>
    )
}