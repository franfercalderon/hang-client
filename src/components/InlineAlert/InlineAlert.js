import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function InlineAlert({ text }) {
    return(
        <div className="inline-alert-container round-div">
            <p><FontAwesomeIcon icon={ faTriangleExclamation }/>{` ${ text }`}</p>
        </div>
    )
}