import { useEffect } from "react";
import TopBarNav from "../components/TopBarNav/TopBarNav";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function TypeformContainer(){

    //EFFECTS
    useEffect(() => {
        const script = document.createElement( "script" )
        script.src = "//embed.typeform.com/next/embed.js"
        script.async = true
        document.body.appendChild( script )

        return () => {
            document.body.removeChild( script )
        }
    }, [])
    
    return(
        <ViewContainer>
            <TopBarNav navigation={'settings'} title={ 'Submit Feedback' }/>
            <div className="main-view-body">
                <div className="section-container">
                    <div data-tf-live="01JH8SKZY5YPTNYH184WW1BNTY" style={{width: '100%'}}></div>
                </div>
            </div>
        </ViewContainer>
    )
}