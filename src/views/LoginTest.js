import { useCallback, useContext, useEffect, useState } from "react";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import PhoneInput from 'react-phone-number-input'
import useAuth from "../hooks/useAuth";
import OTPInput from "../components/OtpContainer/OtpContainer";
import InlineAlert from "../components/InlineAlert/InlineAlert";
import Loader from "../components/Loader/Loader";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth'
import { app } from "../fb";
import { AppContext } from "../context/AppContext";

export default function LoginTest () {

    const [ phoneNumber, setPhoneNumber ] = useState( '' )
    const [ otp, setOtp ] = useState( Array( 6 ).fill( '' ))
    const [ showOtp, setShowOtp ] = useState( false )
    const [ displayError, setDisplayError ] = useState( '' )
    const [ isLoading, setIsLoading ] = useState( false )

    const { userLogin, setConfirmObject } = useAuth()
    const { inviterId } = useContext(AppContext)

    const auth = getAuth(app);

    useEffect(() => {
        const appVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha-container',
            {
                size: 'invisible',
            }
        );

        window.recaptchaVerifier = appVerifier;

        return () => {
            appVerifier.clear()
        };
    }, [ auth ]);

    // useEffect(() => {
    //     const appVerifier = new RecaptchaVerifier(
    //         auth,
    //         'recaptcha-container',
    //         {
    //             size: 'invisible',
    //             callback: (response) => {
    //                 // Optional success callback
    //             },
    //             'expired-callback': () => {
    //                 setDisplayError('reCAPTCHA expired. Please try again.');
    //             },
    //         }
    //     );

    //     window.recaptchaVerifier = appVerifier;

    //     return () => {
    //         appVerifier.clear();
    //     };
    // }, [auth]);


    const handleSendOtp = async ( e ) => {
        e.preventDefault()
        try {
            if ( phoneNumber !== "" && phoneNumber !== undefined ) {
                const appVerifier = window.recaptchaVerifier;
                const res = await signInWithPhoneNumber( auth, phoneNumber, appVerifier )
                setConfirmObject( res )
                setShowOtp( true )
            }
        } catch (error) {
            console.error( 'Error in handleSendOtp:', error )
            setDisplayError( error.message )
        }
    }

    const handleLogin = async ( e, otp ) => {
        e.preventDefault()
        setIsLoading( true )

        try {
            await userLogin( otp )
        } catch ( error ) {
            setIsLoading( false )
            setDisplayError( error.response?.data || error.message )
            setOtp( Array( 6 ).fill( '' )) 
        }
    };

    return (
        <div className="view-container onboarding">
            { isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="section-container topbar-title">
                        {inviterId ? 'Create Your Account' : 'Welcome'}
                    </div>
                    <div className="view-body">
                        <div className="section-container">
                            <form>
                                {!showOtp ? (
                                    <>
                                        <label>Phone Number</label>
                                        <div className="phone-number-container">
                                            <img src="/images/us-flag.jpg" alt="US Flag" className="us-phone-flag" />
                                            <p className="us-char">+1</p>
                                            <PhoneInput
                                                defaultCountry="US"
                                                placeholder="( 555 )  555 - 5555"
                                                value={ phoneNumber }
                                                onChange={ setPhoneNumber }
                                            />
                                        </div>
                                        <div className="captcha-container">
                                            <div id="recaptcha-container"></div>
                                        </div>
                                        {displayError && <InlineAlert text={ displayError } />}
                                        <BtnPrimary
                                            displayText="Continue"
                                            action={( e ) => handleSendOtp( e )}
                                            id="send-otp-btn"
                                            enabled={ !!phoneNumber }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <label>Enter Code</label>
                                        <OTPInput otp={ otp } setOtp={ setOtp } />
                                        { displayError && <InlineAlert text={ displayError } />}
                                        <BtnPrimary
                                            displayText="Log In"
                                            action={( e ) => handleLogin( e, otp )}
                                            enabled={ otp.join( '' ).length === 6 }
                                        />
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
