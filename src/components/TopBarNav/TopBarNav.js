import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function TopBarNav ({ title, navigation }){

    //ROUTER
    const navigate = useNavigate()

    return(
        <div className="section-container main-topbar " >
            <div className="nav-btn-container pointer font-large" onClick={ () => navigate(`/${ navigation }`)} >
                <FontAwesomeIcon icon={ faChevronLeft }/>
                <p>{ title }</p>
            </div>
        </div>
    )
}