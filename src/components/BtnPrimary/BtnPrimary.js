export default function BtnPrimary ({ action, displayText, enabled }) {
    return(
        <div className='btn-primary btn' onClick={ action }>
            { displayText }
        </div>
    )
}