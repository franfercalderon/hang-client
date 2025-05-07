import { useContext, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Invite () {

    //STATE
    const { pendingInvitation, setPendingInvitation, globalUser } = useContext( AppContext ) 
    const [ searchParams ] = useSearchParams()

    //ROUTER
    const navigate = useNavigate()
    const { id } = useParams()

    // iOS TestFlight Redirection
    useEffect(() => {
        // Detect if we're on iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        // Check if we're in a WebView or a regular browser
        const isStandaloneBrowser = !window.navigator.standalone && 
                                  !navigator.userAgent.includes('wv') && 
                                  !navigator.userAgent.includes('FBAN');

        if (isIOS && isStandaloneBrowser) {
            // If on iOS browser, redirect to TestFlight
            window.location.href = 'https://testflight.apple.com/join/HfAPQ6dD';
            return;
        }
    }, []);

    //Handle Invitation
    useEffect(() => {
        if (pendingInvitation) {
            navigate('/')
        }
    }, [pendingInvitation, navigate])

    useEffect(() => {
        if (id) {
            const nameData = searchParams.get('name')
            setPendingInvitation({
                userId: id,
                userName: decodeURIComponent(nameData)
            })
        }
    }, [id, setPendingInvitation, searchParams, globalUser])

    return (
        <Loader />
    )
}