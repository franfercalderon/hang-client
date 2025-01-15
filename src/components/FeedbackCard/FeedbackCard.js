import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

export default function FeedbackCard() {

    const navigate = useNavigate()

    return(
        <div className={`rounded cta-card pointer borders`} onClick={ () => navigate('/feedback') }>
            <div className="body-container">
                <div className="title-container mb-1">
                    <h3 className="font-big">{ 'Feedback' }</h3>
                </div>
                <p>{ 'Provide feedback, report bugs and more' }</p>
            </div>
            <div className={`cta-container centered` }>
                <FontAwesomeIcon icon={ faChevronRight } />
            </div>
        </div>
    )
}