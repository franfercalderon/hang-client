import ToggleBtn from "../ToggleBtn/ToggleBtn";

export default function SettingsNotificationsContainer(){ 
    return(
        <div className="section-container mt-2">
            <p>Choose your notification channels:</p>
            <div className="toggle-card cta-card rounded">
                <p>Text</p>
                <ToggleBtn active={ true }/>
            </div>
            <div className="toggle-card cta-card rounded">
                <p>Email</p>
                <ToggleBtn active={ false }/>
            </div>
        </div>
    )
}