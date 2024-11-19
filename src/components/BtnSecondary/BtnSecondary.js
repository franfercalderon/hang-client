export default function BtnSecondary({ action, displayText, enabled }) {
    return(
        <div className='btn-secondary btn' onClick={ action }>
            { displayText }
        </div>
    )
}