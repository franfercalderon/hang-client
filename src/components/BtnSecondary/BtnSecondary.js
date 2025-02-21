export default function BtnSecondary({ action, displayText, enabled, customClass , btnLoading, loadingText }) {

    return(
        <>
            {
                btnLoading ?
                <div className={`btn-secondary secondary-loader`}>
                    { loadingText ? loadingText: 'Loading...'}
                </div>
                :
                <div className={`btn-secondary btn ${ customClass }`} onClick={ action }>
                    { displayText }
                </div>
            } 
        </>
    )
}