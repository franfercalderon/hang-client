export default function BtnPrimary ({ action, displayText, enabled, submit }) {
    return(
        <button className='btn-primary btn' onClick={ action } type={ submit ? 'submit' : ''}>
            { displayText }
        </button>
    )
}